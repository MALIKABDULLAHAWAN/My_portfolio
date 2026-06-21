import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 120
const CONNECT_DIST = 14
const SPREAD = 38

// Static math/position generation initialized once in module scope
// This prevents impure calls inside render and avoids layout recalculation
const { positions, phases, nodeColors } = (() => {
  const posArr = []
  const phaseArr = []
  const colorArr = []

  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = SPREAD * Math.cbrt(Math.random())

    posArr.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    )

    phaseArr.push(Math.random() * Math.PI * 2)

    if (i % 3 === 0) {
      colorArr.push(0, 0.83, 1)
    } else if (i % 3 === 1) {
      colorArr.push(0.48, 0.18, 1)
    } else {
      colorArr.push(0.9, 0.9, 1)
    }
  }

  return {
    positions: new Float32Array(posArr),
    phases: new Float32Array(phaseArr),
    nodeColors: new Float32Array(colorArr)
  }
})()

// Float arrays for rendering connections and calculations are declared in module scope
// to prevent accessing refs inside render hooks or causing React compiler impure violations.
const current = new Float32Array(NODE_COUNT * 3)
const linePositions = new Float32Array(NODE_COUNT * 10 * 6)
const lineColors = new Float32Array(NODE_COUNT * 10 * 6)

function NeuralScene({ mouse }) {
  const pointsRef = useRef()
  const linesRef = useRef()

  useFrame(({ clock, camera }) => {
    const elapsed = clock.getElapsedTime()
    const spawnT = Math.min(elapsed / 1.5, 1)
    const spawn = 1 - Math.pow(1 - spawnT, 3)

    // Smooth camera to mouse parallax
    const targetX = mouse.current[0] * 5
    const targetY = -mouse.current[1] * 3.5
    camera.position.x += (targetX + Math.sin(elapsed * 0.02) * 3 - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)

    if (!pointsRef.current || !linesRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position
    let li = 0
    const maxLines = NODE_COUNT * 10

    // Update node positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const t = elapsed + phases[i]
      const sx = positions[i * 3] * spawn + Math.sin(t * 0.4 + phases[i]) * 0.25
      const sy = positions[i * 3 + 1] * spawn + Math.cos(t * 0.35 + phases[i] * 1.3) * 0.25
      const sz = positions[i * 3 + 2] * spawn + Math.sin(t * 0.3 + phases[i] * 0.7) * 0.25

      posAttr.setXYZ(i, sx, sy, sz)
      current[i * 3] = sx
      current[i * 3 + 1] = sy
      current[i * 3 + 2] = sz
    }
    posAttr.needsUpdate = true
    pointsRef.current.material.opacity = Math.min(spawn * 0.85, 0.85)

    // Build connections list
    for (let i = 0; i < NODE_COUNT && li < maxLines - 1; i++) {
      for (let j = i + 1; j < NODE_COUNT && li < maxLines - 1; j++) {
        const dx = current[i * 3] - current[j * 3]
        const dy = current[i * 3 + 1] - current[j * 3 + 1]
        const dz = current[i * 3 + 2] - current[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (d < CONNECT_DIST) {
          const pulse = (Math.sin(elapsed * 2 + phases[i] + phases[j]) + 1) * 0.5
          const fade = (1 - d / CONNECT_DIST) * pulse
          const base = li * 6

          linePositions[base] = current[i * 3]
          linePositions[base + 1] = current[i * 3 + 1]
          linePositions[base + 2] = current[i * 3 + 2]
          linePositions[base + 3] = current[j * 3]
          linePositions[base + 4] = current[j * 3 + 1]
          linePositions[base + 5] = current[j * 3 + 2]

          const c = i / NODE_COUNT
          lineColors[base] = c * 0.48 * fade
          lineColors[base + 1] = (1 - c) * 0.83 * fade
          lineColors[base + 2] = fade
          lineColors[base + 3] = 0.48 * fade
          lineColors[base + 4] = 0.18 * fade
          lineColors[base + 5] = fade

          li++
        }
      }
    }

    const lg = linesRef.current.geometry
    lg.setDrawRange(0, li * 2)
    lg.attributes.position.needsUpdate = true
    lg.attributes.color.needsUpdate = true
    linesRef.current.material.opacity = Math.min(spawn * 0.4, 0.4)
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          vertexColors
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  )
}

export default function NeuralCanvas({ mouse }) {
  return (
    <Canvas
      className="r3f"
      camera={{ position: [0, 0, 55], fov: 70 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <NeuralScene mouse={mouse} />
    </Canvas>
  )
}
