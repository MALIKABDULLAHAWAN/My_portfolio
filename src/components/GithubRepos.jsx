import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub, FaStar } from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051'
}

const MANUAL_REPOS = [
  { name: 'FYP', description: 'Dhyan — Production multimodal AI therapeutic system with face recognition, emotion detection, and LLM conversations.', language: 'JavaScript', html_url: 'https://github.com/MALIKABDULLAHAWAN/FYP', stargazers_count: 0 },
  { name: 'future.clinic', description: 'AI-powered healthcare web application built with TypeScript and Next.js. Deployed on GitHub Pages.', language: 'TypeScript', html_url: 'https://github.com/MALIKABDULLAHAWAN/future.clinic', stargazers_count: 0 },
  { name: 'clone_website', description: 'Full-stack web application clone built with TypeScript, featuring modern architecture and CI/CD deployment.', language: 'TypeScript', html_url: 'https://github.com/MALIKABDULLAHAWAN/clone_website', stargazers_count: 0 },
  { name: 'Next-JS-Workflows', description: 'Next.js application with GitHub Actions CI/CD workflows — demonstrating production-ready deployment pipelines.', language: 'TypeScript', html_url: 'https://github.com/MALIKABDULLAHAWAN/Next-JS-Workflows', stargazers_count: 0 },
  { name: 'build-angular-app', description: 'Angular application with full build pipeline, serving as a foundation for scalable enterprise UI.', language: 'HTML', html_url: 'https://github.com/MALIKABDULLAHAWAN/build-angular-app', stargazers_count: 0 },
  { name: 'My_portfolio', description: 'This very portfolio site — built with Vite, Three.js, and deployed via GitHub Actions to GitHub Pages.', language: 'HTML', html_url: 'https://github.com/MALIKABDULLAHAWAN/My_portfolio', stargazers_count: 0 },
]

export default function GithubRepos() {
  const [repos, setRepos] = useState(MANUAL_REPOS)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    fetch('https://api.github.com/users/MALIKABDULLAHAWAN/repos?sort=updated&per_page=6')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setRepos(data.slice(0, 6))
        }
      })
      .catch(() => {
        // Fallback already set
      })
  }, [])

  return (
    <section className="github" id="github" ref={ref}>
      <div className="container">
        <div className="github-hdr">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="section-label">Open Source</div>
            <h2 className="section-title">
              On <span className="gradient">GitHub</span>
            </h2>
          </motion.div>
          <motion.a
            className="github-link"
            href="https://github.com/MALIKABDULLAHAWAN"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            <FaGithub size={16} />
            <span>View Full Profile</span>
          </motion.a>
        </div>

        <div className="repos-grid">
          {repos.map((repo, i) => {
            const langColor = LANG_COLORS[repo.language] || '#64748b'
            return (
              <motion.a
                className="repo-card"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.name}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={i + 1}
              >
                <div className="repo-name">{repo.name}</div>
                <div className="repo-desc">
                  {repo.description || 'No description provided.'}
                </div>
                <div className="repo-footer">
                  {repo.language && (
                    <div className="repo-lang">
                      <div
                        className="lang-dot"
                        style={{ backgroundColor: langColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="repo-stars">
                    <FaStar size={12} style={{ color: '#e2e8f0', opacity: 0.8 }} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
