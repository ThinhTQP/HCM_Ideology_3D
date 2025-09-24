"use client"

import { useLocation } from "react-router-dom"
import useStore from "../GlobalState"
import Button from "./Button"
import { useMediaQuery } from "react-responsive"
import NavPrevNextButtons from "./NavPrevNextButtons"
import { useState, useRef } from "react"
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
  const isBigScreen = useMediaQuery({ query: "(min-width: 640px)" })
  const location = useLocation()
  const pathname = location.pathname
  const [activeSection, setActiveSection] = useState(0)

  const heroRef = useRef(null)
  const formationRef = useRef(null)
  const natureRef = useRef(null)
  const priorityRef = useRef(null)
  const scopeRef = useRef(null)
  const differencesRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 })
  const formationInView = useInView(formationRef, { once: true, threshold: 0.3 })
  const natureInView = useInView(natureRef, { once: true, threshold: 0.3 })
  const priorityInView = useInView(priorityRef, { once: true, threshold: 0.3 })
  const scopeInView = useInView(scopeRef, { once: true, threshold: 0.3 })
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

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
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
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
            <div className="mb-4 lg:mb-0 lg:mr-8">
              <NavPrevNextButtons scrollToTop={scrollToTop} />
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 glassmorphism-card rounded-full">
                  <StarIcon className="mr-2 text-yellow-400" />
                  <span className="text-lg font-medium text-yellow-200">Tư tưởng Hồ Chí Minh</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl">
                  <span className=" ">
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
              >
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                  Khám phá tầm nhìn của Chủ tịch Hồ Chí Minh về việc xây dựng Đảng Cộng sản Việt Nam thành một đảng kiểu
                  mới, khác biệt với các đảng chính trị khác trên thế giới
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {pathname !== "/" && (
                    <>
                      <Button
                        onClick={scrollToInnerHeight}
                        className="w-full md:w-auto pointer-events-auto"
                        value="Khám phá ngay"
                      />
                      <Button
                        onClick={fullscreenMode}
                        type="secondary"
                        className="pointer-events-auto w-full md:w-auto"
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
        style={{ padding: "80px 0" }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={formationInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Cấu Thành
                </Box>{" "}
                và Nền Tảng
              </Typography>
              <Typography variant="h6" sx={{ color: "#d1d5db", maxWidth: "600px", mx: "auto" }}>
                Đặc điểm khác biệt trong quá trình hình thành so với các Đảng Cộng sản phương Tây
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={formationInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Paper className="enhanced-glassmorphism-card" sx={{ p: 4, height: "100%" }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <GlobeIcon sx={{ fontSize: 32, color: "#60a5fa", mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                      Ở Phương Tây
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6 }}>
                    Đảng ra đời khi{" "}
                    <Box component="span" sx={{ color: "#60a5fa", fontWeight: 600 }}>
                      giai cấp công nhân đã phát triển mạnh
                    </Box>
                    , có điều kiện kinh tế - xã hội thuận lợi cho việc tổ chức và hoạt động.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={formationInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Paper className="enhanced-glassmorphism-card-red" sx={{ p: 4, height: "100%" }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <FlagIcon sx={{ fontSize: 32, color: "#f87171", mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                      Ở Việt Nam
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6 }}>
                    Đảng ra đời trong điều kiện{" "}
                    <Box component="span" sx={{ color: "#f87171", fontWeight: 600 }}>
                      nước thuộc địa, nửa phong kiến
                    </Box>
                    , giai cấp công nhân còn nhỏ bé và chưa phát triển đầy đủ.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={formationInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Paper className="enhanced-glassmorphism-card-gold" sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <LightbulbIcon sx={{ fontSize: 32, color: "#fbbf24", mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                  Điểm Sáng Tạo của Hồ Chí Minh
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        backgroundColor: "rgba(251, 191, 36, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <StarIcon sx={{ fontSize: 32, color: "#fbbf24" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "white", mb: 1 }}>
                      Kết Hợp Sáng Tạo
                    </Typography>
                    <Typography sx={{ color: "#d1d5db" }}>
                      Chủ nghĩa Mác-Lênin + Phong trào công nhân + Phong trào yêu nước
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        backgroundColor: "rgba(251, 191, 36, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <HeartIcon sx={{ fontSize: 32, color: "#fbbf24" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "white", mb: 1 }}>
                      Nhân Tố Dân Tộc
                    </Typography>
                    <Typography sx={{ color: "#d1d5db" }}>Đảng ăn sâu bén rễ trong lòng dân tộc Việt Nam</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        backgroundColor: "rgba(251, 191, 36, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <TargetIcon sx={{ fontSize: 32, color: "#fbbf24" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "white", mb: 1 }}>
                      Không Chờ Đợi
                    </Typography>
                    <Typography sx={{ color: "#d1d5db" }}>
                      Không chờ giai cấp công nhân phát triển đầy đủ mới lập Đảng
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </motion.section>

      {/* Nature Section */}
      <motion.section
        ref={natureRef}
        initial={{ opacity: 0 }}
        animate={natureInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: "80px 0" }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={natureInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Đường Lối
                </Box>{" "}
                và Tính Chất
              </Typography>
              <Typography variant="h6" sx={{ color: "#d1d5db", maxWidth: "600px", mx: "auto" }}>
                Bản chất và đặc trưng của Đảng Cộng sản Việt Nam kiểu mới
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={3}>
            {[
              {
                icon: ShieldIcon,
                title: "Bản Chất Đảng",
                description: "Thể hiện ở tư tưởng, chính trị và đường lối Mác-Lênin, không chỉ ở xuất thân giai cấp",
                color: "#60a5fa",
              },
              {
                icon: BookOpenIcon,
                title: "Lý Luận Làm Cốt",
                description: "Vận dụng sáng tạo, kết hợp tinh hoa văn hóa dân tộc và thời đại",
                color: "#34d399",
              },
              {
                icon: UsersIcon,
                title: "Đại Biểu Toàn Dân",
                description:
                  "Gắn bó mật thiết với nhân dân, vừa là Đảng của giai cấp công nhân vừa là Đảng của dân tộc",
                color: "#f87171",
              },
              {
                icon: StarIcon,
                title: "Vai Trò Tiên Phong",
                description: "Đội tiên phong lãnh đạo cách mạng, giữ vững đường lối đúng đắn",
                color: "#fbbf24",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={natureInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  <Paper className="enhanced-glassmorphism-card" sx={{ p: 3, height: "100%", textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        backgroundColor: `${item.color}20`,
                      }}
                    >
                      <item.icon sx={{ fontSize: 32, color: item.color }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", mb: 2 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.section>

      {/* Priority Section */}
      <motion.section
        ref={priorityRef}
        initial={{ opacity: 0 }}
        animate={priorityInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: "80px 0" }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={priorityInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ưu Tiên
                </Box>{" "}
                Chiến Lược
              </Typography>
              <Typography variant="h6" sx={{ color: "#d1d5db", maxWidth: "600px", mx: "auto" }}>
                Giải phóng dân tộc - Nhiệm vụ hàng đầu trong Cương lĩnh 1930
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={priorityInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Paper className="enhanced-glassmorphism-card-red" sx={{ p: 4, height: "100%" }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <FlagIcon sx={{ fontSize: 32, color: "#f87171", mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                      Giải Phóng Dân Tộc Trước Tiên
                    </Typography>
                  </Box>
                  <Box sx={{ "& > *": { mb: 2 } }}>
                    <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6 }}>
                      Hồ Chí Minh đặt{" "}
                      <Box component="span" sx={{ color: "#f87171", fontWeight: 600 }}>
                        nhiệm vụ giải phóng dân tộc lên hàng đầu
                      </Box>{" "}
                      trong Cương lĩnh năm 1930.
                    </Typography>
                    <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6 }}>
                      <Box component="span" sx={{ color: "#fbbf24", fontWeight: 600 }}>
                        Kết hợp vấn đề dân tộc và giai cấp:
                      </Box>{" "}
                      Độc lập dân tộc trước, rồi mới xây dựng chủ nghĩa xã hội.
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={priorityInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Paper className="enhanced-glassmorphism-card" sx={{ p: 4, height: "100%" }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <HandshakeIcon sx={{ fontSize: 32, color: "#34d399", mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                      Tập Hợp Lực Lượng
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6 }}>
                    Đoàn kết mọi tầng lớp yêu nước, kể cả tư sản dân tộc, để chống thực dân phong kiến.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </motion.section>

      {/* Scope Section */}
      <motion.section
        ref={scopeRef}
        initial={{ opacity: 0 }}
        animate={scopeInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: "80px 0" }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={scopeInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Phạm Vi
                </Box>{" "}
                và Quốc Tế
              </Typography>
              <Typography variant="h6" sx={{ color: "#d1d5db", maxWidth: "600px", mx: "auto" }}>
                Tổ chức theo quốc gia nhưng gắn với cách mạng thế giới
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={scopeInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Paper className="enhanced-glassmorphism-card" sx={{ p: 4, height: "100%" }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <FlagIcon sx={{ fontSize: 32, color: "#60a5fa", mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                      Theo Quốc Gia
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6, mb: 2 }}>
                    Đảng Cộng sản Việt Nam tổ chức trong khuôn khổ dân tộc, không phải một Đảng chung cho cả Đông Dương
                    như chỉ thị của Quốc tế Cộng sản.
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "rgba(96, 165, 250, 0.1)",
                      border: "1px solid rgba(96, 165, 250, 0.2)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Typography sx={{ color: "#93c5fd", fontSize: "0.875rem" }}>
                      Thể hiện tính độc lập và tự chủ trong tổ chức
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={scopeInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Paper className="enhanced-glassmorphism-card" sx={{ p: 4, height: "100%" }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <GlobeIcon sx={{ fontSize: 32, color: "#34d399", mr: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                      Gắn Với Thế Giới
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem", lineHeight: 1.6, mb: 2 }}>
                    Cách mạng Việt Nam là một bộ phận của cách mạng thế giới, đoàn kết với các dân tộc bị áp bức và giai
                    cấp vô sản toàn cầu.
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "rgba(52, 211, 153, 0.1)",
                      border: "1px solid rgba(52, 211, 153, 0.2)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Typography sx={{ color: "#6ee7b7", fontSize: "0.875rem" }}>
                      Tinh thần quốc tế chủ nghĩa và đoàn kết toàn cầu
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </motion.section>

      {/* Differences Section */}
      <motion.section
        ref={differencesRef}
        initial={{ opacity: 0 }}
        animate={differencesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ padding: "80px 0" }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={differencesInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box textAlign="center" mb={8}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Khác Biệt
                </Box>{" "}
                Cốt Lõi
              </Typography>
              <Typography variant="h6" sx={{ color: "#d1d5db", maxWidth: "600px", mx: "auto" }}>
                So với nhiều đảng chính trị khác trên thế giới
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={differencesInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Paper className="enhanced-glassmorphism-card" sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", mb: 3 }}>
                    Nhiều Đảng Khác
                  </Typography>
                  <Box sx={{ "& > *": { mb: 2 } }}>
                    <Box display="flex" alignItems="flex-start">
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: "#9ca3af",
                          borderRadius: "50%",
                          mt: 1.5,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        Đại diện cho một nhóm lợi ích cụ thể
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: "#9ca3af",
                          borderRadius: "50%",
                          mt: 1.5,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        Cạnh tranh để giành quyền lực chính trị
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          backgroundColor: "#9ca3af",
                          borderRadius: "50%",
                          mt: 1.5,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        Tập trung vào lợi ích ngắn hạn
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={differencesInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Paper className="enhanced-glassmorphism-card-red" sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", mb: 3 }}>
                    Đảng Cộng Sản Việt Nam Kiểu Mới
                  </Typography>
                  <Box sx={{ "& > *": { mb: 2 } }}>
                    <Box display="flex" alignItems="flex-start">
                      <StarIcon sx={{ fontSize: 24, color: "#f87171", mt: 0.5, mr: 2, flexShrink: 0 }} />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        <Box component="span" sx={{ color: "#f87171", fontWeight: 600 }}>
                          Đảng cách mạng, chân chính
                        </Box>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                      <FlagIcon sx={{ fontSize: 24, color: "#fbbf24", mt: 0.5, mr: 2, flexShrink: 0 }} />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        <Box component="span" sx={{ color: "#fbbf24", fontWeight: 600 }}>
                          Vì độc lập dân tộc
                        </Box>{" "}
                        gắn liền với chủ nghĩa xã hội
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                      <HeartIcon sx={{ fontSize: 24, color: "#ec4899", mt: 0.5, mr: 2, flexShrink: 0 }} />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        <Box component="span" sx={{ color: "#ec4899", fontWeight: 600 }}>
                          Gắn bó máu thịt
                        </Box>{" "}
                        với nhân dân, lấy dân làm gốc
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start">
                      <ShieldIcon sx={{ fontSize: 24, color: "#60a5fa", mt: 0.5, mr: 2, flexShrink: 0 }} />
                      <Typography sx={{ color: "#d1d5db", fontSize: "1.125rem" }}>
                        <Box component="span" sx={{ color: "#60a5fa", fontWeight: 600 }}>
                          Vừa có lý tưởng, vừa có kỷ luật, vừa có đạo đức
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </motion.section>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, px: 2, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography sx={{ color: "#9ca3af", fontSize: "1.125rem" }}>
              "Đảng ta phải là đảng trong sạch, vững mạnh, là đạo đức, là văn minh"
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1 }}>- Chủ tịch Hồ Chí Minh -</Typography>
          </Box>
        </Container>
      </Box>

      <style jsx>{`
                .enhanced-glassmorphism-card {
                    background: rgba(255, 255, 255, 0.15) !important;
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.3) !important;
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.4),
                        inset 0 2px 0 rgba(255, 255, 255, 0.4),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.1) !important;
                    transition: all 0.4s ease !important;
                }

                .enhanced-glassmorphism-card:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                    border: 2px solid rgba(255, 255, 255, 0.4) !important;
                    transform: translateY(-8px);
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        inset 0 2px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -2px 0 rgba(255, 255, 255, 0.2) !important;
                }

                .enhanced-glassmorphism-card-red {
                    background: rgba(239, 68, 68, 0.15) !important;
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(239, 68, 68, 0.3) !important;
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.4),
                        inset 0 2px 0 rgba(239, 68, 68, 0.4),
                        inset 0 -2px 0 rgba(239, 68, 68, 0.1) !important;
                    transition: all 0.4s ease !important;
                }

                .enhanced-glassmorphism-card-red:hover {
                    background: rgba(239, 68, 68, 0.2) !important;
                    border: 2px solid rgba(239, 68, 68, 0.4) !important;
                    transform: translateY(-8px);
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        inset 0 2px 0 rgba(239, 68, 68, 0.5),
                        inset 0 -2px 0 rgba(239, 68, 68, 0.2) !important;
                }

                .enhanced-glassmorphism-card-gold {
                    background: rgba(251, 191, 36, 0.15) !important;
                    backdrop-filter: blur(25px);
                    -webkit-backdrop-filter: blur(25px);
                    border: 2px solid rgba(251, 191, 36, 0.3) !important;
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.4),
                        inset 0 2px 0 rgba(251, 191, 36, 0.4),
                        inset 0 -2px 0 rgba(251, 191, 36, 0.1) !important;
                    transition: all 0.4s ease !important;
                }

                .enhanced-glassmorphism-card-gold:hover {
                    background: rgba(251, 191, 36, 0.2) !important;
                    border: 2px solid rgba(251, 191, 36, 0.4) !important;
                    transform: translateY(-8px);
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        inset 0 2px 0 rgba(251, 191, 36, 0.5),
                        inset 0 -2px 0 rgba(251, 191, 36, 0.2) !important;
                }
            `}</style>
    </div>
  )
}

export default CqCustom
