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
    Tooltip,
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const VaiTroCustom = ({ openModal, scrollToTop }) => {
    const showFullscreenMode = useStore((state) => state.showFullscreenMode)
    const isBigScreen = useMediaQuery({ query: "(min-width: 640px)" })
    const location = useLocation()
    const pathname = location.pathname
    const [showStatueInfo, setShowStatueInfo] = useState(false)
    const [selectedNode, setSelectedNode] = useState(null)

    const headerRef = useRef(null)
    const section1Ref = useRef(null)
    const section2Ref = useRef(null)
    const section3Ref = useRef(null)
    const finalSectionRef = useRef(null)

    const headerInView = useInView(headerRef, { once: true, threshold: 0.3 })
    const section1InView = useInView(section1Ref, { once: true, threshold: 0.3 })
    const section2InView = useInView(section2Ref, { once: true, threshold: 0.3 })
    const finalSectionInView = useInView(finalSectionRef, { once: true, threshold: 0.3 })

    const handleClose = () => {
        setSelectedNode(null)
    }
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
                        <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                            Tính tất yếu và vai trò lãnh đạo của Đảng Cộng sản Việt Nam
                        </h1>
                        <div className="intro-buttons flex flex-col sm:flex-row gap-3 mt-8">
                            {pathname !== "/" ? (
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
                    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="enhanced-glassmorphism-card p-10 rounded-3xl">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
                                    Đảng Cộng sản
                                </h2>

                                <ul className="text-white/90 text-xl md:text-2xl leading-relaxed list-disc list-inside space-y-4">
                                    <li>
                                        Là chính đảng của giai cấp công nhân, là đội tiên phong, bộ tham mưu chiến đấu, lãnh tụ chính trị
                                        của giai cấp công nhân.
                                    </li>
                                    <li>Là đội tiên phong, bộ tham mưu chiến đấu, lãnh tụ chính trị của giai cấp công nhân.</li>
                                    <li>Bao gồm những bộ phận tiên tiến của giai cấp công nhân và các tầng lớp nhân dân lao động.</li>
                                    <li>Lấy chủ nghĩa Mác – Lênin làm nền tảng tư tưởng và kim chỉ nam cho hành động.</li>
                                    <li>Lấy nguyên tắc tập trung dân chủ làm nguyên tắc tổ chức cơ bản của mình.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1"></div>
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
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-20 leading-tight">
                            Tính tất yếu ra đời Đảng Cộng sản
                        </h2>

                        <div className="space-y-32">
                            {/* First Block with enhanced animation */}
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={section2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className="flex flex-col lg:flex-row items-center gap-12"
                            >
                                <div className="flex-1">
                                    <div className="enhanced-glassmorphism-card p-8 rounded-3xl flex flex-col">
                                        <div>
                                            <p className="text-white italic mb-8 text-2xl md:text-3xl leading-relaxed">
                                                "Giai cấp vô sản muốn hoàn thành sứ mệnh lịch sử của mình, phải tổ chức ra chính đảng"
                                                <span className="font-bold not-italic text-amber-300"> - C. Mác</span>
                                            </p>
                                            <p className="text-white italic text-2xl md:text-3xl leading-relaxed">
                                                "Hãy cho chúng tôi một tổ chức những người Cộng sản, chúng tôi sẽ đảo lộn nước Nga"
                                                <span className="font-bold not-italic text-amber-300"> - V.I. Lênin</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center mt-8">
                                            <img
                                                src="https://dienbientv.vn/dataimages/201604/original/images1139306_lenin.jpg"
                                                alt="Giai cấp công nhân"
                                                className="rounded-2xl shadow-2xl max-h-[380px] hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-[300px]">
                                    <div className="relative overflow-hidden mb-6">
                                        <Canvas
                                            camera={{ position: [0, 0, 6], fov: 45 }}
                                            style={{ height: isBigScreen ? "400px" : "300px" }}
                                        >
                                            <StatueScene />
                                        </Canvas>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Typography className="text-center text-lg text-white italic font-medium" variant="h6">
                                            Tượng V.I. Lênin
                                        </Typography>
                                        <Tooltip title="Xem thêm thông tin" arrow>
                                            <IconButton
                                                onClick={() => setShowStatueInfo(true)}
                                                size="small"
                                                sx={{
                                                    color: "#fbbf24",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(251, 191, 36, 0.1)",
                                                    },
                                                }}
                                            >
                                                <InfoIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Second Block with reverse animation */}
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={section2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                className="flex flex-col lg:flex-row-reverse items-center gap-12"
                            >
                                <div className="flex-1">
                                    <div className="enhanced-glassmorphism-card p-8 rounded-3xl">
                                        <h3 className="text-4xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                            Quan điểm của Hồ Chí Minh
                                        </h3>
                                        <p className="text-white/90 italic mb-6 text-xl md:text-2xl leading-relaxed">
                                            "Cách mệnh trước hết phải có cái gì? Trước hết phải có đảng cách mệnh, để trong thì vận động và tổ
                                            chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức và vô sản giai cấp mọi nơi. Đảng có vững
                                            cách mệnh mới thành công, cũng như người cầm lái có vững thì thuyền mới chạy"
                                        </p>
                                        <p className="text-white/90 text-xl md:text-2xl font-semibold">
                                            → Khẳng định sự cần thiết phải có Đảng - nhân tố quyết định thắng lợi của sự nghiệp cách mạng, xuất phát từ yêu cầu phát triển của dân tộc Việt Nam
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-6">
                                    <img
                                        src="https://file.qdnd.vn/data/images/0/2017/10/10/vuhuyen/10102017huyen3.jpg?w=578"
                                        alt="Giai cấp công nhân"
                                        className="rounded-2xl shadow-2xl max-h-[400px] hover:scale-105 transition-transform duration-300"
                                    />
                                    <Typography className="text-center text-lg text-white italic font-medium" variant="h6">
                                        Cuốn “Đường Kách mệnh” bản gốc
                                    </Typography>
                                </div>
                            </motion.div>

                            {/* Third Block with center animation */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={section2InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                className="flex justify-center"
                            >
                                <div className="max-w-8xl">
                                    <h3 className="text-5xl md:text-4xl font-bold text-white mb-9 leading-tight text-center">
                                        Vì sao Hồ Chí Minh lại thêm yếu tố phong trào yêu nước?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            {
                                                title: "1",
                                                description: "Phong trào yêu nước có vị trí, vai trò to lớn trong quá trình phát triển của dân tộc Việt Nam.",
                                                color: "blue-400",
                                            },
                                            {
                                                title: "2",
                                                description: "Phong trào công nhân kết hợp được với phong trào yêu nước vì hai phong trào đó đều có mục tiêu chung. Lợi ích giai cấp công nhân thống nhất với lợi ích dân tộc.",
                                                color: "green-400",
                                            },
                                            {
                                                title: "3",
                                                description: "Phong trào nông dân kết hợp với phong trào công nhân.",
                                                color: "red-400",
                                            },
                                            {
                                                title: "4",
                                                description: "Phong trào yêu nước của trí thức Việt Nam là nhân tố quan trọng thúc đẩy sự kết hợp các yếu tố cho sự ra đời của Đảng cộng sản Việt Nam",
                                                color: "yellow-400",
                                            },
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={section2InView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                                            >
                                                <div className="glassmorphism-card p-6 h-full text-center border border-white/20 rounded-3xl">
                                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${item.color === 'blue-400' ? 'bg-blue-400/20' :
                                                        item.color === 'green-400' ? 'bg-green-400/20' :
                                                            item.color === 'red-400' ? 'bg-red-400/20' :
                                                                'bg-yellow-400/20'
                                                        }`}>
                                                        <span className={`text-2xl font-bold `}>{item.title}</span>
                                                    </div>
                                                    <p className="text-gray-100 text-md leading-relaxed">{item.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    ref={finalSectionRef}
                    initial={{ opacity: 0, y: 100 }}
                    animate={finalSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="min-h-screen flex items-center px-8 py-16 flex-col"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-24 leading-tight">
                        Vai trò của Đảng Cộng sản
                    </h2>
                    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={finalSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex-1"
                        >
                            <div className="enhanced-glassmorphism-card p-10 rounded-3xl">
                                <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-8">
                                    Đảng Cộng sản Việt Nam đóng vai trò lãnh đạo toàn diện đối với cách mạng Việt Nam. Đảng lãnh đạo về
                                    chính trị, tư tưởng và tổ chức; xây dựng đường lối cách mạng đúng đắn; tập hợp và động viên quần chúng
                                    nhân dân; xây dựng và củng cố khối đại đoàn kết toàn dân tộc.
                                </p>
                                <ul className="text-white/80 text-xl md:text-2xl space-y-4">
                                    <li>• Chủ thể hoạch định đường lối.</li>
                                    <li>• Chủ thể tập hợp, giáo dục, giác ngộ và hướng dẫn quần chúng đấu tranh</li>
                                    <li>• Chủ thể liên minh đoàn kết quốc tế.</li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={finalSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="flex items-center justify-center"
                        >
                            <img
                                src="https://i0.wp.com/nhanvanviet.com/wp-content/uploads/2016/09/cs03.png?fit=800%2C445"
                                alt="Giai cấp công nhân"
                                className="rounded-2xl shadow-2xl max-h-[380px] hover:scale-105 transition-transform duration-300"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .enhanced-glassmorphism-card {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }

                .enhanced-glassmorphism-card:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.4);
                    transform: translateY(-5px);
                    box-shadow: 
                        0 12px 40px rgba(0, 0, 0, 0.5),
                        inset 0 1px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.2);
                }

                .glassmorphism-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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
                    Tượng đài V.I. Lênin
                </DialogTitle>
                <DialogContent>
                    <div className="space-y-4">
                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Tên đầy đủ:</strong> Vladimir Ilyich Ulyanov, thường gọi là Lenin.
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Sinh – mất:</strong> Lenin sinh ngày 22 tháng 4 năm 1870 tại Simbirsk, Nga; mất ngày 21 tháng 1 năm 1924 tại Gorki, gần Moscow.
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Vai trò & lịch sử cách mạng:</strong>
                            - Lenin là lãnh đạo chủ chốt của Đảng Bolshevik (Đảng Cộng sản Nga) và chỉ huy Cách mạng Tháng Mười năm 1917, từ đó lập nên Nhà nước Xô Viết đầu tiên trên thế giới.
                            - Sau khi nắm quyền, Lenin thực thi các chính sách như “Chiến tranh cộng sản” (War Communism) trong nội chiến, rồi sau đó đặt ra Chính sách Kinh tế Mới (NEP) để khắc phục khủng hoảng kinh tế.
                            - Lenin cũng xây dựng lý luận Leninism — sự phát triển của chủ nghĩa Marx phù hợp với thực tiễn cách mạng Nga.
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Ý nghĩa & di sản:</strong>
                            - Lenin được xem là người sáng lập Nhà nước Xô Viết và là hình mẫu về tổ chức đảng cách mạng tập trung, kỷ luật.
                            - Tư tưởng Leninism (hệ thống lý luận do Lenin đặt nền) đã trở thành nền tảng của nhiều phong trào xã hội chủ nghĩa, cộng sản trên toàn thế giới trong thế kỷ 20.
                        </p>

                        <p style={{ color: "#7f1d1d" }} className="text-sm leading-relaxed">
                            <strong>Đặc điểm cá nhân & phong cách lãnh đạo:</strong>
                            - Lenin nổi bật về ý chí mạnh mẽ, tư tưởng cách mạng rõ rệt và quyết đoán trong hành động.
                            - Ông chủ trương xây dựng đảng kiểu vanguard (đảng tiên phong) — tổ chức gắn kết các thành viên tuân theo đường lối chung, kỷ luật cao.
                            - Dù chủ trương xã hội chủ nghĩa, Lenin trong thực tiễn cũng linh hoạt: ban đầu dùng NEP để cho phép phần nào kinh tế tư nhân để cứu nước từ khủng hoảng.
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

export default VaiTroCustom
