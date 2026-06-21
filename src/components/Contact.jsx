import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-label">Get In Touch</div>
        </motion.div>

        <motion.div
          className="contact-card"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          <h2 className="contact-big">
            Let's Build<br />
            <span className="gradient">Something Real</span>
          </h2>
          <p className="contact-sub">
            Currently open to full-time roles, internships, and AI collaborations. If you're working on something ambitious, I'd love to hear about it.
          </p>
          <div className="contact-links">
            <a
              href="mailto:muhammadabdullahasif1074@gmail.com"
              className="contact-btn email"
            >
              <FaEnvelope size={16} />
              <span>muhammadabdullahasif1074@gmail.com</span>
            </a>
            <a
              href="https://github.com/MALIKABDULLAHAWAN"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn gh"
            >
              <FaGithub size={16} />
              <span>MALIKABDULLAHAWAN</span>
            </a>
            <a
              href="https://linkedin.com/in/malikabdullahawan-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn li"
            >
              <FaLinkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
