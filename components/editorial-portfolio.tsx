"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import localFont from "next/font/local"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { useItchGames, type Project } from "@/hooks/use-itch-games"
import { publicAsset } from "@/lib/public-path.mjs"
import { animatePortfolio } from "@/lib/editorial-motion.mjs"
import { Skeleton } from "@/components/ui/skeleton"
import styles from "./editorial-portfolio.module.css"

const display = localFont({ src: "../public/fonts/syne.woff2", variable: "--editorial-display", weight: "700 800", display: "swap" })
const body = localFont({ src: "../public/fonts/epilogue.woff2", variable: "--editorial-body", weight: "400 700", display: "swap" })

const artwork: Record<string, { main: string; detail: string; width: number; height: number; detailWidth: number; detailHeight: number; alt: string; detailAlt: string }> = {
  "https://tboxfinn.itch.io/bubbleware": { main: "bubble-world", detail: "bubble-play", width: 1920, height: 1080, detailWidth: 1920, detailHeight: 1080, alt: "BubbleWare soda minigame gameplay", detailAlt: "BubbleWare food minigame gameplay" },
  "https://grimoirestudios.itch.io/orreryready": { main: "orrery-world", detail: "orrery-detail", width: 950, height: 593, detailWidth: 948, detailHeight: 590, alt: "Orrery Ready room with a suspended planet", detailAlt: "Orrery Ready interactive object" },
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

function responsiveImage(name: string, width: number, height: number, sizes: string) {
  const candidates = [640, 1280, width].filter((value, index, values) => value <= width && values.indexOf(value) === index).sort((a, b) => a - b)
  return {
    src: publicAsset(`/images/projects/${name}.webp`), width, height, sizes,
    srcSet: candidates.map(value => `${publicAsset(`/images/projects/${name}${value === width ? "" : `-${value}`}.webp`)} ${value}w`).join(", "),
  }
}

function projectImage(project: Project) {
  const art = artwork[project.url ?? ""]
  const maxWidth = Math.min(art?.width ?? 1280, 1280)
  return art
    ? { ...responsiveImage(art.main, art.width, art.height, `(max-width: 520px) calc(100vw - 44px), (max-width: ${maxWidth + 48}px) calc(100vw - 48px), ${maxWidth}px`), alt: art.alt }
    : { src: project.video || publicAsset("/placeholder.svg"), alt: `${project.name} project artwork` }
}

export default function EditorialPortfolio() {
  const portfolio = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (portfolio.current) return animatePortfolio(portfolio.current)
  }, [])
  const { convertToProjects, loading, error, searchTerm, setSearchTerm } = useItchGames()
  const projects = convertToProjects("unity")
  const [selectedUrl, setSelectedUrl] = useState("https://tboxfinn.itch.io/bubbleware")
  const selected = projects.find(project => project.url === selectedUrl) ?? projects.find(project => artwork[project.url ?? ""]) ?? projects[0]
  const mainImage = useRef<HTMLImageElement>(null)
  const pendingAnimation = useRef(false)
  const selectedArt = selected && artwork[selected.url ?? ""]
  const selectedImage = selected ? projectImage(selected) : null
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
    img.animate([{ opacity: 0.65, transform: "scale(1.025)", clipPath: "inset(0 8% 0 0)" }, { opacity: 1, transform: "scale(1)", clipPath: "inset(0)" }], { duration: 280, easing: "cubic-bezier(.23,1,.32,1)" })
  }

  return (
    <div ref={portfolio} className={`${styles.portfolio} ${display.variable} ${body.variable}`}>
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
            <h1 id="portfolio-title" aria-label="Unity developer."><span data-motion="type" data-motion-intro aria-hidden="true">Unity</span><span aria-hidden="true">{"developer.".split("").map((letter, index) => <span className={styles.letter} data-motion="letter" data-motion-intro key={index}>{letter}</span>)}</span></h1>
            <figure className={styles.typeWindow} aria-label="A glimpse of BubbleWare gameplay">
              {[0, 1, 2].map(slice => <span className={styles.imageSlice} data-motion="slice" data-motion-intro key={slice} aria-hidden={slice > 0 ? true : undefined}>
                <img {...responsiveImage("bubble-world", 1920, 1080, "(max-width: 1328px) 42vw, 538px")} alt={slice === 0 ? "BubbleWare soda minigame" : ""} fetchPriority="high" />
              </span>)}
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

          {loading ? <div role="status" aria-busy="true" data-project-skeleton>
            <span className="sr-only">Loading projects from Itch.io...</span>
            <div aria-hidden="true">
              <Skeleton className={`${styles.projectFrame} ${styles.skeleton} ${styles.skeletonImage}`} />
              <div className={styles.caption}>
                <div>
                  <Skeleton className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                  <Skeleton className={`${styles.skeleton} ${styles.skeletonLine} ${styles.skeletonShort}`} />
                </div>
                <div>
                  <Skeleton className={`${styles.skeleton} ${styles.skeletonLine}`} />
                  <Skeleton className={`${styles.skeleton} ${styles.skeletonLine}`} />
                  <Skeleton className={`${styles.skeleton} ${styles.skeletonLine} ${styles.skeletonShort}`} />
                </div>
              </div>
              <div className={styles.detail}>
                <Skeleton className={`${styles.skeleton} ${styles.skeletonImage}`} />
                <Skeleton className={`${styles.skeleton} ${styles.skeletonLine}`} />
              </div>
            </div>
          </div>
            : error ? <div className={styles.status} role="status"><h3>Projects are temporarily unavailable</h3><p>Please try again later, <a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer">visit Itch.io</a>, or contact me for project details.</p></div>
            : selected ? <article id="selected-project" className={styles.selectedProject}>
              <div className={styles.projectFrame} data-media={selectedArt ? "gameplay" : "cover"} style={selectedArt ? { maxWidth: selectedArt.width } : undefined}>
                <img ref={mainImage} data-project-image {...selectedImage} alt={selectedImage?.alt} onLoad={revealImage} onError={event => { const img = event.currentTarget; const fallback = publicAsset("/placeholder.svg"); img.removeAttribute("srcset"); img.removeAttribute("sizes"); if (img.getAttribute("src") !== fallback) img.src = fallback }} />
              </div>
              <div className={styles.caption} aria-live="polite" aria-atomic="true">
                <div><h3 data-project-title>{selected.name}</h3><p>{selected.platform && selected.platform !== "Unknown" ? selected.platform : "Itch.io"} <span aria-hidden="true">/</span> {selected.metrics.published}</p></div>
                <div><p>{selected.description}</p>{selected.url && <a data-project-link href={selected.url} target="_blank" rel="noopener noreferrer">Explore {selected.name} <ArrowUpRight aria-hidden="true" /></a>}</div>
              </div>
              {selectedArt && <figure className={styles.detail}><img {...responsiveImage(selectedArt.detail, selectedArt.detailWidth, selectedArt.detailHeight, "(max-width: 520px) 60vw, (max-width: 800px) 35vw, 400px")} alt={selectedArt.detailAlt} loading="lazy" /><figcaption>Another moment in {selected.name}.</figcaption></figure>}
            </article> : <p className={styles.status} role="status">{searchTerm ? "No projects match your search. Try another title or clear the search." : "No published projects yet. Published games from Itch.io will appear here."}</p>}

          <div className={styles.indexHeader}>
            <h3>Project index</h3>
            <div className={styles.search}><label htmlFor="project-search">Find a project</label><input id="project-search" type="search" placeholder="Title or description" value={searchTerm} disabled={loading} onChange={event => { pendingAnimation.current = false; setSearchTerm(event.target.value) }} />{searchTerm && <button type="button" onClick={() => setSearchTerm("")}>Clear search</button>}</div>
          </div>
          {loading ? <ul className={styles.projectIndex} aria-hidden="true" data-index-skeleton>
            {Array.from({ length: 6 }, (_, index) => <li key={index}><Skeleton className={`${styles.skeleton} ${styles.skeletonRow}`} /></li>)}
          </ul> : !error && <ul className={styles.projectIndex} aria-label="All published projects">
            {projects.map(project => <li key={project.url ?? project.name}>
              <button type="button" data-project-choice aria-pressed={selected === project} aria-controls="selected-project" onClick={event => chooseProject(project, event)}><span>{project.name}</span><span className={styles.platform}>{project.platform && project.platform !== "Unknown" ? project.platform : "Itch.io"}</span></button>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on Itch.io`}><ArrowUpRight aria-hidden="true" /></a>}
            </li>)}
          </ul>}
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <h2 id="about-title" data-motion="type">Game roots.<br />Wider horizons.</h2>
          <div><p>I studied game development. Since 2020, I&apos;ve been building with Unity across games, VR/AR and interactive applications.</p><p>My work connects gameplay mechanics, performance optimization and scalable systems. I&apos;m interested in what happens when those skills meet a different kind of brief.</p></div>
        </section>

        <section id="experience" className={styles.experience} aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <div>{experience.map(job => <article className={styles.job} key={job.studio} data-motion="row">
            <div><h3>{job.studio}</h3><p>{job.role}</p><p className={styles.dates}>{job.dates}</p></div><p>{job.highlights}</p>
          </article>)}</div>
        </section>

        <section id="skills" className={styles.skills} aria-labelledby="skills-title">
          <h2 id="skills-title">Tools of the trade</h2>
          <dl>{skills.map(group => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(" · ")}</dd></div>)}</dl>
        </section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <h2 id="contact-title" data-motion="type">Let&apos;s build<br />what&apos;s next.</h2>
          <div><p>A game, an application, an experience.<br />Tell me what you&apos;re working on.</p><a className={styles.email} href="mailto:ericzaleta@gmail.com">ericzaleta@gmail.com <ArrowUpRight aria-hidden="true" /></a>
            <div className={styles.contactLinks}><a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer">Itch.io</a><a href="tel:+524811124012">+52 481 112 4012</a></div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}><p>Eric Zaleta © {new Date().getFullYear()}</p><Link href="/game-designer">Game design archive <ArrowUpRight aria-hidden="true" /></Link></footer>
    </div>
  )
}
