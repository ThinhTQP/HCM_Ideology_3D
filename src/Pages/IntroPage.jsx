import Transition from '../Ui/Transition'
import IntroContent from '../Data/introduction.json'
import Button from '../Ui/Button'
import * as THREE from 'three'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Environment } from '@react-three/drei'

import { Canvas, useFrame } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import VietnameseCommunistPartyChart from '../components/Chart'
import { useEffect, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Category from '../Ui/Category'
import { getSafeBasePathUrl } from '../utils'
import TrongModel from '../modelComps/TrongModel'


// Scroll-driven models: shows both models at top, then animates flag into red rectangle
function ScrollDrivenModels() {
  const groupB = useRef()

  useFrame((_, dt) => {
    if (!groupB.current) return
    groupB.current.position.lerp(new THREE.Vector3(2, -1, 0), 0.08)
    groupB.current.scale.lerp(new THREE.Vector3(2.8, 2.8, 2.8), 0.08)
    // Nghiêng mặt trống sang trái (nghiêng X dương)
    groupB.current.rotation.x = 1 // khoảng 34 độ, thử 0.5~0.7 để vừa ý
    // Nếu muốn xoay nhẹ quanh trục Y cho hiệu ứng động:
    groupB.current.rotation.y += dt * 0.3 // tốc độ xoay chậm, có thể để 0 nếu muốn đứng yên
  })

  return (
    <group ref={groupB}>
      <TrongModel scale={0.1} position={[0, 0, 0]} />
    </group>
  )
}
const IntroPage = () => {
  const danhMucRef = useRef(null)
  const danhMucInView = useInView(danhMucRef, { amount: 0.2, once: true })
  return (
    <div className="IntroPage bg-gradient-to-br from-red-700 via-red-800 to-red-200 ">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <Canvas
  className="pointer-events-none"
  shadows
  gl={{
    alpha: true,
    physicallyCorrectLights: true,
    preserveDrawingBuffer: true,
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.6,
    outputEncoding: THREE.sRGBEncoding
  }}
  camera={{ position: [0, 0, 7], fov: 45 }}
>
    <ambientLight intensity={0.8} />
                    <hemisphereLight skyColor={0xffffff} groundColor={0x222222} intensity={0.35} />
                    <directionalLight intensity={2} position={[5, 5, 5]} castShadow />
                    <directionalLight intensity={1} position={[-4, 3, -4]} />
                    <pointLight intensity={0.} position={[0, 4, 4]} />

  <Environment preset="city" />
  <OrbitControls
    enablePan={false}
    enableZoom={false}
    minDistance={3}
    maxDistance={15}
    target={[0, 0, 0]}
  />
  <ScrollDrivenModels />
</Canvas>
      </div>
      <div className="overflow-hidden absolute w-full h-screen flex items-end pointer-events-none">
        <ScrollDownIndicator className={'mb-10 absolute'}></ScrollDownIndicator>
      </div>

      <main className="relative z-10 flex w-full overflow-hidden flex-col justify-center items-center p-4">
        <HelmetProvider>
          <Helmet>
            <title>3D Stories</title>
            <meta name="description" content="" data-rh="true" />
            <meta name="keywords" content="UCLAB, C²DH" />
          </Helmet>
        </HelmetProvider>

        <div className="h-screen flex items-center sm:translate-x-[0rem] xl:translate-x-[-12rem]">
          {IntroContent?.sections?.map((d, i) =>
            i === 0 ? (
              <div key={d.path ?? i} className="intro relative">
                <h1 className="font-bold uppercase mb-2 title-1">Tư tưởng Hồ Chí Minh </h1>
                <h1 className="font-bold uppercase title-2 ">về Đảng Cộng sản Việt Nam</h1>
                <Link to="/vai-tro">
                  <Button
                    className="hero-button  mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value="Khám phá →"
                  />
                </Link>
              </div>
            ) : null
          )}
        </div>
        <section
          className="flex relative flex-col with-background w-screen justify-center items-center"
        >
          <VietnameseCommunistPartyChart />
        </section>
        <section ref={danhMucRef} className="w-full flex flex-col justify-center items-center">
          <motion.h2
            className="mb-[3rem] mt-[8rem] relative font-bold uppercase category md:w-auto sm:mr-0 md:mr-3 xl2:mr-3  "
            initial={{ opacity: 0, y: 24 }}
            animate={danhMucInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
          >
            Danh mục
          </motion.h2>

          {IntroContent?.sections
            .filter(section => section.category)
            .map((section, i) => (
              <motion.div
                className="category-block mb-[10rem]"
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={danhMucInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                {section.category.map((member, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, y: 15 }}
                    animate={danhMucInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, delay: 0.1 * i + 0.05 * j }}
                  >
                    <Category
                      key={member.name}
                      name={member.name}
                      img={member.img}
                      sub={member.sub}
                      uni={member.uni}
                      link={member.link}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ))}
        </section>
      </main>
    </div>
  )
}

export default Transition(IntroPage)
