import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/gokulrajar15' 
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://linkedin.com/in/gokul-raja-1541b8226' 
    },
    { 
      name: 'Medium', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      ),
      url: 'https://medium.com/@gokulrajar' 
    },
    { 
      name: 'Email', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      url: 'mailto:gokulrajar15@gmail.com' 
    },
  ]

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Writing', href: '#writing' },
  ]
  
  return (
    <footer id="contact" className="footer" ref={ref}>
      <div className="container">
        {/* Contact Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-title">Let's build something together</h2>
          <p className="contact-subtitle">
            I'm currently open to AI Engineering and MLOps roles. Let's connect!
          </p>
          
          {/* Mailto Button */}
          <motion.a
            href="mailto:gokulrajar15@gmail.com?subject=Let's%20connect"
            className="mailto-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Get in touch</span>
            <span className="mailto-arrow">→</span>
          </motion.a>
          
          {/* Social Links */}
          <div className="contact-social">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.name !== 'Email' ? "_blank" : undefined}
                rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
                className="contact-social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                {link.icon}
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </div>
          
          {/* Open to work note */}
          <div className="open-to-work-note">
            <span className="pulse-dot-small"></span>
            <span>Currently open to AI Engineering and MLOps roles</span>
          </div>
        </motion.div>

        <div className="footer-content">
          {/* Left - Brand */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <a href="#home" className="footer-logo mono">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">Gokul</span>
              <span className="logo-dot">.</span>
              <span className="logo-ai">AI</span>
              <span className="logo-bracket">/&gt;</span>
            </a>
            <p className="footer-tagline">
              Building production-grade AI systems that deliver measurable impact.
            </p>
            <div className="footer-equation mono">
              while(alive) {'{'} learn(); build(); impact(); {'}'}
            </div>
          </motion.div>

          {/* Center - Quick Links */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="footer-nav-link">
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Right - Connect */}
          <motion.div
            className="footer-connect"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.name !== 'Email' ? "_blank" : undefined}
                  rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
                  className="footer-social-link"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <a href="mailto:gokulrajar15@gmail.com" className="footer-email">
              gokulrajar15@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Gokul Raja R. Crafted with passion.
            </p>
            <p className="footer-location mono">
              <span className="location-dot"></span>
              Chennai, India
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Contact
