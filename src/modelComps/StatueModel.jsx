import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { forwardRef, useEffect } from 'react'
import { getSafeBasePathUrl } from '../utils'

const modelUrl = getSafeBasePathUrl('/president_ho_chi_minh_statue.glb')

const StatueModel = forwardRef(({ position, rotation, scale, ...props }, ref) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { nodes, materials } = useGLTF(modelUrl)
  

  const meshNode = Object.values(nodes).find(node => node.geometry)
  const nodeKey = Object.keys(nodes).find(key => nodes[key].geometry)

  console.log('Found mesh node:', meshNode)
  console.log('Node key:', nodeKey)

  if (!meshNode) {
    console.error('No mesh node found with geometry')
    return null
  }

  // Kiểm tra materials an toàn
  if (materials.material_0) {
    materials.material_0.depthWrite = true
    materials.material_0.transparent = true
  }

  return (
    <group {...props} position={position} scale={scale} dispose={null} rotation={[0, 0, rotation]}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={meshNode.geometry} 
        material={materials.material_0 || meshNode.material} 
      />
    </group>
  )
})

useGLTF.preload(modelUrl)

export default StatueModel