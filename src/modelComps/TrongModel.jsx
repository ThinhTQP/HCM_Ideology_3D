import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { forwardRef, useEffect, useMemo } from 'react'
import { getSafeBasePathUrl } from '../utils'

const modelUrl = getSafeBasePathUrl('/trong.glb')

const TrongModel  = forwardRef(({ position = [0, 0, 0], rotation = 0, scale = 1,  ...props }, ref) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const gltf = useGLTF(modelUrl)

  // Clone toàn bộ scene để giữ skeleton/skin + materials, sau đó override material thành đơn màu
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true)

    cloned.traverse((child) => {
      if (child.isMesh || child.isSkinnedMesh) {
        child.castShadow = true
        child.receiveShadow = true

    
        child.material.depthWrite = true
        child.material.needsUpdate = true
      }
    })

    return cloned
  }, [gltf.scene])

  return (
    <group ref={ref} {...props} position={position} scale={scale} rotation={[0, rotation, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  )
})

useGLTF.preload(modelUrl)

export default TrongModel