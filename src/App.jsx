import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import GithubRepos from './components/GithubRepos'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NeuralCanvas from './components/NeuralCanvas'
import Cursor from './components/Cursor'

export default function App() {
  const mouse = useRef([0, 0])

  // Track mouse coordinates for R3F 3D parallax (non-reactive/high-performance)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) - 0.5,
        (e.clientY / window.innerHeight) - 0.5
      ]
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth Momentum Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        const href = target.getAttribute('href')
        if (href === '#') {
          e.preventDefault()
          lenis.scrollTo(0)
        } else {
          const targetEl = document.querySelector(href)
          if (targetEl) {
            e.preventDefault()
            lenis.scrollTo(targetEl, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <>
      {/* 3D Neural Cosmos Background */}
      <NeuralCanvas mouse={mouse} />

      {/* Custom Spring Cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <GithubRepos />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
