import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

const experiences = [
  {
    role: 'Web & AI Intern',
    company: 'Smart Computing · Hybrid',
    date: 'JUN 2025 — JUL 2025',
    bullets: [
      {
        title: 'Agentic AI System Integration:',
        text: 'Wired agent-based AI workflows into production web applications, enabling automated task execution and intelligent response pipelines.'
      },
      {
        title: 'AI-Assisted Full-Stack Development:',
        text: 'Shipped multiple features using LLM-driven dev workflows — cutting delivery cycles significantly without sacrificing quality.'
      },
      {
        title: 'Generative AI Feature Implementation:',
        text: 'Integrated OpenAI and Groq APIs to power real-time LLM features including prompt-engineered assistants and RAG-enhanced search.'
      }
    ]
  }
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-label">Work Experience</div>
          <h2 className="section-title">
            Where I've <span className="gradient">Shipped</span>
          </h2>
        </motion.div>

        <div className="exp-timeline">
          {experiences.map((exp, i) => (
            <motion.div
              className="exp-item"
              key={exp.role + i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <div className="exp-header">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-date">{exp.date}</div>
              </div>
              <div className="exp-company">{exp.company}</div>
              <div className="exp-body">
                <ul>
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>
                      <strong>{bullet.title}</strong> {bullet.text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
