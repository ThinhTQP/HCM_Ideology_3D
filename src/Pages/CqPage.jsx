import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import Transition from '../Ui/Transition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useScrollStore } from '../components/ScrollManager'
import { getSafeBasePathUrl } from '../utils'
import ScrollManager from '../components/ScrollManager'
import DangCustom from '../Ui/DangCustom'
import CqCustom from '../Ui/CqCustom'
const model1Url = getSafeBasePathUrl('/trong.glb')
const model2Url = getSafeBasePathUrl('/HCM.glb')

// Generic GLB loader that keeps skinning/materials and supports opacity
function GLBModel({ url, position = [0, 0, 0], rotationY = 0, scale = 1, opacity = 1, tint = null }) {
    const gltf = useGLTF(url)
    const scene = useMemo(() => {
        const cloned = gltf.scene.clone(true)
        cloned.traverse(child => {
            if (child.isMesh || child.isSkinnedMesh) {
                child.castShadow = true
                child.receiveShadow = true
                if (child.material) {
                    // đảm bảo map dùng sRGB để màu sáng/chuẩn
                    if (child.material.map) child.material.map.encoding = THREE.sRGBEncoding
                    if (child.material.emissiveMap) child.material.emissiveMap.encoding = THREE.sRGBEncoding

                    // tùy chỉnh để "bật" màu hơn
                    child.material.transparent = true
                    child.material.depthWrite = true
                    // tăng envMap phản xạ, giảm roughness để màu nổi bật hơn
                    child.material.envMapIntensity = (child.material.envMapIntensity ?? 1) * 1.6
                    child.material.roughness = (child.material.roughness ?? 0.6) * 0.6
                    child.material.metalness = (child.material.metalness ?? 0) * 0.8

                    // nếu truyền tint thì áp màu này (nhân với texture nếu có)
                    if (tint) {
                        child.material.color = new THREE.Color(tint)
                        // làm emissive 1/3 tint để tăng độ sáng nhìn bằng mắt
                        child.material.emissive = new THREE.Color(tint).multiplyScalar(0.25)
                    }

                    child.material.needsUpdate = true
                }
            }
        })
        return cloned
    }, [gltf.scene, tint])

    // Apply opacity each frame (cheap)
    useFrame(() => {
        scene.traverse(child => {
            if ((child.isMesh || child.isSkinnedMesh) && child.material && 'opacity' in child.material) {
                child.material.opacity = opacity
            }
        })
    })

    return (
        <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
            <primitive object={scene} />
        </group>
    )
}

// Scroll-driven models: shows both models at top, then animates flag into red rectangle
function ScrollDrivenModels() {
    const groupA = useRef()
    const groupB = useRef()
    const pageRef = useRef(useScrollStore.getState().page)
    const ratioRef = useRef(useScrollStore.getState().scrollRatio)

    useEffect(() => {
        return useScrollStore.subscribe(state => {
            pageRef.current = state.page
            ratioRef.current = state.scrollRatio
        })
    }, [])

    useFrame((_, dt) => {
        if (!groupA.current || !groupB.current) return

        // On first page (title): show both models side by side
        if (pageRef.current === 0) {
            // Lenin statue on left
            const targetPosA = new THREE.Vector3(2, -1.5, 2)
            groupA.current.position.lerp(targetPosA, 0.05)
            groupA.current.rotation.y = THREE.MathUtils.damp(groupA.current.rotation.y, 0, 3, dt)

           
            const targetPosB = new THREE.Vector3(3, -1.5, 0)
            groupB.current.position.lerp(targetPosB, 0.05)

            // Nghiêng lên 35 độ (Math.PI/5) trục X, xoay tròn quanh Y
            const tiltX = Math.PI / 7
            groupB.current.rotation.x = THREE.MathUtils.damp(groupB.current.rotation.x, tiltX, 3, dt)
            groupB.current.rotation.y += dt * 1.1 // tốc độ xoay, chỉnh lại nếu muốn nhanh/chậm hơn

            groupB.current.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9), 0.05)
        } else if (pageRef.current === 1) {
            // On concept page: Lenin stays left, flag moves right and spins
            const leninTarget = new THREE.Vector3(-2, 0, 0)
            groupA.current.position.lerp(leninTarget, 0.03)

            const flagTarget = new THREE.Vector3(2.5, 0, 0) // Move to red rectangle center
            groupB.current.position.lerp(flagTarget, 0.05)
        } else {
            // Other sections: keep models positioned
            const leninTarget = new THREE.Vector3(-10, 0, 0)
            groupA.current.position.lerp(leninTarget, 0.03)
            const flagTarget = new THREE.Vector3(10, 0, 0)
            groupB.current.position.lerp(flagTarget, 0.03)
        }
    })

    return (
        <>
            {/* Lenin Statue */}
            <group ref={groupA}>
                

            </group>

            <group ref={groupB}>
                <GLBModel url={model1Url} position={[0, 0, 0]} rotationY={0} scale={0.2} opacity={1} />
            </group>
        </>
    )
}

const CqPage = () => {
    return (
        <>
            <div className="Scene fixed h-screen w-full top-0 pointer-events-none bg-gradient-to-br from-red-700 via-red-800 to-red-200">        <HelmetProvider>
                <Helmet>
                    <title>HCM Ideology · Vai trò</title>
                    <meta name="description" content="Mô hình 3D thay đổi theo nội dung khi cuộn." data-rh="true" />
                </Helmet>
            </HelmetProvider>
                <Canvas
                    className="pointer-events-none"
                    shadows
                    gl={{
                        alpha: true,                                    /* allow transparency */
                        physicallyCorrectLights: true,
                        preserveDrawingBuffer: true,
                        antialias: true,
                        toneMapping: THREE.ACESFilmicToneMapping,       /* nicer tone mapping */
                        toneMappingExposure: 1.6,                       /* increase exposure to brighten scene */
                        outputEncoding: THREE.sRGBEncoding                       /* increase exposure to brighten scene */

                    }}
                    camera={{ position: [0, 0.4, 7], fov: 45 }}
                >
                    <ambientLight intensity={0.9} />
                    <hemisphereLight skyColor={0xffffff} groundColor={0x222222} intensity={0.35} />
                    <directionalLight intensity={2} position={[5, 5, 5]} castShadow />
                    <directionalLight intensity={1} position={[-4, 3, -4]} />

                    <pointLight intensity={0.} position={[0, 4, 4]} />

                    <OrbitControls enablePan={false} enableZoom={false} minDistance={3} maxDistance={15} />
                    <ScrollDrivenModels />
                </Canvas>
            </div>
            {/* Self-contained scroll + content for this page */}
            <div className="relative z-1 pointer-events-auto">
                <CqCustom />
                <ScrollManager pages={[{}, {}, {}]} pathname={'/mo-rong'} />
            </div>
        </>
    )
}

export default Transition(CqPage)
