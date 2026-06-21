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

const projects = [
  {
    title: 'Dhyan — Multimodal AI Therapeutic System',
    desc: 'Production-grade platform integrating React frontend with REST APIs and persistent storage. Implements face recognition, speaker identification, emotion detection, gesture interaction, adaptive therapeutic games, and LLM-powered conversations in a single cohesive system.',
    icon: '🧠',
    live: true,
    github: 'https://github.com/MALIKABDULLAHAWAN/FYP',
    tags: ['React', 'Node.js', 'OpenCV', 'LLMs', 'Face Recognition', 'REST API']
  },
  {
    title: 'DALL-E Clone — AI Image Generation Platform',
    desc: "End-to-end full-stack image generation app. Built with React, Node.js, and MySQL. Features user auth, generation history, image gallery, and a scalable frontend-backend architecture wired to OpenAI's image generation API.",
    icon: '🎨',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN',
    tags: ['React', 'Node.js', 'MySQL', 'OpenAI API', 'Auth']
  },
  {
    title: 'Urdu Deepfake Detection System',
    desc: 'CNN-LSTM deep learning model for detecting synthetic Urdu speech. Combines audio feature extraction (MFCCs, spectrograms) with temporal sequence modeling. Achieved 92% classification accuracy.',
    icon: '🎙️',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN',
    tags: ['Python', 'CNN-LSTM', 'PyTorch', 'Audio ML', 'TensorFlow']
  },
  {
    title: 'AI Attendance System',
    desc: 'YOLO-based real-time face recognition pipeline for automated attendance. Runs live inference at classroom scale with high throughput and minimal latency. Designed for direct deployment in educational institutions.',
    icon: '📷',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN',
    tags: ['YOLO', 'OpenCV', 'Python', 'Real-time', 'Computer Vision']
  },
  {
    title: 'LLM Chatbot — Groq API',
    desc: 'Ultra-low-latency conversational AI assistant powered by Groq\'s LPU inference. Features multi-turn context management, prompt engineering, and streaming responses — demonstrating production-ready LLM integration patterns.',
    icon: '💬',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN',
    tags: ['Groq API', 'Prompt Engineering', 'LLMs', 'Python', 'RAG']
  },
  {
    title: 'Future.Clinic — Healthcare Web App',
    desc: 'Modern healthcare platform built with TypeScript and Next.js. Features appointment booking, patient management, and an AI-powered symptom advisor. Deployed via GitHub Pages with a full CI/CD pipeline.',
    icon: '🏥',
    live: false,
    github: 'https://github.com/MALIKABDULLAHAWAN/future.clinic',
    tags: ['TypeScript', 'Next.js', 'Healthcare', 'CI/CD']
  }
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
            View All on GitHub →
          </motion.a>
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <motion.a
              className="project-card"
              href={proj.github}
              target="_blank"
              rel="noopener"
              key={proj.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <div className="project-top">
                <div className="project-icon">{proj.icon}</div>
                <div className="project-links">
                  <span className="project-link">↗ GitHub</span>
                  {proj.live && <span className="project-link live-label">↗ Live</span>}
                </div>
              </div>
              {proj.live && <div className="project-live">LIVE ON VERCEL</div>}
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>
              <div className="tags">
                {proj.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
