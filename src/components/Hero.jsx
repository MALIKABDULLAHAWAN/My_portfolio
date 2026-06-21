import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] } })
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.p
          className="hero-eyebrow"
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
        >
          Available for opportunities
        </motion.p>

        <motion.h1
          className="hero-name"
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
        >
          <span className="l1">Malik Abdullah</span>
          <span className="l2 gradient">Awan</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
        >
          Building <em>intelligent systems</em> at the intersection of generative AI,
          computer vision, and full-stack engineering —{' '}
          graduating from <em>GIKI</em> June 2026.
        </motion.p>

        <motion.div
          className="hero-actions"
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
        >
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </motion.div>

        <motion.div
          className="hero-badges"
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
        >
          <div className="badge">
            <span className="badge-dot" style={{ background: 'var(--cyan)' }} />
            BS Artificial Intelligence @ GIKI
          </div>
          <div className="badge">
            <span className="badge-dot" style={{ background: 'var(--violet)' }} />
            AI Engineer
          </div>
          <div className="badge">
            <span className="badge-dot" style={{ background: 'var(--ember)' }} />
            Topi, Pakistan
          </div>
        </motion.div>
      </div>

      <div className="scroll-hint">
        <motion.div
          className="scroll-line"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.span
          className="scroll-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          Scroll
        </motion.span>
      </div>
    </section>
  )
}
