import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const navItems = [
    { id: 'home', label: 'Home', icon: '◇' },
    { id: 'about', label: 'About', icon: '∑' },
    { id: 'experience', label: 'Experience', icon: '∂' },
    { id: 'skills', label: 'Skills', icon: '∇' },
    { id: 'projects', label: 'Projects', icon: '∫' },
    { id: 'contact', label: 'Contact', icon: '→' },
  ]

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar-container">
          <motion.a 
            href="#home" 
            className="navbar-logo mono"
            whileHover={{ scale: 1.05 }}
          >
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">Gokul</span>
            <span className="logo-dot">.</span>
            <span className="logo-text">AI</span>
            <span className="logo-bracket">/&gt;</span>
          </motion.a>
          
          <ul className="navbar-links">
            {navItems.map((item) => (
              <motion.li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                >
                  <span className="nav-icon mono">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
          
          <motion.a 
            href="#contact" 
            className="navbar-cta desktop-only"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a 
                      href={`#${item.id}`}
                      className={activeSection === item.id ? 'active' : ''}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <span className="nav-icon mono">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a 
                href="#contact" 
                className="navbar-cta mobile-cta"
                onClick={() => handleNavClick('contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
