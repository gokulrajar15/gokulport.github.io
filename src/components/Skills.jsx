import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Core specializations
  const specializations = [
    { name: 'ML Modeling', icon: '🧠' },
    { name: 'Agentic AI', icon: '🤖' },
    { name: 'RAG Applications', icon: '🔍' },
    { name: 'Database Management', icon: '🗄️' },
    { name: 'Backend Development', icon: '⚙️' },
    { name: 'Cloud Platforms', icon: '☁️' },
  ]

  const skillCategories = [
    {
      title: 'ML & AI Frameworks',
      icon: '🧠',
      skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LangChain', 'LangGraph', 'Transformers', 'OpenAI', 'Gemini'],
    },
    {
      title: 'MLOps & Infrastructure',
      icon: '⚙️',
      skills: ['Docker', 'Kubernetes', 'MLflow', 'Vertex AI', 'Triton Server', 'LitServe', 'GitHub Actions', 'Terraform'],
    },
    {
      title: 'Languages',
      icon: '💻',
      skills: ['Python', 'C', 'C++', 'Java', 'Rust', 'SQL', 'Bash'],
    },
    {
      title: 'Backend & Databases',
      icon: '🗄️',
      skills: ['FastAPI', 'Flask', 'Django', 'PostgreSQL', 'MongoDB', 'MySQL', 'Pinecone', 'Qdrant'],
    },
    {
      title: 'Cloud & DevOps',
      icon: '☁️',
      skills: ['Azure', 'AWS', 'GCP', 'Git', 'Linux', 'CI/CD', 'BigQuery'],
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
            Technologies I use to build production ML systems
          </p>
        </motion.div>
        
        {/* Core Specializations */}
        <motion.div
          className="specializations-section"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="specializations-title">I specialize in</h3>
          <div className="specializations-grid">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.name}
                className="specialization-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <span className="spec-icon">{spec.icon}</span>
                <span className="spec-name">{spec.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="skills-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + catIndex * 0.1, duration: 0.5 }}
            >
              <div className="skill-card-header">
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skill-pills">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Currently Learning */}
        <motion.div
          className="learning-section"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className="learning-label">Currently learning:</span>
          <div className="learning-badges">
            {['Building an LLM from scratch', 'Linux', 'Rust', 'System Design'].map((item) => (
              <span key={item} className="learning-badge mono">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
