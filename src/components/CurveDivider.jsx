import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './CurveDivider.css'

const CurveDivider = ({ type = 'sigmoid' }) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  
  const curves = {
    sigmoid: {
      fn: (x) => 1 / (1 + Math.exp(-x)),
      label: 'σ(x) = 1/(1 + e⁻ˣ)',
      color: '#6366f1',
    },
    relu: {
      fn: (x) => Math.max(0, x),
      label: 'ReLU(x) = max(0, x)',
      color: '#8b5cf6',
    },
    tanh: {
      fn: (x) => Math.tanh(x),
      label: 'tanh(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)',
      color: '#06b6d4',
    },
    softmax: {
      fn: (x) => 1 / (1 + Math.exp(-x * 0.5)), // Simplified visualization
      label: 'softmax(xᵢ) = eˣⁱ/Σeˣʲ',
      color: '#10b981',
    },
  }
  
  const curve = curves[type] || curves.sigmoid
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const width = canvas.width = canvas.offsetWidth * 2
    const height = canvas.height = 200
    
    let animationProgress = 0
    let animationId
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)'
      ctx.lineWidth = 1
      
      // Vertical lines
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      
      // Horizontal lines
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      
      // Draw axis
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()
      
      // Draw the curve
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, curve.color + '00')
      gradient.addColorStop(0.2, curve.color)
      gradient.addColorStop(0.8, curve.color)
      gradient.addColorStop(1, curve.color + '00')
      
      ctx.strokeStyle = gradient
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      ctx.beginPath()
      
      const xScale = 12 // How much of x-axis to show
      const drawWidth = width * (isInView ? Math.min(animationProgress, 1) : 1)
      
      for (let px = 0; px < drawWidth; px++) {
        const x = (px / width - 0.5) * xScale
        let y = curve.fn(x)
        
        // Normalize y to canvas coordinates
        if (type === 'relu') {
          y = height - (y / 6 + 0.5) * height // Scale for ReLU
        } else {
          y = height - y * height // For sigmoid/tanh (output 0-1 or -1 to 1)
        }
        
        if (type === 'tanh') {
          y = height / 2 - (curve.fn(x) * height / 2)
        }
        
        if (px === 0) {
          ctx.moveTo(px, y)
        } else {
          ctx.lineTo(px, y)
        }
      }
      
      ctx.stroke()
      
      // Draw glow
      ctx.shadowColor = curve.color
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.shadowBlur = 0
      
      // Animate
      if (isInView && animationProgress < 1) {
        animationProgress += 0.02
        animationId = requestAnimationFrame(draw)
      }
    }
    
    if (isInView) {
      animationProgress = 0
    }
    
    draw()
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isInView, type, curve])
  
  return (
    <div ref={containerRef} className="curve-divider">
      <canvas ref={canvasRef} className="curve-canvas" />
      <motion.span 
        className="curve-label mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {curve.label}
      </motion.span>
    </div>
  )
}

export default CurveDivider
