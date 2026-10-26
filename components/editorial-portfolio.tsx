"use client"

import { useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import localFont from "next/font/local"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { useItchGames, type Project } from "@/hooks/use-itch-games"
import { publicAsset } from "@/lib/public-path.mjs"
import styles from "./editorial-portfolio.module.css"

const display = localFont({ src: "../public/fonts/syne.woff2", variable: "--editorial-display", weight: "700 800", display: "swap" })
const body = localFont({ src: "../public/fonts/epilogue.woff2", variable: "--editorial-body", weight: "400 700", display: "swap" })

const artwork: Record<string, { main: string; detail: string; alt: string; detailAlt: string }> = {
  "https://tboxfinn.itch.io/bubbleware": { main: "bubble-world", detail: "bubble-play", alt: "BubbleWare soda minigame gameplay", detailAlt: "BubbleWare food minigame gameplay" },
  "https://grimoirestudios.itch.io/orreryready": { main: "orrery-world", detail: "orrery-detail", alt: "Orrery Ready room with a suspended planet", detailAlt: "Orrery Ready interactive object" },
}

const experience = [
  { studio: "Grimoire Games", role: "Unity Game Developer", dates: "November 2020 - Present", highlights: "Led teams through 15+ game developments, created 13+ award-winning projects across various genres" },
  { studio: "Inmersys", role: "XR Designer", dates: "June 2024 - June 2025", highlights: "Created immersive 3D environments and VR prototypes, improving client delivery timelines by 25%" },
  { studio: "FUSE People & Technology", role: "Unity Developer", dates: "August 2022 - June 2025", highlights: "Developed 20+ interactive apps, improved player engagement by 48.7% and reduced crash rates by 74.3%" },
]

const skills = [
  { name: "Core technologies", items: ["Unity", "C#", ".NET", "Visual Studio"] },
  { name: "XR development", items: ["VR/AR", "OpenXR", "Oculus SDK", "HoloLens"] },
  { name: "Multiplayer & networking", items: ["Photon", "Mirror", "WebRTC"] },
  { name: "Integration & APIs", items: ["APIs", "JSON", "REST", "WebGL"] },
  { name: "Graphics & rendering", items: ["Shaders", "HLSL", "URP", "HDRP"] },
  { name: "Leadership & process", items: ["Team Leadership", "Agile", "Code Review", "Mentoring"] },
]

function projectImage(project: Project) {
  const art = artwork[project.url ?? ""]
  return { src: art ? publicAsset(`/images/projects/${art.main}.webp`) : project.video || publicAsset("/placeholder.svg"), alt: art?.alt ?? `${project.name} project artwork` }
}

export default function EditorialPortfolio() {
  const { convertToProjects, loading, error, searchTerm, setSearchTerm } = useItchGames()
  const projects = convertToProjects("unity")
  const [selectedUrl, setSelectedUrl] = useState("https://tboxfinn.itch.io/bubbleware")
  const selected = projects.find(project => project.url === selectedUrl) ?? projects.find(project => artwork[project.url ?? ""]) ?? projects[0]
  const mainImage = useRef<HTMLImageElement>(null)
  const pendingAnimation = useRef(false)
  const selectedArt = selected && artwork[selected.url ?? ""]
  const featured = projects.filter(project => artwork[project.url ?? ""])

  function chooseProject(project: Project, event: MouseEvent<HTMLButtonElement>) {
    if (selected === project || (selected?.url && selected.url === project.url)) return
    mainImage.current?.getAnimations?.().forEach(animation => animation.cancel())
    pendingAnimation.current = event.detail > 0
    setSelectedUrl(project.url ?? "")
  }

  function revealImage() {
    const img = mainImage.current
    if (!pendingAnimation.current || !img) return
    pendingAnimation.current = false
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !img.animate) return
    img.getAnimations().forEach(animation => animation.cancel())
    img.animate([{ opacity: 0.55, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: "cubic-bezier(.23,1,.32,1)" })
  }

  return (
    <div className={`${styles.portfolio} ${display.variable} ${body.variable}`}>
      <a className={styles.skip} href="#main-content">Skip to main content</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Eric Zaleta</Link>
        <nav aria-label="Main navigation">
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href={publicAsset("/Eric-Zaleta-Unity-Developer-Resume.pdf")} download="Eric-Zaleta-Unity-Developer-Resume.pdf">Resume <Download aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="portfolio-title">
          <div className={styles.typeStage}>
            <h1 id="portfolio-title"><span>Unity</span><span>developer.</span></h1>
            <figure className={styles.typeWindow} aria-label="A glimpse of BubbleWare gameplay">
              <img src={publicAsset("/images/projects/bubble-world.webp")} alt="BubbleWare soda minigame" width={960} height={540} fetchPriority="high" />
            </figure>
          </div>
          <div className={styles.intro}>
            <p>I&apos;m Eric. I build games, interactive applications and XR experiences. Unity is my home ground. Curiosity takes me further.</p>
            <a className={styles.primary} href="#projects">Enter the work <ArrowDown aria-hidden="true" /></a>
          </div>
        </section>

        <section id="projects" className={styles.work} aria-labelledby="work-title">
          <div className={styles.workTop}>
            <h2 id="work-title">Selected work</h2>
            {!loading && !error && featured.length > 0 && <div className={styles.projectChoices} aria-label="Featured project selection">
              {featured.map(project => <button type="button" key={project.url} aria-pressed={selected?.url === project.url} aria-controls="selected-project" data-project-choice onClick={event => chooseProject(project, event)}>{project.name}</button>)}
            </div>}
          </div>

          {loading ? <p className={styles.status} role="status">Loading projects from Itch.io...</p>
            : error ? <div className={styles.status} role="status"><h3>Projects are temporarily unavailable</h3><p>Please try again later, <a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer">visit Itch.io</a>, or contact me for project details.</p></div>
            : selected ? <article id="selected-project" className={styles.selectedProject}>
              <div className={styles.projectFrame}>
                <img ref={mainImage} data-project-image src={projectImage(selected).src} alt={projectImage(selected).alt} width={960} height={540} onLoad={revealImage} onError={event => { const fallback = publicAsset("/placeholder.svg"); if (event.currentTarget.getAttribute("src") !== fallback) event.currentTarget.src = fallback }} />
              </div>
              <div className={styles.caption} aria-live="polite" aria-atomic="true">
                <div><h3 data-project-title>{selected.name}</h3><p>{selected.platform && selected.platform !== "Unknown" ? selected.platform : "Itch.io"} <span aria-hidden="true">/</span> {selected.metrics.published}</p></div>
                <div><p>{selected.description}</p>{selected.url && <a data-project-link href={selected.url} target="_blank" rel="noopener noreferrer">Explore {selected.name} <ArrowUpRight aria-hidden="true" /></a>}</div>
              </div>
              {selectedArt && <figure className={styles.detail}><img src={publicAsset(`/images/projects/${selectedArt.detail}.webp`)} alt={selectedArt.detailAlt} width={960} height={540} loading="lazy" /><figcaption>Another moment in {selected.name}.</figcaption></figure>}
            </article> : <p className={styles.status} role="status">{searchTerm ? "No projects match your search. Try another title or clear the search." : "No published projects yet. Published games from Itch.io will appear here."}</p>}

          <div className={styles.indexHeader}>
            <h3>Project index</h3>
            <div className={styles.search}><label htmlFor="project-search">Find a project</label><input id="project-search" type="search" placeholder="Title or description" value={searchTerm} onChange={event => { pendingAnimation.current = false; setSearchTerm(event.target.value) }} />{searchTerm && <button type="button" onClick={() => setSearchTerm("")}>Clear search</button>}</div>
          </div>
          {!loading && !error && <ul className={styles.projectIndex} aria-label="All published projects">
            {projects.map(project => <li key={project.url ?? project.name}>
              <button type="button" data-project-choice aria-pressed={selected === project} aria-controls="selected-project" onClick={event => chooseProject(project, event)}><span>{project.name}</span><span className={styles.platform}>{project.platform && project.platform !== "Unknown" ? project.platform : "Itch.io"}</span></button>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on Itch.io`}><ArrowUpRight aria-hidden="true" /></a>}
            </li>)}
          </ul>}
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <h2 id="about-title">Game roots.<br />Wider horizons.</h2>
          <div><p>I studied game development. Since 2020, I&apos;ve been building with Unity across games, VR/AR and interactive applications.</p><p>My work connects gameplay mechanics, performance optimization and scalable systems. I&apos;m interested in what happens when those skills meet a different kind of brief.</p></div>
        </section>

        <section id="experience" className={styles.experience} aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <div>{experience.map(job => <article className={styles.job} key={job.studio}>
            <div><h3>{job.studio}</h3><p>{job.role}</p><p className={styles.dates}>{job.dates}</p></div><p>{job.highlights}</p>
          </article>)}</div>
        </section>

        <section id="skills" className={styles.skills} aria-labelledby="skills-title">
          <h2 id="skills-title">Tools of the trade</h2>
          <dl>{skills.map(group => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(" · ")}</dd></div>)}</dl>
        </section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <h2 id="contact-title">Let&apos;s build<br />what&apos;s next.</h2>
          <div><p>A game, an application, an experience.<br />Tell me what you&apos;re working on.</p><a className={styles.email} href="mailto:ericzaleta@gmail.com">ericzaleta@gmail.com <ArrowUpRight aria-hidden="true" /></a>
            <div className={styles.contactLinks}><a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer">Itch.io</a><a href="tel:+524811124012">+52 481 112 4012</a></div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}><p>Eric Zaleta © {new Date().getFullYear()}</p><Link href="/game-designer">Game design archive <ArrowUpRight aria-hidden="true" /></Link></footer>
    </div>
  )
}
