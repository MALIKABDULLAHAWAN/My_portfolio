import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

const skillGroups = [
  {
    name: 'Programming Core',
    badge: 'Core',
    icon: '🐍',
    color: '#00d4ff',
    pills: ['Python', 'C++', 'SQL', 'TypeScript', 'JavaScript']
  },
  {
    name: 'ML & Deep Learning',
    badge: 'AI',
    icon: '🤖',
    color: '#7b2fff',
    pills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'CNNs', 'RNNs', 'LSTMs']
  },
  {
    name: 'Generative AI',
    badge: 'LLMs',
    icon: '✨',
    color: '#ff6b35',
    pills: ['OpenAI API', 'Groq API', 'RAG', 'Prompt Engineering', 'AI Agents', 'LangChain']
  },
  {
    name: 'Computer Vision',
    badge: 'CV',
    icon: '👁️',
    color: '#00d4ff',
    pills: ['OpenCV', 'YOLO', 'Face Recognition', 'Emotion Detection', 'Spectrograms']
  },
  {
    name: 'Backend & APIs',
    badge: 'Server',
    icon: '⚙️',
    color: '#7b2fff',
    pills: ['Flask', 'Node.js', 'REST APIs', 'MySQL', 'React', 'Next.js']
  },
  {
    name: 'Cloud & DevOps',
    badge: 'Ops',
    icon: '☁️',
    color: '#ff6b35',
    pills: ['AWS EC2', 'AWS S3', 'Linux', 'Git', 'GitHub Actions', 'CI/CD']
  }
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-label">Technical Arsenal</div>
          <h2 className="section-title">
            What I <span className="gradient">Know</span>
          </h2>
          <p className="skills-sub">
            From training neural networks to shipping full-stack products — here's the stack I actually use in production.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <motion.div
              className="skill-group"
              key={group.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
              style={{ '--group-accent': group.color }}
            >
              <div className="skill-group-top">
                <div className="skill-group-icon">{group.icon}</div>
                <span className="skill-badge">{group.badge}</span>
              </div>
              <div className="skill-group-name">{group.name}</div>
              <div className="skill-pills">
                {group.pills.map((pill) => (
                  <motion.span
                    className="skill-pill"
                    key={pill}
                    whileHover={{ y: -2, color: 'var(--text)' }}
                    transition={{ duration: 0.15 }}
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
