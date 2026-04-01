import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import './StreamingText.css'

const StreamingText = ({ 
  text, 
  className = '', 
  showStats = true,
  onComplete,
  triggerOnView = true,
  startDelay = 0,
  delay = 0, // alias for startDelay
  autoStart = false, // start immediately without view trigger
}) => {
  const actualDelay = startDelay || delay
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [tokenSpeed, setTokenSpeed] = useState(145)
  const [tokensGenerated, setTokensGenerated] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasStartedRef = useRef(false)
  const animationRef = useRef(null)
  const delayTimerRef = useRef(null)
  
  const startStreaming = useCallback(() => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    
    let currentIndex = 0
    const startTime = Date.now()
    
    delayTimerRef.current = setTimeout(() => {
      setIsStreaming(true)
      
      const stream = () => {
        if (currentIndex >= text.length) {
          setIsStreaming(false)
          setIsComplete(true)
          setDisplayedText(text)
          onComplete?.()
          return
        }
        
        // Very fast streaming: 5-12 chars at a time
        const charsToAdd = 5 + Math.floor(Math.random() * 7)
        currentIndex = Math.min(currentIndex + charsToAdd, text.length)
        
        setDisplayedText(text.slice(0, currentIndex))
        
        // Update token stats
        const tokens = Math.ceil(currentIndex / 4)
        setTokensGenerated(tokens)
        
        const elapsed = (Date.now() - startTime) / 1000
        if (elapsed > 0.03) {
          const speed = Math.floor(tokens / elapsed)
          setTokenSpeed(Math.min(180, Math.max(120, speed + Math.floor(Math.random() * 30) - 15)))
        }
        
        // Very fast delay: 5-12ms between chunks
        const frameDelay = 5 + Math.random() * 7
        animationRef.current = setTimeout(stream, frameDelay)
      }
      
      stream()
    }, actualDelay)
  }, [text, actualDelay, onComplete])
  
  useEffect(() => {
    const shouldStart = autoStart || (triggerOnView && isInView)
    if (shouldStart && !hasStartedRef.current) {
      startStreaming()
    }
    
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
      if (animationRef.current) clearTimeout(animationRef.current)
    }
  }, [isInView, triggerOnView, autoStart, startStreaming])
  
  return (
    <div ref={ref} className={`streaming-text-container ${isStreaming ? 'streaming' : ''} ${className}`}>
      <motion.div 
        className="streaming-text"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayedText}
        {isStreaming && (
          <motion.span 
            className="streaming-cursor"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ▊
          </motion.span>
        )}
      </motion.div>
      
      {showStats && (isStreaming || (isComplete && tokensGenerated > 0)) && (
        <motion.div 
          className={`streaming-stats mono ${isComplete ? 'complete' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <motion.span 
              className="stat-value"
              key={tokenSpeed}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {isComplete ? '—' : tokenSpeed}
            </motion.span>
            <span className="stat-unit">tokens/sec</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">∑</span>
            <motion.span 
              className="stat-value"
              key={tokensGenerated}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {tokensGenerated}
            </motion.span>
            <span className="stat-unit">tokens</span>
          </div>
          {isStreaming ? (
            <div className="streaming-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          ) : (
            <motion.div 
              className="complete-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default StreamingText
