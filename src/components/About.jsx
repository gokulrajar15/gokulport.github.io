import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './About.css'

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2000, isInView }) => {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime
    let animationFrame
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * numericValue))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, numericValue, duration])
  
  return (
    <span className="counter-value">
      {count}{suffix}
    </span>
  )
}

const About = () => {
  const ref = useRef(null)
  const metricsRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const metricsInView = useInView(metricsRef, { once: true, margin: "-50px" })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const metrics = [
    { value: 3, suffix: '+', label: 'Years Experience', icon: '⏱️' },
    { value: 5, suffix: '+', label: 'Clients Served', icon: '🤝' },
    { value: 200, suffix: 'K+', label: 'Medium Readers', icon: '📖' },
    { value: 2, suffix: '', label: 'Play Store Apps', icon: '📱' },
  ]

  const expertise = [
    {
      icon: '🤖',
      symbol: '∇',
      title: 'Multi-Agent & Deep Agents',
      description: 'Building Multi-agents, Deep agents, ReAct agents that reason, plan, and execute complex tasks autonomously.',
      tech: ['LangChain', 'LangGraph', 'CrewAI', 'ADK', 'OpenAI SDK'],
      highlight: 'Text-to-SQL achieving 95% accuracy',
    },
    {
      icon: '🔍',
      symbol: '∫',
      title: 'RAG Applications',
      description: 'Building production-grade RAG systems with advanced retrieval, guardrails, and evaluation pipelines.',
      tech: ['Pinecone', 'Qdrant', 'Neo4j', 'LangSmith', 'DeepEval'],
      highlight: '2M+ records, 400ms retrieval',
    },
    {
      icon: '🧠',
      symbol: 'σ',
      title: 'LLM & ML at Scale',
      description: 'Training and fine-tuning LLM models, building ML pipelines, and serving models at production scale.',
      tech: ['PyTorch', 'Vertex AI', 'Triton', 'MLflow', 'RLHF'],
      highlight: '1M+ API requests/min, <50ms latency',
    },
    {
      icon: '⚙️',
      symbol: 'λ',
      title: 'Backend & Cloud',
      description: 'Building robust backends for AI applications with cloud infrastructure and deployment pipelines.',
      tech: ['FastAPI', 'Docker', 'AWS', 'Azure', 'GCP'],
      highlight: 'End-to-end production systems',
    },
    {
      icon: '👥',
      symbol: 'θ',
      title: 'AI Team Leadership',
      description: 'Leading AI teams, guiding system design, development workflows, and cloud infrastructure management.',
      tech: ['Architecture', 'Mentoring', 'Agile', 'DevOps'],
      highlight: 'Led 4 major AI projects',
    },
  ]
  
  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="about-content"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="about-header">
            <span className="section-tag mono">
              <span className="tag-icon">∑</span> About Me
            </span>
            <h2 className="section-title">
              Building AI That <span className="gradient-text">Delivers Impact</span>
            </h2>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={itemVariants} className="about-intro">
            <p className="intro-text">
              I'm an <strong>AI/ML Engineer</strong> with <strong>3+ years</strong> of experience building and deploying 
              production-grade AI systems. I've worked with <strong>5+ clients</strong> across both service and product-based 
              environments, leading the delivery of multiple AI projects and successfully shipping products used in real-world applications.
            </p>
            <p className="intro-text">
              I specialize in designing <strong>end-to-end AI systems</strong>—from ML modeling to scalable backend and cloud deployment. 
              My work focuses on <strong>Agentic AI</strong>, <strong>RAG applications</strong>, and <strong>production ML pipelines</strong>, 
              where I handle everything from data processing and model development to serving, monitoring, and optimization.
            </p>
            <p className="intro-text">
              I've built and deployed solutions across domains including <strong>Finance</strong>, <strong>Banking</strong>, 
              <strong>Mutual Funds</strong>, <strong>Legal</strong>, <strong>E-Commerce</strong>, and <strong>Supply Chain</strong>. 
              My key work includes AI-powered chatbots using agentic architectures, fraud detection systems for banking, 
              supply chain risk prediction models, and RAG systems for legal data.
            </p>
            <p className="intro-text">
              Beyond client work, I actively build and experiment with real-world AI systems. I've shipped products available on 
              the <strong>Play Store</strong> and continuously work on personal projects to deepen my expertise. I also share my 
              learnings through technical writing on <a href="https://medium.com/@gokulrajar" target="_blank" rel="noopener noreferrer" className="text-link">Medium</a>, 
              where my content has reached <strong>200K+ readers</strong>.
            </p>
            <p className="intro-text">
              Currently, I'm focused on advancing my understanding of <strong>system design</strong> and <strong>scalable AI infrastructure</strong>, 
              while exploring deeper concepts in LLMs and backend systems. I'm open to <strong>AI Engineering and MLOps roles</strong> where 
              I can build systems that move beyond prototypes and create real impact.
            </p>
          </motion.div>

          {/* Metrics Bar */}
          <motion.div variants={itemVariants} className="metrics-bar" ref={metricsRef}>
            {metrics.map((metric, i) => (
              <motion.div 
                key={i} 
                className="metric-item"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="metric-icon">{metric.icon}</span>
                <span className="metric-value">
                  <AnimatedCounter 
                    value={String(metric.value)} 
                    suffix={metric.suffix} 
                    duration={1500 + (i * 200)} 
                    isInView={metricsInView} 
                  />
                </span>
                <span className="metric-label">{metric.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Core Expertise */}
          <motion.div variants={itemVariants} className="expertise-section">
            <h3 className="subsection-title">
              <span className="mono">∂</span> Core Expertise
            </h3>
            <div className="expertise-grid">
              {expertise.map((item, i) => (
                <motion.div 
                  key={i}
                  className="expertise-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="expertise-header">
                    <span className="expertise-emoji">{item.icon}</span>
                    <span className="expertise-symbol mono">{item.symbol}</span>
                  </div>
                  <h4 className="expertise-title">{item.title}</h4>
                  <p className="expertise-desc">{item.description}</p>
                  
                  <div className="expertise-details">
                    <div className="expertise-tech">
                      {item.tech.map((t, j) => (
                        <span key={j} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
