import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Writing.css'

const Writing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const articles = [
    {
      title: 'Building Production-Grade RAG Systems',
      platform: 'Medium',
      readTime: '8 min read',
      url: 'https://medium.com/@gokulrajar',
      description: 'Lessons learned from building a RAG app that indexes 10M+ papers',
    },
    {
      title: 'MLOps Best Practices for ML Engineers',
      platform: 'Medium',
      readTime: '6 min read',
      url: 'https://medium.com/@gokulrajar',
      description: 'CI/CD, experiment tracking, and deployment strategies',
    },
    {
      title: 'Understanding Transformers from Scratch',
      platform: 'Medium',
      readTime: '10 min read',
      url: 'https://medium.com/@gokulrajar',
      description: 'A deep dive into attention mechanisms and LLM architecture',
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 },
    },
  }
  
  return (
    <section id="writing" className="section writing" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="writing-header"
        >
          <span className="section-tag mono">
            <span className="tag-icon">✍️</span> Writing
          </span>
          <h2 className="section-title">Thoughts & Learnings</h2>
          <p className="section-subtitle">
            I write about ML engineering, system design, and lessons from building production systems
          </p>
        </motion.div>
        
        <motion.div
          className="articles-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="article-meta">
                <span className="article-platform">{article.platform}</span>
                <span className="article-read-time">{article.readTime}</span>
              </div>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>
              <span className="article-link">
                Read article <span className="arrow">→</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div
          className="writing-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a 
            href="https://medium.com/@gokulrajar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <span>View all articles on Medium</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Writing