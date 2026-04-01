import { useEffect, useRef } from 'react'
import './MatrixRain.css'

const MatrixRain = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Math and AI symbols
    const symbols = '∂∇∑∫θλαβγδεηπσφψω∞≈≠≤≥±×÷√∈∀∃⊂⊃∪∩01'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)
    
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)'
      ctx.font = `${fontSize}px JetBrains Mono, monospace`
      
      for (let i = 0; i < drops.length; i++) {
        const text = symbols[Math.floor(Math.random() * symbols.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        // Gradient effect
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y)
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)')
        ctx.fillStyle = gradient
        
        ctx.fillText(text, x, y)
        
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    
    const interval = setInterval(draw, 50)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain
