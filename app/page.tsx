'use client'

import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

type Project = {
  id: string
  name: string
  href: string | null
  role: string
  desc: string
  tags: string[]
  year: string
  featured: boolean
  image?: string
  imageAlt?: string
  showcase?: boolean
  badge?: string
}

const projects: Project[] = [
  {
    id: '01',
    name: 'MockingbirdAI',
    href: 'https://mockingbirdai.com.au',
    role: 'Co-Founder & Co-Developer',
    desc: 'Automated usability testing platform with video session replay and configurable AI agent personas. Simulates realistic user behaviour to surface UX issues — no manual testers needed.',
    tags: ['React', 'Node.js', 'Python', 'SQL'],
    year: '2026 –',
    featured: true,
    image: '/mocking.png',
    imageAlt: 'MockingbirdAI platform interface',
  },
  {
    id: '02',
    name: 'PropLense',
    href: 'https://proplense.com',
    role: 'Founder',
    desc: 'ML-driven property investment platform for the Australian market. Models score properties on investment potential using price history, suburb trends, rental yield, and comparable sales.',
    tags: ['Python', 'React', 'Next.js', 'ML'],
    year: '2025 –',
    featured: true,
    image: '/proplense.png',
    imageAlt: 'PropLense property investment platform',
  },
  {
    id: '03',
    name: 'Tennis Match Predictor',
    href: null,
    role: 'Machine Learning',
    desc: '74% accuracy on match outcomes across backtested historical data. Engineers Elo ratings, rolling form, fatigue and a momentum composite, then trains a Random Forest on live Betfair markets.',
    tags: ['Python', 'scikit-learn', 'pandas'],
    year: '2026',
    featured: false,
    showcase: true,
    image: '/tennis-backtest.png',
    imageAlt: 'Backtested bankroll curve growing to +117% over 600 matches',
    badge: '+117% backtested',
  },
  {
    id: '04',
    name: 'Chemical Structure Predictor',
    href: null,
    role: 'Deep Learning — MVP in progress',
    desc: 'AlphaFold-inspired model predicting chemical compound properties and 3D structures. Iterating on architecture and training data pipeline.',
    tags: ['Python', 'PyTorch', 'Deep Learning'],
    year: '2025 –',
    featured: false,
  },
  {
    id: '05',
    name: '8bit Language Game',
    href: null,
    role: 'AI Product · In development',
    desc: 'Retro 8-bit language learning game set in a hand-built pixel-art Barcelona. About 80% complete, with working AI-driven NPC conversations and a library full of books you can read and translate on the fly. An adaptive engine tunes vocabulary and grammar difficulty in real time as you explore.',
    tags: ['Python', 'JavaScript', 'AI', 'Pixel Art'],
    year: '2026',
    featured: false,
    image: '/8bit-map.webp',
    imageAlt: 'Pixel-art Barcelona map with station, farmacia, cinema, hotel, La Boqueria, cathedral and harbour',
    showcase: true,
    badge: '80% complete',
  },
  {
    id: '06',
    name: 'Algorithmic Trading Bots',
    href: null,
    role: 'Quantitative Finance',
    desc: 'Polymarket weather bot built on edge detection against calibrated forecasts. Separate momentum-based crypto bot with automated signal detection and position sizing.',
    tags: ['Python', 'Statistics', 'Automation'],
    year: '2026',
    featured: false,
  },
]

const stack = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'SQL', 'REST APIs'] },
  { label: 'ML / AI', items: ['scikit-learn', 'PyTorch', 'pandas', 'NumPy'] },
]

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 6.5h8M6.5 2.5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path
        d="M2 9L9 2M9 2H4M9 2V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="1.75"
        y="3.25"
        width="12.5"
        height="9.5"
        rx="1.75"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M2.5 4.5l5.5 4 5.5-4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3.4 2A1.4 1.4 0 102 3.4 1.4 1.4 0 003.4 2zM2.2 5.5h2.4V14H2.2V5.5zM6.3 5.5h2.3v1.16h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68V14h-2.4V9.56c0-1.06-.02-2.42-1.48-2.42-1.48 0-1.7 1.15-1.7 2.34V14H6.3V5.5z" />
    </svg>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div data-reveal className="flex items-center gap-4 mb-14">
      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400">
        {text}
      </span>
      <div className="flex-1 h-px bg-zinc-200" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */

function ProjectCard({
  project,
  delay,
}: {
  project: Project
  delay: number
}) {
  return (
    <div
      data-reveal
      data-delay={String(delay)}
      className="group relative flex flex-col bg-white border border-zinc-200/80 rounded-2xl
                 hover:border-zinc-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                 transition-all duration-300 ease-out overflow-hidden"
    >
      {/* Optional image header */}
      {project.image && (
        <div className="relative overflow-hidden bg-zinc-100 aspect-[16/9] border-b border-zinc-200/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt ?? project.name}
            className="absolute inset-0 w-full h-full object-cover
                       transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-[10px] text-zinc-300 tracking-widest select-none">
          {project.id}
        </span>
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-zinc-900 transition-colors"
            aria-label={`Visit ${project.name}`}
          >
            <ExternalIcon />
          </a>
        ) : (
          <span className="w-[11px]" />
        )}
      </div>

      {/* Content */}
      <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight mb-1 leading-snug">
        {project.name}
      </h3>
      <p className="text-[11px] font-mono text-zinc-400 mb-4 tracking-wide">
        {project.role}
      </p>
      <p className="text-[13px] text-zinc-500 leading-relaxed flex-1 mb-6">
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-600 px-2.5 py-[3px] rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Year — bottom right ghost */}
      <span className="absolute bottom-5 right-5 font-mono text-[10px] text-zinc-200 select-none">
        {project.year}
      </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SHOWCASE CARD — image + content, full width
───────────────────────────────────────────── */

function ShowcaseCard({ project }: { project: Project }) {
  return (
    <div
      data-reveal
      className="group relative grid grid-cols-1 md:grid-cols-2 bg-white border border-zinc-200/80
                 rounded-2xl overflow-hidden hover:border-zinc-300
                 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-100 aspect-[16/10] md:aspect-auto md:min-h-[320px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.imageAlt ?? project.name}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {project.badge && (
          <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em]
                           bg-zinc-900/80 text-white backdrop-blur px-2.5 py-1 rounded-full select-none">
            {project.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-7 md:p-9">
        <div className="flex items-start justify-between mb-5">
          <span className="font-mono text-[10px] text-zinc-300 tracking-widest select-none">
            {project.id}
          </span>
          <span className="font-mono text-[10px] text-zinc-300 select-none">
            {project.year}
          </span>
        </div>

        <h3 className="text-[19px] font-semibold text-zinc-900 tracking-tight mb-1 leading-snug">
          {project.name}
        </h3>
        <p className="text-[11px] font-mono text-zinc-400 mb-5 tracking-wide">
          {project.role}
        </p>
        <p className="text-[13px] text-zinc-500 leading-relaxed flex-1 mb-7">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-600 px-2.5 py-[3px] rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  /* Nav scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll-reveal observer */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(250,249,247,0.82)] backdrop-blur-xl border-b border-zinc-200/60 py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a
            href="#"
            className="text-[13px] font-semibold text-zinc-900 tracking-tight hover:text-zinc-500 transition-colors"
          >
            DS
          </a>
          <nav className="flex items-center gap-7">
            {[
              { label: 'Projects', href: '#projects' },
              { label: 'Stack', href: '#stack' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10">

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center pt-28 pb-24">

          {/* Eyebrow */}
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-10">
            Software Engineer  ·  Builder  ·  Perth, AU
          </p>

          {/* Name */}
          <h1 className="hero-name text-zinc-900 mb-10">
            <span className="block font-light">Dimitri</span>
            <span className="block font-extrabold">Stojcic.</span>
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-zinc-300 mb-10" />

          {/* Bio */}
          <p className="text-[17px] text-zinc-500 max-w-[520px] leading-[1.7] mb-12">
            I build ML-driven products that ship. Co-founder of{' '}
            <a
              href="https://mockingbirdai.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 link-underline"
            >
              MockingbirdAI
            </a>{' '}
            and{' '}
            <a
              href="https://proplense.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 link-underline"
            >
              PropLense
            </a>
            . Currently studying Software Engineering at Curtin University, after switching over from Mechanical Engineering.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white text-[13px] font-medium
                         px-5 py-2.5 rounded-full hover:bg-zinc-700 transition-colors"
            >
              View projects
              <ArrowIcon />
            </a>
            <a
              href="mailto:dimitri.stojcic@gmail.com"
              className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-600 text-[13px]
                         font-medium px-5 py-2.5 rounded-full hover:border-zinc-400 hover:text-zinc-900
                         transition-colors"
            >
              Get in touch
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30">
            <div className="w-px h-10 bg-zinc-400 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────────── */}
        <section id="projects" className="py-24">
          <SectionLabel text="Selected projects" />

          {/* Featured — 2 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {projects
              .filter((p) => p.featured)
              .map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={i + 1} />
              ))}
          </div>

          {/* Showcase — full-width image cards */}
          <div className="grid grid-cols-1 gap-3 mb-3">
            {projects
              .filter((p) => p.showcase)
              .map((p) => (
                <ShowcaseCard key={p.id} project={p} />
              ))}
          </div>

          {/* Others — 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects
              .filter((p) => !p.featured && !p.showcase)
              .map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={i + 1} />
              ))}
          </div>
        </section>

        {/* ── Stack ───────────────────────────────────────────────── */}
        <section id="stack" className="py-24 border-t border-zinc-100">
          <SectionLabel text="Stack" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stack.map((group, i) => (
              <div key={group.label} data-reveal data-delay={String(i + 1)}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 mb-4">
                  {group.label}
                </p>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[14px] text-zinc-700 font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────── */}
        <section id="contact" className="py-24 border-t border-zinc-100">
          <div data-reveal className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 mb-8">
              Contact
            </p>
            <h2 className="text-[2.6rem] md:text-[3.4rem] font-bold text-zinc-900 tracking-tight leading-[1.05] mb-7">
              Let's work<br />together.
            </h2>
            <p className="text-[15px] text-zinc-500 leading-relaxed mb-12 max-w-sm">
              Open to internships, collaborations, and interesting problems.
              Reach out any time.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  label: 'dimitri.stojcic@gmail.com',
                  href: 'mailto:dimitri.stojcic@gmail.com',
                  icon: <MailIcon />,
                },
                {
                  label: 'github.com/dims8',
                  href: 'https://github.com/dims8',
                  icon: <GitHubIcon />,
                },
                {
                  label: 'linkedin.com/in/dimitristojcic',
                  href: 'https://linkedin.com/in/dimitristojcic',
                  icon: <LinkedInIcon />,
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3.5 text-[13px] font-medium text-zinc-800
                             hover:text-zinc-400 transition-colors"
                >
                  <span
                    className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center
                                text-zinc-400
                                group-hover:border-zinc-400 group-hover:text-zinc-900 transition-colors"
                  >
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 py-8">
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-300">
            © 2025 Dimitri Stojcic
          </span>
          <span className="font-mono text-[11px] text-zinc-300">
            Perth, AU
          </span>
        </div>
      </footer>
    </>
  )
}
