import { AI_CONFIG, PROVIDER_CONFIGS } from '../config/aiConfig';

/**
 * Sends a message to the configured AI service and gets a response
 * @param {string} message - The user's message
 * @param {Array} previousMessages - Previous conversation messages
 * @returns {Promise<string>} - The AI's response
 */

export const sendMessageToAI = async (message, previousMessages = []) => {
  try {
    const { provider, apiKey, systemPrompt } = AI_CONFIG;

    // Format previous messages for context
    const formattedMessages = previousMessages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    // Add system prompt for context
    const messages = [
      { role: 'system', content: systemPrompt },
      ...formattedMessages,
      { role: 'user', content: message }
    ];

    // Debug logging
    console.log("Using provider:", provider);
    console.log("Provider config:", PROVIDER_CONFIGS[provider]);
    console.log("API key available:", apiKey ? "Yes (length: " + apiKey.length + ")" : "No");

   if (provider === 'groq' && apiKey && apiKey.trim() !== '') {
      try {
        return await sendToGroq(messages, apiKey);
      } catch (err) {
        console.warn('Groq API error, fallback mock:', err.message);
        return getMockResponse(message);
      }
    } else {
      // Use mock response if no valid provider or API key
      console.info("Using mock AI responses (no valid API configuration)");
      return getMockResponse(message);
    }
  } catch (error) {
    console.error("Error in sendMessageToAI:", error);
    return "Xin lỗi, đã có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.";
  }
};

const sendToGroq = async (messages, apiKey) => {
  console.log('Sending request to Groq API...')
  const { defaultModel, temperature } = PROVIDER_CONFIGS.groq
  const req = {
    model: defaultModel,
    temperature: temperature ?? 0.5,
    messages,
    stream: false
  }

  const res = await fetch(PROVIDER_CONFIGS.groq.baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(req)
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => 'Unknown error')
    console.error(`Groq API error (${res.status}): ${txt}`)
    throw new Error(`Groq API error (${res.status}): ${txt}`)
  }

  const data = await res.json()
  console.log('Groq response:', data)
  return data.choices?.[0]?.message?.content || 'Không có nội dung trả về.'
}


/**
 * Provides helpful information when quota is exceeded
 */
const getQuotaErrorResponse = (message) => {
  return `Tôi hiểu bạn muốn hỏi về "${message}", nhưng hiện tại tôi đang gặp vấn đề với quota API.

🔧 **Để khắc phục vấn đề này:**

1. **Kiểm tra tài khoản OpenAI:**
   - Đăng nhập vào https://platform.openai.com
   - Kiểm tra phần "Usage" và "Billing"
   - Đảm bảo thông tin thanh toán đã được cập nhật

2. **Xác minh tài khoản:**
   - Kiểm tra email xác minh
   - Cập nhật thông tin cá nhân nếu cần

3. **Tạm thời sử dụng chế độ offline:**
   - Thay đổi provider từ 'openai' thành 'mock' trong file aiConfig.js
   - Tôi sẽ trả lời dựa trên dữ liệu có sẵn

Trong khi chờ khắc phục, tôi có thể trả lời một số câu hỏi cơ bản về lịch sử Việt Nam giai đoạn 1954-1964.`;
};

/**
 * Enhanced mock function for testing without an API
 */
