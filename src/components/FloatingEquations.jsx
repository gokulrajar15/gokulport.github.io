import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './FloatingEquations.css'

const equations = [
  // Loss Functions
  'L = -Σ yᵢ log(ŷᵢ)',
  'MSE = ¹⁄ₙ Σ(y - ŷ)²',
  'BCE = -[y·log(p) + (1-y)·log(1-p)]',
  
  // Activation Functions
  'σ(x) = 1/(1 + e⁻ˣ)',
  'ReLU(x) = max(0, x)',
  'tanh(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)',
  'softmax(xᵢ) = eˣⁱ/Σeˣʲ',
  'GELU(x) = x·Φ(x)',
  
  // Backpropagation
  '∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂w',
  'w = w - α·∇L',
  'θₜ₊₁ = θₜ - η·∇θJ(θ)',
  
  // Attention
  'Attention = softmax(QKᵀ/√dₖ)V',
  'MultiHead = Concat(head₁,...,headₕ)Wᴼ',
  
  // Neural Network Equations
  'z = Wx + b',
  'a = σ(z)',
  'ŷ = f(Σ wᵢxᵢ + b)',
  
  // Optimization
  'Adam: m = β₁m + (1-β₁)g',
  'v = β₂v + (1-β₂)g²',
  
  // Probabilistic
  'P(A|B) = P(B|A)P(A)/P(B)',
  'H(X) = -Σ p(x)log p(x)',
  'KL(P||Q) = Σ P(x)log(P(x)/Q(x))',
  
  // Matrix Operations
  'C = AB, cᵢⱼ = Σₖ aᵢₖbₖⱼ',
  'det(A) = Σ(-1)ʲ aᵢⱼMᵢⱼ',
  
  // Symbols
  '∇', '∂', 'Σ', '∫', 'θ', 'λ', 'α', 'β', 'γ', 'δ', 'ε', 'η', 'μ', 'σ', 'φ', 'ψ', 'ω', '∞'
]

const FloatingEquation = ({ equation, index }) => {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  })
  
  const duration = 20 + Math.random() * 30
  const delay = Math.random() * 5
  const size = equation.length > 5 ? '0.75rem' : '1.2rem'
  const opacity = 0.08 + Math.random() * 0.12
  
  return (
    <motion.div
      className="floating-equation mono"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: size,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [opacity, opacity * 1.5, opacity],
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        rotate: [0, Math.random() * 10 - 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {equation}
    </motion.div>
  )
}

const FloatingEquations = () => {
  return (
    <div className="floating-equations-container">
      {equations.map((eq, i) => (
        <FloatingEquation key={i} equation={eq} index={i} />
      ))}
    </div>
  )
}

export default FloatingEquations
