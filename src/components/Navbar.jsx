import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['About', '#about', '01.'],
    ['Experience', '#experience', '02.'],
    ['Projects', '#projects', '03.'],
    ['Skills', '#skills', '04.'],
    ['GitHub', '#github', '05.'],
    ['Contact', '#contact', '06.'],
  ]

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">M.A.W_</a>
        <ul className="nav-links">
          {links.map(([label, href, num]) => (
            <li key={label}>
              <a href={href}><span className="num">{num}</span>{label}</a>
            </li>
          ))}
        </ul>
        <a href="mailto:muhammadabdullahasif1074@gmail.com" className="nav-cta">Say Hello</a>
      </div>
    </nav>
  )
}
