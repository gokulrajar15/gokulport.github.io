import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState(0)
  
  const projects = [
    {
      id: 1,
      title: 'Risk Analytics & Fraud Detection',
      subtitle: 'End-to-End MLOps Pipeline on Google Cloud',
      description: 'Production-grade credit card fraud detection system with complete ML lifecycle automation. Features CI/CD/CT pipelines with Vertex AI for experiment tracking, model versioning, and automated deployments. Implements data drift detection, concept drift monitoring, and Blue-Green/Canary deployment strategies.',
      highlights: [
        { metric: '98.5%', label: 'Precision', icon: '◎' },
        { metric: '97.2%', label: 'Recall', icon: '◉' },
        { metric: '<50ms', label: 'Latency', icon: '⚡' },
        { metric: '0.995', label: 'AUC-ROC', icon: '📈' },
      ],
      techStack: ['Vertex AI', 'XGBoost', 'FastAPI', 'Cloud Build', 'BigQuery', 'Pub/Sub', 'Docker', 'Terraform'],
      features: [
        '1M+ API requests/min with auto-scaling',
        'Automated weekly retraining with drift detection',
        'Vertex AI Model Registry & Experiment Tracking',
        'Blue-Green & Canary deployment strategies',
        'Class-weighting & hyperparameter tuning for imbalanced data',
      ],
      equation: 'ŷ = σ(Σ wᵢxᵢ + b) → fraud/legit',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      github: 'https://github.com/gokulrajar15/Risk-Analytics-Fraud-Detection',
      status: 'Production',
    },
    {
      id: 2,
      title: 'Arxiv Agentic RAG',
      subtitle: 'Large-Scale Scientific Knowledge System',
      description: 'Production-grade Agentic RAG system indexing 10M+ ArXiv papers with multi-step reasoning agents. Features 4-layer input guardrails for safety, dual inference engines (Triton + LitServe), and custom embedding model (embeddinggemma-300m, 768D vectors). Built with continuous monitoring via LangSmith and evaluation with DeepEval.',
      highlights: [
        { metric: '10M+', label: 'Papers Indexed', icon: '📄' },
        { metric: '4-Layer', label: 'Guardrails', icon: '🛡' },
        { metric: '<1s', label: 'Retrieval', icon: '⚡' },
        { metric: '>90%', label: 'Safety Score', icon: '✓' },
      ],
      techStack: ['LangChain', 'LangGraph', 'Triton Server', 'LitServe', 'PostgreSQL', 'FastAPI', 'DeepEval', 'LangSmith'],
      features: [
        'AI Agent with multi-query retrieval strategies',
        'Toxicity filtering (toxic-comment-model)',
        'Bias detection (distilroberta-bias)',
        'Prompt injection & jailbreak prevention',
        'Topic classification (bart-large-mnli)',
      ],
      equation: 'Attn(Q,K,V) = softmax(QKᵀ/√dₖ)V',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
      github: 'https://github.com/gokulrajar15/Arxiv-Rag',
      status: 'Production',
    },
  ]
  
  const currentProject = projects[activeProject]
  
  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <span className="section-tag mono">
            <span className="tag-icon">∫</span> Personal Projects
          </span>
          <h2 className="section-title">Production AI Systems</h2>
          {/* <p className="section-subtitle">
            End-to-end ML solutions deployed at scale
          </p> */}
        </motion.div>
        
        {/* Project Tabs */}
        <motion.div 
          className="project-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`project-tab ${activeProject === index ? 'active' : ''}`}
              onClick={() => setActiveProject(index)}
              style={{ '--tab-color': project.color }}
            >
              <span className="tab-number mono">0{index + 1}</span>
              <span className="tab-title">{project.title.split(' ').slice(0, 2).join(' ')}</span>
              <span className="tab-status mono">{project.status}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Active Project Display */}
        <motion.div 
          className="project-showcase"
          key={activeProject}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ '--project-color': currentProject.color }}
        >
          {/* Left: Info */}
          <div className="project-info">
            <div className="project-badge">
              <span className="badge-icon">◆</span>
              <span className="badge-text mono">{currentProject.status}</span>
            </div>
            
            <h3 className="project-title">{currentProject.title}</h3>
            <p className="project-subtitle">{currentProject.subtitle}</p>
            
            <p className="project-description">{currentProject.description}</p>
            
            {/* Metrics Grid */}
            <div className="metrics-grid">
              {currentProject.highlights.map((item, i) => (
                <motion.div 
                  key={i}
                  className="metric-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="metric-icon">{item.icon}</span>
                  <span className="metric-value mono">{item.metric}</span>
                  <span className="metric-label">{item.label}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Tech Stack */}
            <div className="tech-section">
              <span className="tech-label mono">Tech Stack</span>
              <div className="tech-pills">
                {currentProject.techStack.map((tech, i) => (
                  <motion.span 
                    key={tech}
                    className="tech-pill mono"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Links */}
            <div className="project-actions">
              <motion.a 
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Source Code</span>
                <span className="btn-arrow">→</span>
              </motion.a>
              <motion.a 
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>GitHub</span>
              </motion.a>
            </div>
          </div>
          
          {/* Right: Visual */}
          <div className="project-visual">
            {/* Equation Card */}
            <motion.div 
              className="equation-card"
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="equation-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="equation-title mono">core_algorithm.py</span>
              </div>
              <div className="equation-body">
                <span className="equation-text mono">{currentProject.equation}</span>
              </div>
            </motion.div>
            
            {/* Features List */}
            <motion.div 
              className="features-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="features-header mono">
                <span className="features-icon">⚡</span>
                Key Features
              </div>
              <ul className="features-list">
                {currentProject.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <span className="feature-check">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="visual-decoration">
              <div className="deco-circle"></div>
              <div className="deco-line"></div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          className="projects-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a href="https://github.com/gokulrajar15" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <span>View All Projects on GitHub</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
