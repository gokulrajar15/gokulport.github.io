import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MouseTrailer.css'

const MouseTrailer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState([])
  const [isClicking, setIsClicking] = useState(false)
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY, id: Date.now() }
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      setTrail(prev => [...prev.slice(-12), newPosition])
    }
    
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-8))
    }, 100)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <>
      {/* Main cursor follower */}
      <motion.div
        className={`cursor-main ${isClicking ? 'clicking' : ''}`}
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className={`cursor-ring ${isClicking ? 'clicking' : ''}`}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
      />
      
      {/* Trail dots */}
      <AnimatePresence>
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            className="cursor-trail"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ 
              opacity: (i + 1) / trail.length * 0.4,
              scale: (i + 1) / trail.length * 0.8,
            }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              left: point.x - 3,
              top: point.y - 3,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

export default MouseTrailer
