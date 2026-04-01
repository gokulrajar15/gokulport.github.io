import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CurveDivider from './components/CurveDivider'
import MatrixRain from './components/MatrixRain'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Simplified background - just MatrixRain */}
      <MatrixRain />
      <Navbar />
      <main>
        <Hero />
        <CurveDivider type="sigmoid" />
        <About />
        <CurveDivider type="relu" />
        <Experience />
        <CurveDivider type="tanh" />
        <Skills />
        <CurveDivider type="softmax" />
        <Projects />
        <CurveDivider type="sigmoid" />
        <Contact />
      </main>
    </div>
  )
}

export default App
