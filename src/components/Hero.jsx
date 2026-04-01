import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import './Hero.css'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [greeting, setGreeting] = useState({ text: '', icon: '', period: '' })
  const [greetingVisible, setGreetingVisible] = useState(false)
  
  // Get greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let greetingData = { text: '', icon: '', period: '' }
      
      if (hour >= 5 && hour < 12) {
        greetingData = { text: 'Hi, Good Morning', icon: '☀️', period: 'morning' }
      } else if (hour >= 12 && hour < 17) {
        greetingData = { text: 'Hi, Good Afternoon', icon: '🌤️', period: 'afternoon' }
      } else if (hour >= 17 && hour < 21) {
        greetingData = { text: 'Hi, Good Evening', icon: '🌅', period: 'evening' }
      } else {
        greetingData = { text: 'Hi, Good Night', icon: '🌙', period: 'night' }
      }
      
      setGreeting(greetingData)
      // Trigger animation after a short delay
      setTimeout(() => setGreetingVisible(true), 300)
    }
    
    updateGreeting()
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

  const roles = [
    'AI Engineer',
    'ML Engineer', 
    'Data Scientist',
    'Python Developer'
  ]

  // Floating formulas and symbols
  const floatingElements = useMemo(() => {
    const formulas = [
      '∇L = ∂L/∂w', 'σ(x) = 1/(1+e⁻ˣ)', 'P(A|B)', 'E = mc²', 
      'f(x) = Wx + b', 'softmax(z)', '∑ᵢ xᵢ', '∂/∂θ', 
      'argmax', 'ReLU(x)', 'tanh(x)', 'log P(y|x)',
      'KL(P||Q)', 'H(X)', '∫f(x)dx', 'lim x→∞',
      'J(θ)', 'α · β', 'λ', 'θ*', 'μ', 'σ²',
      '||w||₂', '∇²f', 'det(A)', 'tr(X)',
    ]
    const symbols = ['α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'π', 'σ', 'φ', 'ω', 'Σ', 'Π', '∂', '∇', '∞', '≈', '≠', '≤', '≥', '∈', '∉', '⊂', '∪', '∩']
    const numbers = ['0', '1', '0.97', '0.001', '1e-4', '256', '512', '1024', '2048', '0.95', '3.14', '2.71', '1.41', '0.5', '128', '64', '32']
    
    const elements = []
    
    // Add formulas (larger, more visible)
    for (let i = 0; i < 20; i++) {
      elements.push({
        id: `formula-${i}`,
        content: formulas[i % formulas.length],
        type: 'formula',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.9 + Math.random() * 0.6,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * -20,
        opacity: 0.15 + Math.random() * 0.25,
      })
    }
    
    // Add symbols (medium)
    for (let i = 0; i < 30; i++) {
      elements.push({
        id: `symbol-${i}`,
        content: symbols[i % symbols.length],
        type: 'symbol',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.2 + Math.random() * 1,
        duration: 20 + Math.random() * 30,
        delay: Math.random() * -25,
        opacity: 0.1 + Math.random() * 0.2,
      })
    }
    
    // Add numbers (small, subtle)
    for (let i = 0; i < 25; i++) {
      elements.push({
        id: `number-${i}`,
        content: numbers[i % numbers.length],
        type: 'number',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.8 + Math.random() * 0.5,
        duration: 25 + Math.random() * 35,
        delay: Math.random() * -30,
        opacity: 0.08 + Math.random() * 0.15,
      })
    }
    
    return elements
  }, [])

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = roles[roleIndex]
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(pauseTimeout)
    }
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText === currentRole) {
        setIsPaused(true)
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      }
    }
  }, [displayText, roleIndex, isDeleting, isPaused, roles])

  // Scroll indicator click handler
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      {/* Animated grid background */}
      <div className="hero-grid" />
      
      {/* Gradient orbs */}
      <div className="hero-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      
      {/* Floating math elements */}
      <div className="floating-math">
        {floatingElements.map((el) => (
          <motion.span
            key={el.id}
            className={`float-element float-${el.type}`}
            initial={{ 
              x: `${el.x}vw`, 
              y: `${el.y}vh`,
              opacity: 0 
            }}
            animate={{ 
              x: [`${el.x}vw`, `${(el.x + 20) % 100}vw`, `${(el.x - 10 + 100) % 100}vw`, `${el.x}vw`],
              y: [`${el.y}vh`, `${(el.y - 30 + 100) % 100}vh`, `${(el.y + 15) % 100}vh`, `${el.y}vh`],
              opacity: [0, el.opacity, el.opacity, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ fontSize: `${el.size}rem` }}
          >
            {el.content}
          </motion.span>
        ))}
      </div>

      {/* Binary stream columns */}
      <div className="binary-streams">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="binary-column"
            style={{ 
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + i * 2}s`
            }}
          >
            {[...Array(20)].map((_, j) => (
              <span key={j} style={{ animationDelay: `${j * 0.1}s` }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Main content - minimal */}
      <div className="hero-center">
        {/* Time-based greeting */}
        <motion.div 
          className={`hero-greeting ${greeting.period}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: greetingVisible ? 1 : 0, 
            y: greetingVisible ? 0 : -20 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="greeting-icon"
            animate={{ 
              rotate: [0, 10, -10, 5, 0],
              scale: [1, 1.1, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3 
            }}
          >
            {greeting.icon}
          </motion.span>
          <span className="greeting-text">
            {greeting.text.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                className="greeting-char"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.div>

        <motion.h1 
          className="hero-name"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="name-text">Gokul</span>
        </motion.h1>
        
        <motion.div 
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="role-text">{displayText}</span>
          <span className="cursor">|</span>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollToAbout}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-text">Scroll</span>
      </motion.div>
    </section>
  )
}

export default Hero
