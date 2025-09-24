import { useState } from "react"
import Button from '../Ui/Button'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button as MuiButton, Typography, IconButton, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import StatueModel from '../modelComps/StatueModel'
import * as THREE from 'three'

const chartData = {
    "su-ra-doi": {
        id: "su-ra-doi",
        title: "Sự Ra Đời Của Đảng Cộng Sản Việt Nam",
        description:
            "Tổng quan bối cảnh lịch sử, phong trào đấu tranh trong và ngoài nước, cùng các yếu tố tư tưởng đã dẫn tới sự ra đời của Đảng Cộng sản Việt Nam năm 1930.",
        position: { x: 70, y: 20 },
        style: { width: 550, height: 60, fontSize: 1.6, backgroundColor: "#dc2626", color: "#fbbf24" },
        color: "yellow",
    },
    "quan-diem-lenin": {
        id: "quan-diem-lenin",
        title: "Quan điểm của Lê-nin",
        description:
            "Lý luận của V.I. Lê-nin về vai trò lãnh đạo của đảng cách mạng kiểu mới, chuyên chính vô sản và con đường quá độ lên chủ nghĩa xã hội.",
        position: { x: 50, y: 150 },
        style: { width: 200, height: 60, fontSize: 1 },
        color: "cyan",
    },
    "quan-niem-hcm": {
        id: "quan-niem-hcm",
        title: "Quan niệm Hồ Chí Minh",
        description:
            "Tư tưởng Hồ Chí Minh về độc lập dân tộc gắn liền với chủ nghĩa xã hội, xây dựng đảng cách mạng vững mạnh và nhà nước của dân, do dân, vì dân.",
        position: { x: 420, y: 150 },
        style: { width: 210, height: 60, fontSize: 1 },
        color: "green",
    },
    "cn-mac": {
        id: "cn-mac",
        title: "CN Mác",
        description:
            "Chủ nghĩa Mác do Karl Marx và Friedrich Engels sáng lập, gồm triết học duy vật biện chứng, kinh tế chính trị học và chủ nghĩa xã hội khoa học.",
        position: { x: 70, y: 280 },
        style: { width: 70, height: 120, fontSize: 1 },
        color: "cyan",
    },
    "pt-cong-nhan": {
        id: "pt-cong-nhan",
        title: "Pt công nhân",
        description:
            "Phong trào công nhân quốc tế từ thế kỷ XIX đấu tranh chống áp bức tư bản, giành quyền lợi kinh tế – chính trị và hướng tới xã hội công bằng.",
        position: { x: 170, y: 280 },
        style: { width: 70, height: 120, fontSize: 1 },
        color: "cyan",
    },
    "pt-yeu-nuoc": {
        id: "pt-yeu-nuoc",
        title: "Pt yêu nước VN",
        description:
            "Phong trào yêu nước của dân tộc Việt Nam với truyền thống chống ngoại xâm lâu đời, phát triển qua các cuộc khởi nghĩa, phong trào Đông Du, Duy Tân…",
        position: { x: 400, y: 280 },
        style: { width: 70, height: 120, fontSize: 1 },
        color: "green",
    },
    "cn-mac-lenin": {
        id: "cn-mac-lenin",
        title: "CN Mác-Lênin",
        description:
            "Chủ nghĩa Mác – Lênin là sự kế thừa và phát triển chủ nghĩa Mác do V.I. Lênin hoàn thiện, bổ sung lý luận về đảng tiên phong và cách mạng vô sản.",
        position: { x: 500, y: 280 },
        style: { width: 70, height: 120, fontSize: 1 },
        color: "green",
    },
    "pt-cong-nhan-vn": {
        id: "pt-cong-nhan-vn",
        title: "Pt công nhân VN",
        description:
            "Phong trào công nhân ở Việt Nam đầu thế kỷ XX với các cuộc bãi công, đấu tranh đòi cải thiện điều kiện lao động và giành quyền lợi dân tộc.",
        position: { x: 600, y: 280 },
        style: { width: 70, height: 120, fontSize: 1 },
        color: "green",
    },
    "dang-cong-san-nga": {
        id: "dang-cong-san-nga",
        title: "Đảng Cộng Sản Nga",
        description:
            "Đảng Cộng sản Nga (1898) – tiền thân Đảng Cộng sản Liên Xô – dẫn dắt Cách mạng Tháng Mười 1917, ảnh hưởng sâu sắc đến phong trào cộng sản quốc tế, trong đó có Việt Nam.",
        position: { x: 50, y: 460 },
        style: { width: 200, height: 60, fontSize: 1 },
        color: "cyan",
    },
    "dang-csvn": {
        id: "dang-csvn",
        title: "Đảng Cộng sản VN",
        description:
            "Đảng Cộng sản Việt Nam thành lập ngày 3/2/1930, do Nguyễn Ái Quốc sáng lập, lãnh đạo cách mạng giành độc lập, thống nhất đất nước và xây dựng xã hội chủ nghĩa.",
        position: { x: 435, y: 460 },
        style: { width: 210, height: 60, fontSize: 1 },
        color: "green",
    },
};



const connections = [
    { from: "su-ra-doi", to: "quan-diem-lenin" },
    { from: "su-ra-doi", to: "quan-niem-hcm" },
    { from: "quan-diem-lenin", to: "cn-mac" },
    { from: "quan-diem-lenin", to: "pt-cong-nhan" },
    { from: "cn-mac", to: "dang-cong-san-nga" },
    { from: "pt-cong-nhan", to: "dang-cong-san-nga" },
    { from: "quan-niem-hcm", to: "pt-yeu-nuoc" },
    { from: "quan-niem-hcm", to: "cn-mac-lenin" },
    { from: "quan-niem-hcm", to: "pt-cong-nhan-vn" },
    { from: "pt-yeu-nuoc", to: "dang-csvn" },
    { from: "cn-mac-lenin", to: "dang-csvn" },
    { from: "pt-cong-nhan-vn", to: "dang-csvn" },

]

