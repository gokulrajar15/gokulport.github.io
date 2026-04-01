import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import './Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)
  
  const experiences = [
    {
      id: 1,
      role: 'AI/ML Engineer',
      company: 'Apexon',
      period: 'Dec 2025 - Present',
      duration: '5+ months',
      location: 'Chennai',
      type: 'current',
      summary: 'Building AI-driven enterprise platforms for supply chain risk intelligence and developing a comprehensive Finance Deep Agent system for multi-domain financial decision-making.',
      achievements: [
        {
          title: 'Supply Chain Risk Analytics Platform',
          description: 'Built an AI-driven platform with agent-based architecture on AWS Bedrock, featuring a modular MCP server that ingests and orchestrates data from BBC, CNN, GDELT, and global news sources. Enables real-time risk intelligence for supplier, logistics, and demand risk identification with early detection and automated alerts.',
          tags: ['AI Agents', 'AWS Bedrock', 'MCP Server', 'EC2', 'Risk Analytics'],
          metric: '~80% risk reduction',
        },
        {
          title: 'Finance Deep Agent System',
          description: 'Developing a comprehensive Deep Agentic system for financial decision-making across multiple domains including Insurance, Banking, Mutual Funds, Debt Management, Asset Tracking, and Expense Management. The agent autonomously analyzes, reasons, and provides personalized recommendations for effective financial decisions.',
          tags: ['Deep Agent', 'Finance', 'LLM', 'Multi-Domain'],
          metric: 'In Progress',
          inProgress: true,
        },
      ],
      tech: ['AWS Bedrock', 'MCP Server', 'EC2', 'AI Agents', 'Deep Agents', 'Python', 'FastAPI', 'LangChain'],
    },
    {
      id: 2,
      role: 'Associate AI Technical Lead',
      company: 'Mani India Technologies',
      period: 'May 2023 - Nov 2025',
      duration: '2.5 years',
      location: 'Chennai',
      type: 'past',
      summary: 'Led AI initiatives across multiple projects, building production-grade systems that handle millions of records with high accuracy and low latency.',
      achievements: [
        {
          title: 'Text-to-SQL Multi-Agent System',
          description: 'Engineered a robust multi-agent system using LangChain and LangGraph, enhancing data accessibility for non-technical users.',
          tags: ['LangChain', 'LangGraph', 'Multi-Agent'],
          metric: '95% accuracy, 80% time saved',
        },
        {
          title: 'Large-Scale Agentic RAG',
          description: 'Developed an agentic RAG application handling 2M+ records with contextual and answer relevance above 80%.',
          tags: ['RAG', 'Vector DB', 'Embeddings'],
          metric: '400ms retrieval',
        },
        {
          title: 'Multi-Agent AI Marketplace',
          description: 'Built a marketplace system enabling users to search, book, track, reschedule, and invite others—automating the entire interaction flow.',
          tags: ['Multi-Agent', 'Automation', 'UX'],
          metric: 'Full Automation',
        },
        {
          title: 'Deep Agent for Power Apps',
          description: 'Developed an autonomous Deep Agent executing complete SDLC tasks including mockup generation, BRD creation, and prototype development.',
          tags: ['Deep Agent', 'Power Apps', 'SDLC'],
          metric: '80% workload reduction',
        },
        {
          title: 'Scalable AI Backend System',
          description: 'Implemented end-to-end backend integrating model monitoring, evaluation, and feedback loops to optimize production performance.',
          tags: ['Backend', 'MLOps', 'Monitoring'],
          metric: 'Production-Ready',
        },
        {
          title: 'Cross-Functional Team Leadership',
          description: 'Led AI teams across four projects, overseeing development planning, milestone setting, and release management.',
          tags: ['Leadership', 'Agile', 'Delivery'],
          metric: '4 projects delivered',
        },
      ],
      tech: ['LangChain', 'LangGraph', 'RAG', 'Multi-Agent', 'FastAPI', 'PostgreSQL', 'Python', 'Docker'],
    },
  ]
  
  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="experience-header"
        >
          <span className="section-tag mono">
            <span className="tag-icon">∂</span> Experience
          </span>
          <h2 className="section-title">Professional Journey</h2>
          <p className="section-subtitle">
            3+ years building production-grade AI systems across 2 organizations
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div
          className="exp-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {experiences.map((exp, index) => (
            <button
              key={exp.id}
              className={`exp-tab ${activeTab === index ? 'active' : ''} ${exp.type}`}
              onClick={() => setActiveTab(index)}
            >
              <div className="tab-left">
                <span className="tab-company">{exp.company}</span>
                <span className="tab-role">{exp.role}</span>
                <span className="tab-period mono">{exp.period}</span>
              </div>
              {exp.type === 'current' && (
                <span className="tab-badge">
                  <span className="badge-dot" />
                  Current
                </span>
              )}
            </button>
          ))}
        </motion.div>
        
        {/* Experience Content */}
        <div className="exp-content-container">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`exp-content ${exp.type} ${activeTab === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Company Header */}
              <div className="exp-company-header">
                <div className="company-info">
                  <div className="company-logo">
                    {exp.company.charAt(0)}
                  </div>
                  <div className="company-details">
                    <h3 className="company-role">{exp.role}</h3>
                    <span className="company-name">{exp.company} • {exp.location}</span>
                    <span className="company-duration">{exp.duration}</span>
                  </div>
                </div>
              </div>
              
              {/* Summary */}
              <p className="exp-summary">{exp.summary}</p>
              
              {/* Achievements */}
              <div className="exp-achievements">
                <h4 className="achievements-title">
                  <span className="title-icon">▸</span>
                  Key Achievements
                </h4>
                <div className="achievements-grid">
                  {exp.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      className={`achievement-card ${achievement.inProgress ? 'in-progress' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={activeTab === index ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                    >
                      <div className="achievement-header">
                        <h5 className="achievement-title">{achievement.title}</h5>
                        <span className={`achievement-metric mono ${achievement.inProgress ? 'progress' : ''}`}>
                          {achievement.inProgress && <span className="progress-dot" />}
                          {achievement.metric}
                        </span>
                      </div>
                      <p className="achievement-desc">{achievement.description}</p>
                      <div className="achievement-tags">
                        {achievement.tags.map((tag, j) => (
                          <span key={j} className="achievement-tag">{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Tech Stack */}
              <div className="exp-tech">
                <span className="tech-label mono">Tech Stack</span>
                <div className="tech-pills">
                  {exp.tech.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="tech-pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={activeTab === index ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.03 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
