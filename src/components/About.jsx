import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22,1,0.36,1] }
  })
}

const stats = [
  { num: '4+', label: 'Years Studying AI' },
  { num: '10+', label: 'AI Systems Built' },
  { num: '92%', label: 'Model Accuracy' },
  { num: '417', label: 'Families Supported' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">The <span className="gradient">Mind</span> Behind the Code</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          >
            <p>I'm a final-year <strong>AI Engineering student at GIKI</strong> (Ghulam Ishaq Khan Institute), a competitive engineering programme where I've been immersed in machine learning, computer vision, and systems design since 2022.</p>
            <p>My real playground is the <strong>intersection of large language models and practical software</strong>. I've built multimodal therapeutic platforms, trained deepfake detection models, and deployed agentic AI workflows — not as side projects, but as production-grade systems.</p>
            <p>Most recently, I interned at <strong><a href="https://github.com/MALIKABDULLAHAWAN" target="_blank" rel="noopener">Smart Computing</a></strong>, where I integrated agentic AI systems into live web applications, accelerating delivery with AI-assisted full-stack development. I'm the kind of engineer who ships.</p>
            <p>Beyond code — I've led community welfare projects coordinating <strong>100+ volunteers</strong> supporting 417 families and organized academic competitions for 180+ participants at GIKI Mathematical Society.</p>
          </motion.div>

          <motion.div
            className="about-sidebar"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
          >
            <div className="stat-row">
              {stats.map(({ num, label }) => (
                <div className="stat-card" key={label}>
                  <div className="stat-num gradient">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="edu-card">
              <div className="edu-icon">🎓</div>
              <div className="edu-degree">BS Artificial Intelligence</div>
              <div className="edu-school">Ghulam Ishaq Khan Institute of Engineering Sciences & Technology</div>
              <div className="edu-dates">SEP 2022 — JUN 2026 · Topi, Pakistan</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