const getMockResponse = (message) => {
  const lowerMsg = message.toLowerCase();

  // Chào hỏi cơ bản
  if (lowerMsg.includes('xin chào') || lowerMsg.includes('hello')) {
    return 'Xin chào! Tôi là AI chuyên gia về Tư tưởng Hồ Chí Minh, đặc biệt về quan điểm xây dựng Đảng Cộng sản Việt Nam kiểu mới. Bạn muốn tìm hiểu nội dung nào?';
  }

  // Giải thích khái niệm Đảng kiểu mới
  if (lowerMsg.includes('đảng kiểu mới') || lowerMsg.includes('đảng cộng sản việt nam kiểu mới')) {
    return `🔹 **Theo Hồ Chí Minh, Đảng Cộng sản Việt Nam là "đảng kiểu mới":**

- **Cơ sở ra đời:** Kết hợp **chủ nghĩa Mác – Lênin + phong trào công nhân + phong trào yêu nước**, đặt trong hoàn cảnh Việt Nam thuộc địa nửa phong kiến, giai cấp công nhân còn nhỏ bé.
- **Bản chất:** Mang bản chất giai cấp công nhân nhưng gắn bó chặt chẽ với dân tộc, đại biểu cho lợi ích toàn dân.
- **Đường lối:** Vận dụng sáng tạo chủ nghĩa Mác – Lênin, không giáo điều; kết hợp giải phóng dân tộc với giải phóng giai cấp.
- **Mục tiêu:** Giành độc lập dân tộc, tiến lên xây dựng CNXH.
- **Tổ chức:** Có kỷ luật chặt chẽ, đoàn kết thống nhất, đặt lợi ích dân tộc và giai cấp công nhân lên hàng đầu.`;
  }

  // Vai trò của Đảng theo Hồ Chí Minh
  if (lowerMsg.includes('vai trò đảng') || lowerMsg.includes('đảng lãnh đạo')) {
    return `🔹 **Vai trò lãnh đạo của Đảng theo Hồ Chí Minh:**
- Đảng là đội tiên phong chính trị của giai cấp công nhân và dân tộc.
- Đảng đề ra đường lối đúng đắn, lãnh đạo cách mạng Việt Nam giành độc lập, xây dựng CNXH.
- Đảng phải "là đạo đức, là văn minh", gắn bó máu thịt với nhân dân, "lấy dân làm gốc".
- Đảng phải không ngừng tự đổi mới, chỉnh đốn để xứng đáng với vai trò lãnh đạo.`;
  }

  // Nhiệm vụ chiến lược: Giải phóng dân tộc
  if (lowerMsg.includes('giải phóng dân tộc') || lowerMsg.includes('nhiệm vụ chiến lược')) {
    return `🔹 **Theo Hồ Chí Minh:**
- Nhiệm vụ số một của Đảng Cộng sản Việt Nam trong giai đoạn đầu là **giải phóng dân tộc**.
- Độc lập dân tộc phải gắn liền với CNXH: "Nước được độc lập mà dân không được hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì".
- Đảng cần tập hợp lực lượng rộng rãi: công nhân, nông dân, trí thức, tiểu tư sản, tư sản dân tộc... để đánh đổ đế quốc và phong kiến.`;
  }

  // Nguyên tắc xây dựng Đảng
  if (lowerMsg.includes('nguyên tắc xây dựng đảng') || lowerMsg.includes('xây dựng đảng')) {
    return `🔹 **Nguyên tắc xây dựng Đảng theo Hồ Chí Minh:**
- Kiên định chủ nghĩa Mác – Lênin, đặt lợi ích giai cấp công nhân và dân tộc lên hàng đầu.
- Tập trung dân chủ: thiểu số phục tùng đa số, cá nhân phục tùng tổ chức.
- Tự phê bình và phê bình để giữ Đảng trong sạch, vững mạnh.
- Gắn bó máu thịt với nhân dân, dựa vào dân để xây dựng Đảng.`;
  }

  // Nếu không khớp từ khóa
  return `Tôi hiểu bạn đang hỏi về "${message}", nhưng hiện tại API của tôi không khả dụng.  
Hiện tại tôi có thể giải thích các chủ đề sau về **Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam**:

- Khái niệm **Đảng kiểu mới** theo Hồ Chí Minh
- Vai trò lãnh đạo của Đảng
- Nhiệm vụ chiến lược: **Giải phóng dân tộc gắn liền với CNXH**
- Nguyên tắc xây dựng và chỉnh đốn Đảng

Bạn muốn tìm hiểu nội dung nào trong số này?`;
};

