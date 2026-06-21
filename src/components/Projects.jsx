import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

const projects = [
  {
    num: '01',
    title: 'Dhyan — Multimodal AI Therapeutic System',
    desc: 'Production-grade platform integrating React frontend with REST APIs and persistent storage. Implements face recognition, speaker identification, emotion detection, gesture interaction, adaptive therapeutic games, and LLM-powered conversations in a single cohesive system.',
    icon: '🧠',
    live: true,
    liveUrl: 'https://dhyan-ai.vercel.app',
    github: 'https://github.com/MALIKABDULLAHAWAN/FYP',
    tags: ['React', 'Node.js', 'OpenCV', 'LLMs', 'Face Recognition', 'REST API'],
    color: '#00d4ff'
  },
  {
    num: '02',
    title: 'DALL-E Clone — AI Image Generation Platform',
    desc: "End-to-end full-stack image generation app. Built with React, Node.js, and MySQL. Features user auth, generation history, image gallery, and a scalable frontend-backend architecture wired to OpenAI's image generation API.",
    icon: '🎨',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN/dall_e_clone_with_mysql',
    tags: ['React', 'Node.js', 'MySQL', 'OpenAI API', 'Auth'],
    color: '#7b2fff'
  },
  {
    num: '03',
    title: 'Urdu Deepfake Detection System',
    desc: 'CNN-LSTM deep learning model for detecting synthetic Urdu speech. Combines audio feature extraction (MFCCs, spectrograms) with temporal sequence modeling. Achieved 92% classification accuracy on a custom-built Urdu speech dataset.',
    icon: '🎙️',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN/Urdu-Audio-DeepFake-Detection',
    tags: ['Python', 'CNN-LSTM', 'PyTorch', 'Audio ML', 'TensorFlow'],
    color: '#ff6b35'
  },
  {
    num: '04',
    title: 'YOLO Attendance System',
    desc: 'Real-time AI-powered attendance system using YOLO face detection. Runs live inference at classroom scale — identifies and logs student presence with high throughput and minimal latency, purpose-built for educational institutions.',
    icon: '📷',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN/-Yolo-Attendance-System',
    tags: ['YOLO', 'OpenCV', 'Python', 'Real-time', 'Computer Vision'],
    color: '#00d4ff'
  },
  {
    num: '05',
    title: 'LLM Chatbot — Groq API',
    desc: "Ultra-low-latency conversational AI assistant powered by Groq's LPU inference. Features multi-turn context management, prompt engineering, and streaming responses — demonstrating production-ready LLM integration patterns.",
    icon: '💬',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN/Chatbot-using-GroqCloud-API',
    tags: ['Groq API', 'Prompt Engineering', 'LLMs', 'Python', 'RAG'],
    color: '#7b2fff'
  },
  {
    num: '06',
    title: 'Future.Clinic — Healthcare Web App',
    desc: 'Modern healthcare platform built with TypeScript and Next.js. Features appointment booking, patient management, and an AI-powered symptom advisor. Deployed via GitHub Pages with a full CI/CD pipeline.',
    icon: '🏥',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN/future.clinic',
    tags: ['TypeScript', 'Next.js', 'Healthcare', 'CI/CD'],
    color: '#ff6b35'
  }
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <div className="projects-hdr">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="section-label">Featured Work</div>
            <h2 className="section-title">
              What I've <span className="gradient">Built</span>
            </h2>
          </motion.div>
          <motion.a
            href="https://github.com/MALIKABDULLAHAWAN"
            target="_blank"
            rel="noopener"
            className="view-all"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            <FaGithub size={14} />
            View All on GitHub →
          </motion.a>
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <motion.div
              className="project-card"
              key={proj.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
              style={{ '--card-accent': proj.color }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="project-num">{proj.num}</div>

              <div className="project-top">
                <div className="project-icon">{proj.icon}</div>
                <div className="project-actions">
                  {proj.live && proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-action-btn live-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={11} />
                      <span>Live</span>
                    </a>
                  )}
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-action-btn github-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub size={13} />
                    <span>Code</span>
                  </a>
                </div>
              </div>

              {proj.live && (
                <div className="project-live">
                  <span className="live-dot" />
                  LIVE
                </div>
              )}

              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>

              <div className="tags">
                {proj.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>

              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    className="card-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `radial-gradient(circle at 50% 0%, ${proj.color}18, transparent 70%)` }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
