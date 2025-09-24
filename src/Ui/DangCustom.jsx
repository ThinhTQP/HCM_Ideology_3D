"use client"

import { useLocation } from "react-router-dom"
import useStore from "../GlobalState"
import Button from "./Button"
import { useMediaQuery } from "react-responsive"
import NavPrevNextButtons from "./NavPrevNextButtons"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import LeninModel from "../modelComps/LeninModel"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button as MuiButton,
    Typography,
    IconButton,
    Tooltip
} from "@mui/material"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import InfoIcon from "@mui/icons-material/Info"
import StarIcon from "@mui/icons-material/Star"
import GroupsIcon from "@mui/icons-material/Groups"
import PolicyIcon from "@mui/icons-material/Policy"
import HandshakeIcon from "@mui/icons-material/Handshake"
import PublicIcon from "@mui/icons-material/Public"
import SecurityIcon from "@mui/icons-material/Security"
import GavelIcon from "@mui/icons-material/Gavel"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const DangCustom = ({ openModal, scrollToTop }) => {
    const showFullscreenMode = useStore((state) => state.showFullscreenMode)
    const isBigScreen = useMediaQuery({ query: "(min-width: 640px)" })
    const location = useLocation()
    const pathname = location.pathname
    const [showStatueInfo, setShowStatueInfo] = useState(false)

    const headerRef = useRef(null)
    const section1Ref = useRef(null)
    const section2Ref = useRef(null)
    const section3Ref = useRef(null)

    const headerInView = useInView(headerRef, { once: true, threshold: 0.3 })
    const section1InView = useInView(section1Ref, { once: true, threshold: 0.3 })
    const section2InView = useInView(section2Ref, { once: true, threshold: 0.3 })
    const section3InView = useInView(section3Ref, { once: true, threshold: 0.3 })

    const handleStatueInfoClose = () => {
        setShowStatueInfo(false)
    }

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

    const StatueScene = () => {
        return (
            <>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow shadow-mapSize={[1024, 1024]} />
                <Environment preset="studio" environmentIntensity={0.3} />

                <LeninModel position={[1.5, 1.2, 0]} rotation={0} scale={0.2} />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={1}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </>
        )
    }

    const timelinePrinciples = [
        {
            title: "Chủ nghĩa Mác Lênin",
            description: "Lấy chủ nghĩa Mác Lênin làm nền tảng tư tưởng, kim chỉ nam cho mọi hành động",
            icon: <StarIcon />,
            color: "#ef4444",
        },
        {
            title: "Tập trung dân chủ",
            description: "Nguyên tắc tổ chức và hoạt động cơ bản của Đảng",
            icon: <GroupsIcon />,
            color: "#f59e0b",
        },
        {
            title: "Tự phê bình và phê bình",
            description: "Phương pháp tự hoàn thiện và phát triển của Đảng",
            icon: <PolicyIcon />,
            color: "#10b981",
        },
        {
            title: "Kỷ luật nghiêm minh, tự giác",
            description: "Đảm bảo sự thống nhất và hiệu quả hoạt động",
            icon: <GavelIcon />,
            color: "#3b82f6",
        },
        {
            title: "Thường xuyên chỉnh đốn",
            description: "Đảng phải thường xuyên chỉnh đốn để luôn trong sạch, vững mạnh",
            icon: <SecurityIcon />,
            color: "#8b5cf6",
        },
        {
            title: "Đoàn kết, thống nhất",
            description: "Đoàn kết, thống nhất trong Đảng là sức mạnh của Đảng",
            icon: <HandshakeIcon />,
            color: "#ec4899",
        },
        {
            title: "Liên hệ mật thiết với nhân dân",
            description: "Đảng phải liên hệ mật thiết với nhân dân, phục vụ nhân dân",
            icon: <GroupsIcon />,
            color: "#06b6d4",
        },
        {
            title: "Đoàn kết quốc tế",
            description: "Đoàn kết với các đảng cộng sản và lực lượng tiến bộ trên thế giới",
            icon: <PublicIcon />,
            color: "#84cc16",
        },
    ]

    return (
        <>
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 50 }}
                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="header min-h-screen w-full flex flex-col items-left justify-center px-4 md:px-8 py-8"
                style={{ height: window.innerHeight }}
            >
                <div className="flex flex-col lg:flex-row">
                    <NavPrevNextButtons className="mr-0 lg:mr-[2rem] mb-4 lg:mb-0" scrollToTop={scrollToTop} />
                    <div className="flex flex-col">
                        <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                            Đảng phải trong sạch, vững mạnh
                        </h1>
                        <div className="intro-buttons flex flex-col sm:flex-row gap-3 mt-8">
                            {pathname !== "/" ? (
                                <>
                                    <Button
                                        onClick={scrollToInnerHeight}
                                        className="w-full md:w-auto pointer-events-auto"
                                        value="Khám phá nội dung"
                                    />
                                    <Button
                                        onClick={fullscreenMode}
                                        type="secondary"
                                        className="pointer-events-auto w-full md:w-auto"
                                        value="Xem mô hình 3D"
                                    />
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="content flex flex-col items-center justify-center">
                <motion.div
                    ref={section1Ref}
                    initial={{ opacity: 0, x: -100 }}
                    animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="min-h-screen flex items-center px-8 py-16"
                >
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-20 leading-tight"
                        >
                            Đảng là đạo đức, là văn minh
                        </motion.h2>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Đảng là đạo đức */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <div className="enhanced-glassmorphism-card p-10 rounded-3xl h-full">
                                    <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">Đảng là đạo đức</h3>
                                    <div className="space-y-6 text-white/90 text-xl md:text-2xl leading-relaxed">
                                        <p>
                                            <span className="font-semibold text-amber-300">Thứ nhất,</span> mục đích hoạt động của Đảng là
                                            lãnh đạo đấu tranh giải phóng dân tộc, giải phóng xã hội, giải phóng giai cấp, giải phóng con
                                            người.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Thứ hai,</span> Cương lĩnh, đường lối, chủ trương
                                            và mọi hoạt động thực tiễn của Đảng đều phải nhắm mục đích trên.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Thứ ba,</span> đội ngũ đảng viên phải luôn luôn
                                            thấm nhuần đạo đức cách mạng, ra sức tu dưỡng, rèn luyện suốt đời.
                                        </p>
                                    </div>
                                    <img
                                        src="https://media.baothaibinh.com.vn/upload/news/9_2023/quan_diem_dang_ta_la_dao_duc_la_van_minh_cua_chu_tich_ho_chi_minh_va_su_van_dung_cua_dang_ta_trong_giai_doan_hien_nay_08124124092023.jpg"
                                        alt="Tượng Bác Hồ tại Singapore"
                                        className="block mx-auto w-full max-w-md rounded-lg shadow-md mt-5"
                                    />
                                </div>
                            </motion.div>

                            {/* Đảng là văn minh */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={section1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div className="enhanced-glassmorphism-card p-10 rounded-3xl h-full">
                                    <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">Đảng là văn minh</h3>
                                    <div className="space-y-4 text-white/90 text-xl md:text-2xl leading-relaxed">
                                        <p>
                                            <span className="font-semibold text-amber-300">Một là,</span> đảng văn minh là Đảng tiêu biểu cho
                                            lương tâm, trí tuệ và danh dự của dân tộc.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Hai là,</span> Đảng ra đời là một tất yếu, phù hợp
                                            với quy luật phát triển văn minh, tiến bộ của dân tộc và của nhân loại.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Ba là,</span> đảng phải luôn trong sạch, vững mạnh,
                                            làm tròn sứ mệnh lịch sử do nhân dân, dân tộc giao phó.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Bốn là,</span> Đảng hoạt động trong khuôn khổ của
                                            Hiến pháp và pháp luật.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Năm là,</span> có đội ngũ đảng viên luôn là những
                                            chiến sĩ tiên phong, gương mẫu trong công tác và cuộc sống.
                                        </p>
                                        <p>
                                            <span className="font-semibold text-amber-300">Sáu là,</span> Đảng có quan hệ quốc tế trong sáng.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 3D Model Section */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-16 flex justify-center"
                        >
                        
                        </motion.div> */}
                    </div>
                </motion.div>

                <motion.div
                    ref={section2Ref}
                    initial={{ opacity: 0, y: 100 }}
                    animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="min-h-screen flex items-center px-8 py-16"
                >
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-20 leading-tight"
                        >
                            Nguyên tắc trong xây dựng và hoạt động của Đảng
                        </motion.h2>

                        <div className="enhanced-glassmorphism-card p-8 md:p-12 rounded-3xl">
                            <Timeline position="alternate">
                                {timelinePrinciples.map((principle, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        animate={section2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    >
                                        <TimelineItem>
                                            <TimelineOppositeContent
                                                sx={{
                                                    m: "auto 0",
                                                    color: "rgba(255, 255, 255, 0.8)",
                                                    fontSize: { xs: "1rem", md: "1.25rem" },
                                                    fontWeight: 600,
                                                }}
                                                align={index % 2 === 0 ? "right" : "left"}
                                                variant="body2"
                                            >
                                                {`Nguyên tắc ${index + 1}`}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot
                                                    sx={{
                                                        bgcolor: principle.color,
                                                        width: 60,
                                                        height: 60,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    {principle.icon}
                                                </TimelineDot>
                                                {index < timelinePrinciples.length - 1 && (
                                                    <TimelineConnector sx={{ bgcolor: "rgba(255, 255, 255, 0.3)", height: 80 }} />
                                                )}
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                                                <div className="glassmorphism-card p-6 rounded-2xl">
                                                    <Typography
                                                        variant="h6"
                                                        component="span"
                                                        sx={{
                                                            color: "white",
                                                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                                                            fontWeight: "bold",
                                                            mb: 1,
                                                            display: "block",
                                                        }}
                                                    >
                                                        {principle.title}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: "rgba(255, 255, 255, 0.9)",
                                                            fontSize: { xs: "1rem", md: "1.125rem" },
                                                            lineHeight: 1.6,
                                                        }}
                                                    >
                                                        {principle.description}
                                                    </Typography>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </motion.div>
                                ))}
                            </Timeline>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    ref={section3Ref}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={section3InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="min-h-screen flex items-center px-8 py-16"
                >
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-20 leading-tight"
                        >
                            Xây dựng đội ngũ cán bộ, đảng viên
                        </motion.h2>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <div className="enhanced-glassmorphism-card p-10 rounded-3xl">
                                    <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                                        Yêu cầu đối với cán bộ, đảng viên
                                    </h3>
                                    <div className="space-y-4 text-white/90 text-xl md:text-2xl leading-relaxed">
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Tuyệt đối trung thành với Đảng</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Nghiêm chỉnh thực hiện cương lĩnh, đường lối, quan điểm, chủ trương, nghị quyết</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Luôn tu dưỡng, rèn luyện, trau dồi đạo đức cách mạng</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Luôn học tập nâng cao trình độ về mọi mặt</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Có mối liên hệ mật thiết với nhân dân</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Luôn chịu trách nhiệm, năng động, sáng tạo</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-300 font-bold text-2xl">•</span>
                                            <p>Luôn phòng và chống tiêu cực</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={section3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div className="enhanced-glassmorphism-card p-0 rounded-3xl overflow-hidden">
                                    {/* container có chiều cao đảm bảo */}
                                    <div className="w-full h-64 md:h-96 relative">
                                        <img
                                            src="https://media.baobinhphuoc.com.vn/upload/news/5_2021/1520e23fb8fa4da414eb_14540719052021.jpg"
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>


                    </div>
                </motion.div>
            </div>

            <style jsx>{`
        .enhanced-glassmorphism-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
        }

        .enhanced-glassmorphism-card:hover {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          transform: translateY(-8px);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 2px 0 rgba(255, 255, 255, 0.5),
            inset 0 -2px 0 rgba(255, 255, 255, 0.2);
        }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .glassmorphism-card:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
        }
      `}</style>

            {/* Statue Info Dialog */}
            <Dialog
                open={showStatueInfo}
                onClose={handleStatueInfoClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: "#fef7ed",
                        border: "2px solid #dc2626",
                        borderRadius: "12px",
                    },
                }}
            >
                <DialogTitle style={{ color: "#dc2626", fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}>
                    Tượng đài Chủ tịch Hồ Chí Minh ở Singapore.
                </DialogTitle>
                <DialogContent>
                    <div className="space-y-4">
                        <img
                            src="https://vegiang.com/images/tuong-bac-ho-tai-Singapore.jpg"
                            alt="Tượng Bác Hồ tại Singapore"
                            className="block mx-auto w-full max-w-md rounded-lg shadow-md mb-4"
                        />
                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Vị trí:</strong> Tượng đặt tại Công viên Merlion, Singapore (1 Empress Pl, Singapore 179555).
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Lịch sử:</strong> Trong quá trình hoạt động cách mạng của mình, Bác có 2 lần đến Singapore: Lần
                            dừng chân thứ nhất hồi tháng 5-1930, sau khi Đảng Cộng sản Việt Nam được thành lập ở Hồng Kông; lần dừng
                            chân thứ 2 vào tháng 1-1933, lúc Bác cố gắng trở về Liên Xô nhưng bất thành và bị buộc phải trở lại Hồng
                            Kông. Tháng 5-2008, nhân kỷ niệm 118 năm ngày sinh Chủ tịch Hồ Chí Minh và 35 năm thiết lập quan hệ ngoại
                            giao với Việt Nam, nước bạn đã khánh thành bia tưởng niệm.
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Ý nghĩa:</strong> Đây là biểu tượng tình hữu nghị Việt Nam - Singapore, thể hiện tầm vóc và tư
                            tưởng của Chủ tịch Hồ Chí Minh đối với nhân dân thế giới.
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Đặc điểm:</strong> Bức tượng bán thân cao 0.55 m, ngang 0.36 m, được đúc bằng đồng. Bên cạnh là
                            phiến đá hoa cương trang trọng cao 1,78 m, ngang 0,54 m và dày 0,21 m mỗi mặt. Mặt trước văn bia gồm 62
                            dòng song ngữ Anh-Việt giới thiệu ngắn gọn về tiểu sử Chủ tịch Hồ Chí Minh. Mặt sau tấm bia tưởng niệm
                            khắc bài thơ "Nghe tiếng giã gạo" của Chủ tịch Hồ Chí Minh bằng chữ Hán kèm bản dịch tiếng Việt và Anh
                            ngữ.
                        </p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <MuiButton
                        onClick={handleStatueInfoClose}
                        style={{
                            color: "#fbbf24",
                            backgroundColor: "#dc2626",
                            fontWeight: "bold",
                            padding: "8px 16px",
                            borderRadius: "6px",
                        }}
                    >
                        Đóng
                    </MuiButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DangCustom
