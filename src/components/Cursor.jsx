import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const dotX = useSpring(0, { stiffness: 2000, damping: 80 })
  const dotY = useSpring(0, { stiffness: 2000, damping: 80 })
  const ringX = useSpring(0, { stiffness: 200, damping: 28 })
  const ringY = useSpring(0, { stiffness: 200, damping: 28 })
  const ringScale = useSpring(1, { stiffness: 300, damping: 30 })
  const dotScale = useSpring(1, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX); dotY.set(e.clientY)
      ringX.set(e.clientX); ringY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)

    const handleEnter = () => { ringScale.set(1.8); dotScale.set(0) }
    const handleLeave = () => { ringScale.set(1); dotScale.set(1) }
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })
    return () => window.removeEventListener('mousemove', move)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <motion.div
        className="cursor cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: dotScale
        }}
      />
      <motion.div
        className="cursor cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale
        }}
      />
    </>
  )
}
