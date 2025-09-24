"use client"

import { useLocation } from "react-router-dom"
import useStore from "../GlobalState"
import Button from "./Button"
import { useMediaQuery } from "react-responsive"
import NavPrevNextButtons from "./NavPrevNextButtons"
import { useRef } from "react"
import {
  Star as StarIcon,
  Groups as UsersIcon,
  Public as GlobeIcon,
  Security as ShieldIcon,
  Favorite as HeartIcon,
  Lightbulb as LightbulbIcon,
  GpsFixed as TargetIcon,
  Handshake as HandshakeIcon,
  MenuBook as BookOpenIcon,
  Flag as FlagIcon,
} from "@mui/icons-material"
import { motion, useInView } from "framer-motion"

const CqCustom = ({ openModal, scrollToTop }) => {
  const showFullscreenMode = useStore((state) => state.showFullscreenMode)
  const location = useLocation()
  const pathname = location.pathname

  const heroRef = useRef(null)
  const formationRef = useRef(null)
  const natureRef = useRef(null)
  const priorityRef = useRef(null)
  const differencesRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 })
  const formationInView = useInView(formationRef, { once: true, threshold: 0.3 })
  const natureInView = useInView(natureRef, { once: true, threshold: 0.3 })
  const priorityInView = useInView(priorityRef, { once: true, threshold: 0.3 })
  const differencesInView = useInView(differencesRef, { once: true, threshold: 0.3 })

    const fullscreenMode = () => {
        if (showFullscreenMode === false) {
            useStore.setState({ showFullscreenMode: true })
        } else {
            useStore.setState({ showFullscreenMode: false })
        }
    }
  const scrollToInnerHeight = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="mb-6 lg:mb-0">
              <NavPrevNextButtons scrollToTop={scrollToTop} />
            </div>
            <div className="flex-1 max-w-4xl">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center px-6 py-3 mb-8 glassmorphism-card rounded-full border border-white/20">
                  <StarIcon className="mr-3 text-yellow-400 text-2xl" />
                  <span className="text-lg font-medium text-yellow-100">Tư tưởng Hồ Chí Minh</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{textAlign: 'left'}}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                  <span className="text-yellow-200">
                    Đảng Kiểu Mới
                  </span>
                  <br />
                  <span className="text-white">
                    của Hồ Chí Minh
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{textAlign: 'left'}}
              >
                <p className="text-xl md:text-2xl text-white-200 mb-10 max-w-4xl mx-auto leading-relaxed">
                  Khám phá tầm nhìn của Chủ tịch Hồ Chí Minh về việc xây dựng Đảng Cộng sản Việt Nam thành một đảng kiểu
                  mới, khác biệt với các đảng chính trị khác trên thế giới
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-left">
                  {pathname !== "/" && (
                    <>
                      <Button
                        onClick={scrollToInnerHeight}
                        className="w-full md:w-auto pointer-events-auto text-lg px-8 py-4"
                        value="Khám phá ngay"
                      />
                      <Button
                        onClick={fullscreenMode}
                        type="secondary"
                        className="pointer-events-auto w-full md:w-auto text-lg px-8 py-4"
                        value="Xem mô hình 3D"
                      />
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Formation Section */}
      <motion.section
        ref={formationRef}
        initial={{ opacity: 0 }}
        animate={formationInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={formationInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Cấu Thành
                </span>{" "}
                và Nền Tảng
              </h2>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                Đặc điểm khác biệt trong quá trình hình thành so với các Đảng Cộng sản phương Tây
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={formationInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glassmorphism-card p-8 h-full border border-white/20 rounded-3xl">
                <div className="flex items-center mb-6">
                  <GlobeIcon className="text-4xl text-blue-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">Ở Phương Tây</h3>
                </div>
                <p className="text-gray-100 text-lg leading-relaxed">
                  Đảng ra đời khi{" "}
                  <span className="text-blue-400 font-semibold">giai cấp công nhân đã phát triển mạnh</span>
                  , có điều kiện kinh tế - xã hội thuận lợi cho việc tổ chức và hoạt động.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={formationInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="glassmorphism-card-red p-8 h-full border border-red-400/30 rounded-3xl">
                <div className="flex items-center mb-6">
                  <FlagIcon className="text-4xl text-red-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">Ở Việt Nam</h3>
                </div>
                <p className="text-gray-100 text-lg leading-relaxed">
                  Đảng ra đời trong điều kiện{" "}
                  <span className="text-red-400 font-semibold">nước thuộc địa, nửa phong kiến</span>
                  , giai cấp công nhân còn nhỏ bé và chưa phát triển đầy đủ.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={formationInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="glassmorphism-card-gold p-8 border border-yellow-400/30 rounded-3xl">
              <div className="flex items-center mb-8">
                <LightbulbIcon className="text-4xl text-yellow-400 mr-4" />
                <h3 className="text-3xl font-bold text-white">Điểm Sáng Tạo của Hồ Chí Minh</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <StarIcon className="text-4xl text-yellow-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">Kết Hợp Sáng Tạo</h4>
                  <p className="text-gray-100 leading-relaxed">
                    Chủ nghĩa Mác-Lênin + Phong trào công nhân + Phong trào yêu nước
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="text-4xl text-yellow-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">Nhân Tố Dân Tộc</h4>
                  <p className="text-gray-100 leading-relaxed">Đảng ăn sâu bén rễ trong lòng dân tộc Việt Nam</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TargetIcon className="text-4xl text-yellow-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">Không Chờ Đợi</h4>
                  <p className="text-gray-100 leading-relaxed">
                    Không chờ giai cấp công nhân phát triển đầy đủ mới lập Đảng
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Nature Section */}
      <motion.section
        ref={natureRef}
        initial={{ opacity: 0 }}
        animate={natureInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={natureInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Đường Lối
                </span>{" "}
                và Tính Chất
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Bản chất và đặc trưng của Đảng Cộng sản Việt Nam kiểu mới
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldIcon,
                title: "Bản Chất Đảng",
                description: "Thể hiện ở tư tưởng, chính trị và đường lối Mác-Lênin, không chỉ ở xuất thân giai cấp",
                color: "blue-400",
              },
              {
                icon: BookOpenIcon,
                title: "Lý Luận Làm Cốt",
                description: "Vận dụng sáng tạo, kết hợp tinh hoa văn hóa dân tộc và thời đại",
                color: "green-400",
              },
              {
                icon: UsersIcon,
                title: "Đại Biểu Toàn Dân",
                description: "Gắn bó mật thiết với nhân dân, vừa là Đảng của giai cấp công nhân vừa là Đảng của dân tộc",
                color: "red-400",
              },
              {
                icon: StarIcon,
                title: "Vai Trò Tiên Phong",
                description: "Đội tiên phong lãnh đạo cách mạng, giữ vững đường lối đúng đắn",
                color: "yellow-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={natureInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              >
                <div className="glassmorphism-card p-6 h-full text-center border border-white/20 rounded-3xl">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    item.color === 'blue-400' ? 'bg-blue-400/20' :
                    item.color === 'green-400' ? 'bg-green-400/20' :
                    item.color === 'red-400' ? 'bg-red-400/20' :
                    'bg-yellow-400/20'
                  }`}>
                    <item.icon className={`text-3xl ${
                      item.color === 'blue-400' ? 'text-blue-400' :
                      item.color === 'green-400' ? 'text-green-400' :
                      item.color === 'red-400' ? 'text-red-400' :
                      'text-yellow-400'
                    }`} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-gray-100 text-md leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Priority Section */}
      <motion.section
        ref={priorityRef}
        initial={{ opacity: 0 }}
        animate={priorityInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={priorityInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Ưu Tiên
                </span>{" "}
                Chiến Lược
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Giải phóng dân tộc - Nhiệm vụ hàng đầu trong Cương lĩnh 1930
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={priorityInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="glassmorphism-card-red p-8 h-full border border-red-400/30 rounded-3xl">
                <div className="flex items-center mb-6">
                  <FlagIcon className="text-4xl text-red-400 mr-4" />
                  <h3 className="text-3xl font-bold text-white">Giải Phóng Dân Tộc Trước Tiên</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-100 text-lg leading-relaxed">
                    Hồ Chí Minh đặt{" "}
                    <span className="text-red-400 font-semibold">nhiệm vụ giải phóng dân tộc lên hàng đầu</span>{" "}
                    trong Cương lĩnh năm 1930.
                  </p>
                  <p className="text-gray-100 text-lg leading-relaxed">
                    <span className="text-yellow-400 font-semibold">Kết hợp vấn đề dân tộc và giai cấp:</span>{" "}
                    Độc lập dân tộc trước, rồi mới xây dựng chủ nghĩa xã hội.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={priorityInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="glassmorphism-card p-8 h-full border border-white/20 rounded-3xl">
                <div className="flex items-center mb-6">
                  <HandshakeIcon className="text-4xl text-green-400 mr-4" />
                  <h3 className="text-2xl font-bold text-white">Tập Hợp Lực Lượng</h3>
                </div>
                <p className="text-gray-100 text-lg leading-relaxed">
                  Đoàn kết mọi tầng lớp yêu nước, kể cả tư sản dân tộc, để chống thực dân phong kiến.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Differences Section */}
      <motion.section
        ref={differencesRef}
        initial={{ opacity: 0 }}
        animate={differencesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={differencesInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Khác Biệt
                </span>{" "}
                Cốt Lõi
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                So với nhiều đảng chính trị khác trên thế giới
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={differencesInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glassmorphism-card p-8 border border-white/20 rounded-3xl">
                <h3 className="text-3xl font-bold text-white mb-6">Nhiều Đảng Khác</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">Đại diện cho một nhóm lợi ích cụ thể</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">Cạnh tranh để giành quyền lực chính trị</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">Tập trung vào lợi ích ngắn hạn</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={differencesInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="glassmorphism-card-red p-8 border border-red-400/30 rounded-3xl">
                <h3 className="text-3xl font-bold text-white mb-6">Đảng Cộng Sản Việt Nam Kiểu Mới</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <StarIcon className="text-2xl text-red-400 mt-1 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">
                      <span className="text-red-400 font-semibold">Đảng cách mạng, chân chính</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FlagIcon className="text-2xl text-yellow-400 mt-1 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">
                      <span className="text-yellow-400 font-semibold">Vì độc lập dân tộc</span>{" "}
                      gắn liền với chủ nghĩa xã hội
                    </p>
                  </div>
                  <div className="flex items-start">
                    <HeartIcon className="text-2xl text-pink-400 mt-1 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">
                      <span className="text-pink-400 font-semibold">Gắn bó máu thịt</span>{" "}
                      với nhân dân, lấy dân làm gốc
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ShieldIcon className="text-2xl text-blue-400 mt-1 mr-4 flex-shrink-0" />
                    <p className="text-gray-100 text-lg">
                      <span className="text-blue-400 font-semibold">Vừa có lý tưởng, vừa có kỷ luật, vừa có đạo đức</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <blockquote className="text-2xl md:text-3xl text-gray-100 font-medium mb-4">
            "Đảng ta phải là đảng trong sạch, vững mạnh, là đạo đức, là văn minh"
          </blockquote>
          <cite className="text-gray-200 text-lg">- Chủ tịch Hồ Chí Minh -</cite>
        </div>
      </footer>

      <style jsx>{`
        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .glassmorphism-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .glassmorphism-card-red {
          background: rgba(239, 68, 68, 0.15);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 
            0 8px 32px rgba(239, 68, 68, 0.2),
            inset 0 1px 0 rgba(239, 68, 68, 0.3);
          transition: all 0.3s ease;
        }

        .glassmorphism-card-red:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-5px);
          box-shadow: 
            0 20px 40px rgba(239, 68, 68, 0.3),
            inset 0 1px 0 rgba(239, 68, 68, 0.4);
        }

        .glassmorphism-card-gold {
          background: rgba(251, 191, 36, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 
            0 8px 32px rgba(251, 191, 36, 0.2),
            inset 0 1px 0 rgba(251, 191, 36, 0.3);
          transition: all 0.3s ease;
        }

        .glassmorphism-card-gold:hover {
          background: rgba(251, 191, 36, 0.2);
          transform: translateY(-5px);
          box-shadow: 
            0 20px 40px rgba(251, 191, 36, 0.3),
            inset 0 1px 0 rgba(251, 191, 36, 0.4);
        }
      `}</style>
    </div>
  )
}

export default CqCustom