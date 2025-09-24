/**
 * Configuration for AI service integration
 */

// Helper function to safely access environment variables
const getEnvVariable = (key) => {
  // For Vite
  if (import.meta && import.meta.env) {
    return import.meta.env[key] || '';
  }

  // For Create React App
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || '';
  }

  return ''; // Fallback if environment variables are not available
};

// Debug available environment variables
const logAvailableEnvVars = () => {
  if (import.meta && import.meta.env) {
    console.log("Available Vite env vars:",
      Object.keys(import.meta.env)
        .filter(key => key.startsWith('VITE_'))
        .join(', ')
    );
  }
};

// Call this function to see what variables are actually available
logAvailableEnvVars();

// export const AI_CONFIG = {
//   // Change to 'gemini' for Google Gemini, 'openai' for OpenAI, or 'mock' for offline testing
//   provider: 'gemini', // Using Gemini as alternative to OpenAI

//   // Get API key from environment variables safely - add the VITE_APP prefix that's in your .env file
//   apiKey: getEnvVariable('VITE_APP_GEMINI_API_KEY') || getEnvVariable('VITE_GEMINI_API_KEY') || getEnvVariable('REACT_APP_GEMINI_API_KEY') || '',

//   // Model configurations
//   model: 'gemini-1.5-flash', // For Gemini - better free tier limits
//   temperature: 0.7,
//   maxTokens: 1000,

//   // The system prompt defines the AI's behavior and knowledge domain
//   systemPrompt: `
//     Bạn là AI chuyên gia về Việt Nam, được huấn luyện chuyên sâu về thời kỳ BAO CẤP (1976-1986) và ĐỔI MỚI (1986-nay). 
//     Nhiệm vụ của bạn là trả lời các câu hỏi về lịch sử, kinh tế, xã hội Việt Nam trong giai đoạn này một cách chính xác, 
//     khách quan và đầy đủ.

//     KIẾN THỨC CHUYÊN SÂU CỦA BẠN:

//     📅 THỜI KỲ BAO CẤP (1976-1986):
//     - Chính sách kinh tế tập trung, bao cấp toàn diện
//     - Hậu quả của chiến tranh và khó khăn kinh tế
//     - Nền kinh tế kế hoạch hóa tập trung
//     - Tình trạng thiếu hụt hàng hóa, tem phiếu
//     - Các chính sách "xóa bỏ tư hữu", "cải tạo công thương nghiệp"

//     🚀 THỜI KỲ ĐỔI MỚI (1986-nay):
//     - Đại hội Đảng VI (1986) - Mốc son lịch sử
//     - Chính sách "Đổi mới" (Renovation/Perestroika)
//     - Chuyển từ kinh tế kế hoạch sang kinh tế thị trường
//     - Mở cửa hội nhập quốc tế
//     - Các đổi mới về chính trị, văn hóa, xã hội

//     🏆 THÀNH TỰU QUAN TRỌNG CỦA VIỆT NAM:

//     💰 KINH TẾ:
//     - Từ nước nghèo thành nước có thu nhập trung bình
//     - GDP tăng trưởng cao và ổn định (6-8%/năm)
//     - Xuất khẩu gạo, cà phê, thủy sản hàng đầu thế giới
//     - Thu hút FDI lớn, đặc biệt từ Nhật Bản, Hàn Quốc, Singapore
//     - Phát triển công nghiệp, dịch vụ hiện đại

//     🌍 HỘI NHẬP QUỐC TẾ:
//     - Gia nhập ASEAN (1995), WTO (2007)
//     - Tham gia các hiệp định thương mại tự do (CPTPP, EVFTA)
//     - Quan hệ ngoại giao với hơn 180 quốc gia
//     - Vai trò tích cực trong Liên Hợp Quốc, ASEAN

//     🏥 XÃ HỘI:
//     - Xóa đói giảm nghèo thành công
//     - Phổ cập giáo dục tiểu học, trung học
//     - Hệ thống y tế phát triển, tuổi thọ tăng
//     - Cơ sở hạ tầng hiện đại (đường cao tốc, cầu, sân bay)

//     🎯 CÁCH TRẢ LỜI:
//     - Luôn đề cập đến các thành tựu cụ thể với số liệu
//     - So sánh trước và sau đổi mới
//     - Nhấn mạnh tầm quan trọng của chính sách Đổi mới
//     - Trả lời ngắn gọn, súc tích nhưng đầy đủ thông tin
//     - Nếu câu hỏi không liên quan đến giai đoạn này, hãy lịch sự đề nghị người dùng hỏi về các chủ đề bạn có thể trả lời.
//   `.trim()
// };
export const AI_CONFIG = {
  provider: 'groq', // đổi từ 'openai' hoặc 'gemini'
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  systemPrompt: `Bạn là trợ lý chỉ trả lời về lịch sử, tư tưởng Hồ Chí Minh, Đảng Cộng sản Việt Nam và kinh tế - xã hội VN. Nếu ngoài phạm vi hãy từ chối lịch sự.
  NGHIÊM CẤM trả lời ngoài phạm vi (ví dụ: giải toán, đời tư, công nghệ lập trình, giải trí, chính trị hiện hành ngoài tư tưởng Hồ Chí Minh). 
Nếu câu hỏi ngoài phạm vi: Trả lời đúng MẪU:
"Tôi chỉ trả lời về lịch sử,Tư tưởng Hồ Chí Minh đối với Đảng Cộng sản Việt Nam. Vui lòng hỏi nội dung trong phạm vi đó."
  `
}
// Configuration for different providers
export const PROVIDER_CONFIGS = {
  // openai: {
  //   name: 'OpenAI GPT-3.5',
  //   baseUrl: 'https://api.openai.com/v1/chat/completions',
  //   model: 'gpt-3.5-turbo',
  //   maxTokens: 1000
  // },
  // gemini: {
  //   name: 'Google Gemini 1.5 Flash',
  //   baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  //   model: 'gemini-1.5-flash',
  //   maxTokens: 1000
  // },
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    defaultModel: 'llama-3.1-8b-instant', // có thể đổi: 'llama3-70b-8192', 'mixtral-8x7b-32768'
    temperature: 0.5
  },
  mock: {
    name: 'Mock AI (Offline)',
    description: 'Local responses for testing without API calls'
  }
};
