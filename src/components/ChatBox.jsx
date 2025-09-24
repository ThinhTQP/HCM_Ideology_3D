import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TextField,
  IconButton,
  CircularProgress,
  Button as MuiButton,
  Box,
  Typography
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { sendMessageToAI } from '../utils/aiService';

const ChatBox = ({
  title = "AI Chat Bot",
  subtitle = "Trợ lý AI",
  avatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
  initialMessage = "Xin chào! Tôi có thể giúp gì cho bạn?",
  primaryColor = "#B71C1C"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Rate limiting: minimum 2 seconds between requests
  const MIN_REQUEST_INTERVAL = 2000;

  useEffect(() => {
    // Add initial greeting message when the component mounts
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: initialMessage
        }
      ]);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetChat = () => {
    setMessages([{ role: 'assistant', content: initialMessage }]);
    setInputValue('');
    setIsLoading(false);
    setLastRequestTime(0);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const remainingTime = Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Vui lòng đợi ${remainingTime} giây trước khi gửi câu hỏi tiếp theo để tránh vượt quá giới hạn API.`
      }]);
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setLastRequestTime(now);

    try {
      const aiResponse = await sendMessageToAI(userMessage, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };





  return (
    <>
      {/* Chat button - smaller and positioned in bottom-right corner */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-50"
        style={{ backgroundColor: primaryColor }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <CloseIcon style={{ fontSize: '18px', color: 'white' }} />
        ) : (
          <ChatIcon style={{ fontSize: '20px', color: 'white' }} />
        )}
      </motion.button>

      {/* Chat window - increased width from w-72 to w-80 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 sm:w-96 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="rounded-lg shadow-lg overflow-hidden border-2"
              style={{ borderColor: primaryColor }}
            >
              {/* Header - Simplified */}
              <div
                className="px-3 py-2 flex items-center"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 overflow-hidden">
                  <img src={avatar} alt="AI" className="w-full h-full object-cover" />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-base m-0">{title}</h3>
                  <p className="text-xs opacity-90 m-0">{subtitle}</p>
                </div>
                <div className="ml-auto flex items-center"> 
                  <IconButton
                    className="ml-auto"
                    onClick={handleResetChat}
                    title="Reset cuộc trò chuyện"
                    size="small"
                    sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                  >
                    <RefreshIcon style={{ fontSize: '16px' }} />
                  </IconButton>

                  {/* Close button */}
                  <IconButton
                    className="ml-1"
                    onClick={toggleChat}
                    size="small"
                    sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,0,0,0.3)' } }}
                  >
                    <CloseIcon style={{ fontSize: '16px' }} />
                  </IconButton>
                </div>
              </div>

              {/* Messages - Reduced height */}
              <div className="h-96 overflow-y-auto p-3 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] py-2 px-3 text-md rounded-lg ${message.role === 'user'
                          ? 'text-white rounded-tr-none'
                          : 'bg-white shadow-sm border rounded-tl-none text-black'
                        }`}
                      style={message.role === 'user' ? { backgroundColor: primaryColor } : {}}
                    >
                      <p className="m-0 text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-white shadow-sm border py-2 px-3 rounded-lg rounded-tl-none">
                      <CircularProgress size={16} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions - More compact */}
              {messages.length <= 2 && (
                <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-1">Câu hỏi gợi ý:</p>
                  <div className="flex flex-col gap-1">
                    {[
                      "Đảng cộng sản Việt Nam là gì?",
                      "Vai trò của Đảng cộng sách Việt Nam là gì?"
                    ].map((q, idx) => (
                      <button
                        key={idx}
                        className="text-left text-xs hover:bg-gray-100 px-2 py-1 rounded text-black"
                        onClick={() => {
                          setInputValue(q);
                          inputRef.current?.focus();
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input - More compact */}
              <div className="p-2 bg-white border-t">
                <div className="flex items-center">
                  <TextField
                    inputRef={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Đặt câu hỏi về lịch sử..."
                    disabled={isLoading}
                    size="small"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginRight: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        backgroundColor: '#f3f4f6',
                        fontSize: '14px',
                        '& fieldset': {
                          border: 'none'
                        }
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 12px'
                      }
                    }}
                  />
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    size="small"
                    sx={{
                      backgroundColor: primaryColor,
                      color: 'white',
                      minWidth: '32px',
                      height: '32px',
                      '&:hover': {
                        backgroundColor: primaryColor,
                        opacity: 0.9
                      },
                      '&:disabled': {
                        backgroundColor: '#ccc',
                        color: 'white'
                      }
                    }}
                  >
                    <SendIcon style={{ fontSize: '14px' }} />
                  </IconButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
