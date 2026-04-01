import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import './TypewriterCode.css'

// Tokenizer for Python syntax
const tokenize = (code) => {
  const keywords = ['class', 'def', 'return', 'self', 'import', 'from', 'as', 'if', 'else', 'for', 'in', 'while', 'try', 'except', 'with', 'True', 'False', 'None']
  const tokens = []
  let i = 0
  
  while (i < code.length) {
    // Skip whitespace but preserve it
    if (/\s/.test(code[i])) {
      let ws = ''
      while (i < code.length && /\s/.test(code[i])) {
        ws += code[i]
        i++
      }
      tokens.push({ type: 'whitespace', value: ws })
      continue
    }
    
    // Comments
    if (code[i] === '#') {
      let comment = ''
      while (i < code.length && code[i] !== '\n') {
        comment += code[i]
        i++
      }
      tokens.push({ type: 'comment', value: comment })
      continue
    }
    
    // Strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i]
      let str = quote
      i++
      while (i < code.length && code[i] !== quote) {
        str += code[i]
        i++
      }
      if (i < code.length) str += code[i++]
      tokens.push({ type: 'string', value: str })
      continue
    }
    
    // Numbers
    if (/\d/.test(code[i])) {
      let num = ''
      while (i < code.length && /[\d.]/.test(code[i])) {
        num += code[i]
        i++
      }
      tokens.push({ type: 'number', value: num })
      continue
    }
    
    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(code[i])) {
      let id = ''
      while (i < code.length && /[a-zA-Z_0-9]/.test(code[i])) {
        id += code[i]
        i++
      }
      const type = keywords.includes(id) ? 'keyword' : 'identifier'
      tokens.push({ type, value: id })
      continue
    }
    
    // Operators and punctuation
    tokens.push({ type: 'punctuation', value: code[i] })
    i++
  }
  
  return tokens
}

const TypewriterCode = ({ code, language = 'python', onComplete = () => {} }) => {
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const timerRef = useRef(null)
  
  const lines = code.split('\n')
  const tokens = useMemo(() => tokenize(code), [code])
  
  // Calculate which tokens to show based on charIndex
  const getDisplayedTokens = () => {
    let totalChars = 0
    const displayed = []
    
    for (const token of tokens) {
      if (totalChars >= charIndex) break
      
      const remainingChars = charIndex - totalChars
      if (remainingChars >= token.value.length) {
        displayed.push({ ...token, partial: false })
        totalChars += token.value.length
      } else {
        displayed.push({ 
          ...token, 
          value: token.value.slice(0, remainingChars), 
          partial: true 
        })
        totalChars += remainingChars
        break
      }
    }
    
    return displayed
  }
  
  useEffect(() => {
    if (!isInView || isComplete) return
    
    const startDelay = setTimeout(() => {
      setIsTyping(true)
      
      const typeNext = () => {
        setCharIndex(prev => {
          if (prev >= code.length) {
            setIsTyping(false)
            setIsComplete(true)
            onComplete()
            return prev
          }
          
          // Much faster typing - 2-4 chars at a time
          const charsToAdd = 2 + Math.floor(Math.random() * 3)
          const nextIndex = Math.min(prev + charsToAdd, code.length)
          
          // Fast delays
          const char = code[prev]
          let delay = 10 + Math.random() * 15
          if (char === '\n') delay = 50 + Math.random() * 50
          
          timerRef.current = setTimeout(typeNext, delay)
          return nextIndex
        })
      }
      
      typeNext()
    }, 300)
    
    return () => {
      clearTimeout(startDelay)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isInView, code, onComplete, isComplete])
  
  const displayedTokens = getDisplayedTokens()
  
  const getTokenClass = (type, partial) => {
    if (partial) return 'partial'
    switch(type) {
      case 'keyword': return 'keyword'
      case 'string': return 'string'
      case 'comment': return 'comment'
      case 'number': return 'number'
      case 'identifier': return 'identifier'
      default: return ''
    }
  }
  
  return (
    <div ref={ref} className="typewriter-code">
      <div className="code-window">
        <div className="code-header">
          <div className="code-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="code-filename mono">ai_engineer.py</span>
          <div className="code-actions">
            {isTyping && (
              <motion.span 
                className="typing-indicator mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="typing-dot"></span>
                typing...
              </motion.span>
            )}
            {isComplete && (
              <motion.span 
                className="complete-indicator mono"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✓ ready
              </motion.span>
            )}
          </div>
        </div>
        <pre className="code-content">
          <code>
            {displayedTokens.map((token, i) => (
              <span key={i} className={getTokenClass(token.type, token.partial)}>
                {token.value}
              </span>
            ))}
          </code>
          {isTyping && <span className="code-cursor">|</span>}
        </pre>
        <div className="code-footer mono">
          <span>Python</span>
          <span>{lines.length} lines</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  )
}

export default TypewriterCode
