import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const skillCategories = [
    {
      title: 'AI & LLM',
      icon: '∇',
      skills: [
        { name: 'LangChain/LangGraph', level: 95 },
        { name: 'OpenAI/Gemini/Claude', level: 95 },
        { name: 'RAG Systems', level: 93 },
        { name: 'Multi-Agent Systems', level: 92 },
      ],
    },
    {
      title: 'ML Frameworks',
      icon: '∑',
      skills: [
        { name: 'PyTorch', level: 90 },
        { name: 'TensorFlow', level: 88 },
        { name: 'Scikit-Learn', level: 92 },
        { name: 'Transformers', level: 90 },
      ],
    },
    {
      title: 'MLOps & Cloud',
      icon: '∫',
      skills: [
        { name: 'Docker/Kubernetes', level: 88 },
        { name: 'Azure/AWS/GCP', level: 87 },
        { name: 'MLflow/Vertex AI', level: 85 },
        { name: 'Triton/LitServe', level: 85 },
      ],
    },
    {
      title: 'Languages & APIs',
      icon: 'λ',
      skills: [
        { name: 'Python', level: 98 },
        { name: 'FastAPI/Flask', level: 90 },
        { name: 'SQL', level: 88 },
        { name: 'C/C++', level: 75 },
      ],
    },
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 },
    },
  }
  
  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="skills-header"
        >
          <span className="section-tag mono">
            <span className="tag-icon">∇</span> Technical Skills
          </span>
          <h2 className="section-title">My Tech Stack</h2>
          <p className="section-subtitle">
            The mathematical tools and technologies I use to build AI systems
          </p>
        </motion.div>
        
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skill-card"
              variants={cardVariants}
            >
              <div className="skill-card-header">
                <span className="skill-icon mono">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level mono">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1,
                          delay: catIndex * 0.1 + skillIndex * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional tech badges */}
        <motion.div
          className="tech-badges"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className="badge-label">Also experienced with:</span>
          <div className="badges">
            {['CrewAI', 'ADK', 'DeepEval', 'GuardrailsAI', 'Neo4j', 'Pinecone', 'Qdrant', 'PostgreSQL', 'MongoDB', 'LangSmith', 'W&B', 'Power BI'].map((tech) => (
              <span key={tech} className="badge mono">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