const SVG_PADDING = 24 // inset-6 = 1.5rem = 24px

const getTopCenter = (node) => ({
    x: node.position.x + (node.style.width / 2) - SVG_PADDING,
    y: node.position.y - SVG_PADDING
})

const getBottomCenter = (node) => ({
    x: node.position.x + (node.style.width / 2) - SVG_PADDING,
    y: node.position.y + node.style.height - SVG_PADDING
})
// Component 3D Scene cho Statue
const StatueScene = () => {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <Environment preset="studio" environmentIntensity={0.3} />

            <StatueModel
                position={[0, -0.5, 0]}
                rotation={0}
                scale={4}
            />

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2}
                maxDistance={10}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={1}
            />
        </>
    )
}

export default function VietnameseCommunistPartyChart() {
    const [selectedNode, setSelectedNode] = useState(null)
    const [showStatueInfo, setShowStatueInfo] = useState(false)

    const handleNodeClick = (nodeId) => {
        setSelectedNode(chartData[nodeId])
    }

    const handleClose = () => {
        setSelectedNode(null)
    }
    const handleStatueInfoClose = () => {
        setShowStatueInfo(false)
    }
    return (
        <div className="w-full min-h-screen flex items-center justify-center py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between gap-8">
                    {/* Left side - 3D Statue Model (chiếm 25% width) */}
                    <div className="w-2/4">
                        <div className="relative overflow-hidden mb-4" style={{ height: "600px" }}>
                            <Canvas
                                camera={{ position: [0, 0, 6], fov: 45 }}
                                gl={{
                                    antialias: true,
                                    toneMapping: THREE.ACESFilmicToneMapping,
                                    toneMappingExposure: 1,
                                }}
                                shadows
                            >
                                <StatueScene />
                            </Canvas>
                        </div>
                        {/* Statue caption with info icon */}
                        <div className="flex items-center justify-center gap-2">
                            <Typography className="text-center text-sm text-white italic" variant="h6">
                                Tượng Bác Hồ tại Singapore
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

                    {/* Right side - Interactive organizational chart (chiếm 70% width) */}
                    <div className="w-2/4">
                        <div className="relative w-full h-[600px] p-0 ">
                            <svg className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] pointer-events-none">
                                <defs>
                                    {/* Mũi tên nhỏ cho các line còn lại */}
                                    <marker
                                        id="arrow-head-sm"
                                        viewBox="0 0 10 10"
                                        refX="8"
                                        refY="5"
                                        markerWidth="5"
                                        markerHeight="5"
                                        orient="auto"
                                        markerUnits="strokeWidth"
                                    >
                                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#141313ff" />
                                    </marker>
                                </defs>

                                {connections.map((connection, index) => {
                                    const fromNode = chartData[connection.from]
                                    const toNode = chartData[connection.to]
                                    const a = getBottomCenter(fromNode)
                                    const b = getTopCenter(toNode)

                                    const isRootEdge = connection.from === 'su-ra-doi' &&
                                        (connection.to === 'quan-diem-lenin' || connection.to === 'quan-niem-hcm')

                                    return (
                                        <line
                                            key={index}
                                            x1={a.x}
                                            y1={a.y}
                                            x2={b.x}
                                            y2={b.y}
                                            stroke={isRootEdge ? '#fbbf24' : '#141313ff'}   // 2 line từ root màu vàng
                                            strokeWidth="2"
                                            opacity="0.7"
                                            markerEnd={isRootEdge ? undefined : 'url(#arrow-head-sm)'} // 2 line này không có mũi tên
                                        />
                                    )
                                })}
                            </svg>

                            {/* Chart nodes */}
                            {Object.values(chartData).map((node) => (
                                <button
                                    key={node.id}
                                    onClick={() => handleNodeClick(node.id)}
                                    className={`absolute p-3 text-center rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:z-10 ${node.color === "cyan"
                                        ? "border-red-400 bg-red-50 hover:bg-red-100 text-red-700"
                                        : "border-yellow-400 bg-yellow-50 hover:bg-yellow-100 text-yellow-800"
                                        }`}
                                    style={{
                                        left: `${node.position.x}px`,
                                        top: `${node.position.y}px`,
                                        width: `${node.style.width}px`,
                                        height: `${node.style.height}px`,
                                        fontSize: `${node.style.fontSize}rem`,
                                        backgroundColor: node.style.backgroundColor,
                                        color: node.style.color,
                                        fontWeight: "600",
                                        zIndex: 1,
                                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                                    }}
                                >
                                    {node.title}
                                </button>
                            ))}
                        </div>
                        <Typography className=" text-sm italic text-center " variant="body2" style={{ color: "#f5f0f0ff" }}>
                            *Nhấn vào các ô để xem chi tiết
                        </Typography>
                    </div>
                </div>
            </div>
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

            {/* MUI Dialog */}
            <Dialog
                open={!!selectedNode}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: "#fef7ed",
                        border: "2px solid #dc2626",
                        borderRadius: "12px",
                    },
                }}
            >
                <DialogTitle style={{ color: "#dc2626", fontWeight: "bold", fontSize: "1.25rem" }}>
                    {selectedNode?.title}
                </DialogTitle>
                <DialogContent>
                    <p style={{ color: "#7f1d1d", fontSize: "1.2rem" }} className="text-sm leading-relaxed" >
                        {selectedNode?.description}
                    </p>
                </DialogContent>
                <DialogActions>
                    <MuiButton
                        onClick={handleClose}
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
        </div>
    )
}