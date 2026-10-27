"use client"

import { useCallback, useEffect, useRef, useState, type MouseEvent, type SyntheticEvent } from "react"
import Link from "next/link"
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowRight, ArrowUpRight, Download, X } from "lucide-react"
import { useItchGames, type Project } from "@/hooks/use-itch-games"
import { publicAsset } from "@/lib/public-path.mjs"
import { animatePortfolio } from "@/lib/editorial-motion.mjs"
import { Skeleton } from "@/components/ui/skeleton"
import styles from "./editorial-portfolio.module.css"

const videoSource = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
const resume = "/Eric-Zaleta-Unity-Developer-Resume.pdf"

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

const galleryArt = [
  { src: "/images/projects/bubble-world.webp", alt: "BubbleWare soda minigame gameplay", title: "BubbleWare" },
  { src: "/images/projects/orrery-world.webp", alt: "Orrery Ready room with a suspended planet", title: "Orrery Ready" },
  { src: "/images/projects/bubble-play.webp", alt: "BubbleWare food minigame gameplay", title: "BubbleWare" },
  { src: "/images/projects/orrery-detail.webp", alt: "Orrery Ready interactive object", title: "Orrery Ready" },
]

type GalleryImage = { src: string; alt: string; title: string }

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

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget
  const fallback = publicAsset("/placeholder.svg")
  img.removeAttribute("srcset")
  img.removeAttribute("sizes")
  if (img.getAttribute("src") !== fallback) img.src = fallback
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      onComplete()
      return
    }
    let frame = 0
    let timeout = 0
    const start = performance.now()
    const tick = (now: number) => {
      const next = Math.min(100, Math.floor((now - start) / 2700 * 100))
      setCount(next)
      if (next < 100) frame = requestAnimationFrame(tick)
      else timeout = window.setTimeout(onComplete, 400)
    }
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timeout) }
  }, [onComplete])

  const word = ["Design", "Create", "Inspire"][Math.min(2, Math.floor(count / 34))]
  return (
    <motion.div className={styles.loader} initial={false} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.45 }} aria-label="Loading portfolio" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={count}>
      <span className={styles.loaderLabel}>Portfolio</span>
      <div className={styles.loaderWord} aria-hidden="true">
        <AnimatePresence mode="wait"><motion.span key={word} initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>{word}</motion.span></AnimatePresence>
      </div>
      <span className={styles.loaderCount} aria-hidden="true">{String(count).padStart(3, "0")}</span>
      <span className={styles.loaderTrack} aria-hidden="true"><span style={{ transform: `scaleX(${count / 100})` }} /></span>
    </motion.div>
  )
}

function AmbientVideo({ inverted = false }: { inverted?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let cancelled = false
    let started = false
    let ready = false
    let visible = true
    let hls: { destroy: () => void } | undefined
    const startNative = () => {
      if (cancelled) return
      if (!visible) { started = false; return }
      hls?.destroy()
      hls = undefined
      if (!video.canPlayType("application/vnd.apple.mpegurl")) { started = false; return }
      video.src = videoSource
      ready = true
      void video.play().catch(() => {})
    }
    const start = () => {
      if (started) { if (ready) void video.play().catch(() => {}); return }
      started = true
      void import("hls.js").then(({ default: Hls }) => {
        if (cancelled) return
        if (!visible) { started = false; return }
        if (!Hls.isSupported()) { startNative(); return }
        const player = new Hls()
        hls = player
        player.loadSource(videoSource)
        player.attachMedia(video)
        ready = true
        void video.play().catch(() => {})
      }).catch(startNative)
    }
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      visible = Boolean(entries[0]?.isIntersecting)
      if (visible) start()
      else if (started) video.pause()
    }, { rootMargin: "200px" })
    if (observer) observer.observe(video)
    else start()
    return () => { cancelled = true; observer?.disconnect(); hls?.destroy(); video.pause() }
  }, [])
  return <video ref={videoRef} className={`${styles.video} ${inverted ? styles.videoInverted : ""}`} poster={publicAsset("/images/projects/bubble-world-1280.webp")} autoPlay muted loop playsInline aria-hidden="true" tabIndex={-1} />
}

function SectionHeading({ eyebrow, title, italic, description, action }: { eyebrow: string; title: string; italic: string; description: string; action?: { href: string; label: string } }) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={styles.sectionHeading} data-reveal initial={reducedMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}>
    <div><p className={styles.eyebrow}><span />{eyebrow}</p><h2>{title} <em>{italic}</em></h2><p className={styles.sectionIntro}>{description}</p></div>
    {action && <a className={`${styles.outlineButton} ${styles.sectionAction}`} href={action.href}>{action.label}<ArrowRight aria-hidden="true" /></a>}
  </motion.div>
}

export default function EditorialPortfolio() {
  const portfolio = useRef<HTMLDivElement>(null)
  const exploreSection = useRef<HTMLElement>(null)
  const exploreContent = useRef<HTMLDivElement>(null)
  const marquee = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [roleIndex, setRoleIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState("home")
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)
  const finishLoading = useCallback(() => setIsLoading(false), [])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (portfolio.current) return animatePortfolio(portfolio.current)
  }, [])
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 100)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setRoleIndex(index => (index + 1) % 3), 2000)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    if (isLoading || !portfolio.current || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    let cancelled = false
    let revert: (() => void) | undefined
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !portfolio.current) return
      gsap.registerPlugin(ScrollTrigger)
      const context = gsap.context(() => {
        gsap.fromTo(`.${styles.nameReveal}`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1, ease: "power3.out" })
        gsap.fromTo(`.${styles.blurIn}`, { opacity: 0, filter: "blur(10px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0.3, ease: "power3.out" })
        if (marquee.current) gsap.to(marquee.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 })
        if (exploreSection.current && exploreContent.current && window.matchMedia("(min-width: 768px)").matches) {
          ScrollTrigger.create({ trigger: exploreSection.current, pin: exploreContent.current, start: "top top", end: "bottom bottom", pinSpacing: false })
          gsap.to(`.${styles.galleryColumnLeft}`, { yPercent: -14, ease: "none", scrollTrigger: { trigger: exploreSection.current, start: "top bottom", end: "bottom top", scrub: true } })
          gsap.to(`.${styles.galleryColumnRight}`, { yPercent: 14, ease: "none", scrollTrigger: { trigger: exploreSection.current, start: "top bottom", end: "bottom top", scrub: true } })
        }
      }, portfolio)
      revert = () => context.revert()
    }).catch(() => {})
    return () => { cancelled = true; revert?.() }
  }, [isLoading])

  const { convertToProjects, loading, error, searchTerm, setSearchTerm } = useItchGames()
  const projects = convertToProjects("unity")
  const [selectedUrl, setSelectedUrl] = useState("https://tboxfinn.itch.io/bubbleware")
  const selected = projects.find(project => project.url === selectedUrl) ?? projects.find(project => artwork[project.url ?? ""]) ?? projects[0]
  const mainImage = useRef<HTMLImageElement>(null)
  const pendingAnimation = useRef(false)
  const selectedArt = selected && artwork[selected.url ?? ""]
  const selectedImage = selected ? projectImage(selected) : null
  const featured = projects.filter(project => artwork[project.url ?? ""])
  const featuredCards = [...featured, ...projects.filter(project => !artwork[project.url ?? ""] && project.video), ...projects.filter(project => !artwork[project.url ?? ""] && !project.video)].slice(0, 4)
  const gallery: GalleryImage[] = [
    ...galleryArt.map(image => ({ ...image, src: publicAsset(image.src) })),
    ...projects.filter(project => project.video).slice(0, 2).map(project => ({ src: project.video, alt: `${project.name} project artwork`, title: project.name })),
  ]

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

  function openImage(image: GalleryImage) {
    setLightbox(image)
    if (dialog.current?.showModal) dialog.current.showModal()
    else dialog.current?.setAttribute("open", "")
  }

  function closeImage() {
    if (dialog.current?.close) dialog.current.close()
    else { dialog.current?.removeAttribute("open"); setLightbox(null) }
  }

  return (
    <MotionConfig reducedMotion="user"><div ref={portfolio} className={styles.portfolio}>
      <noscript><style>{`.${styles.loader}{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={finishLoading} />}</AnimatePresence>
      <a className={styles.skip} href="#main-content">Skip to main content</a>
      <header className={styles.header}>
        <nav aria-label="Main navigation" className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
          <a href="#home" className={styles.logo} aria-label="Eric Zaleta, home" onClick={() => setActiveNav("home")}><span>EZ</span></a>
          <span className={styles.navDivider} aria-hidden="true" />
          <a className={activeNav === "home" ? styles.navActive : ""} href="#home" onClick={() => setActiveNav("home")}>Home</a>
          <a className={activeNav === "projects" ? styles.navActive : ""} href="#projects" onClick={() => setActiveNav("projects")}>Work</a>
          <a href={publicAsset(resume)} download="Eric-Zaleta-Unity-Developer-Resume.pdf">Resume</a>
          <span className={styles.navDivider} aria-hidden="true" />
          <a className={styles.navContact} href="#contact" onClick={() => setActiveNav("contact")}>Say hi <ArrowUpRight aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="home" className={styles.hero} aria-labelledby="portfolio-title">
          <AmbientVideo />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={`${styles.heroEyebrow} ${styles.blurIn}`}>Games / XR / Interactive experiences</p>
            <h1 id="portfolio-title" className={styles.nameReveal}>Eric Zaleta</h1>
            <p className={`${styles.role} ${styles.blurIn}`}>A <span key={roleIndex} className={styles.roleWord}>{["Unity developer", "game developer", "XR designer"][roleIndex]}</span> bringing ideas to life.</p>
            <p className={`${styles.heroDescription} ${styles.blurIn}`}>Building playful, immersive digital experiences, from the first idea to the final interaction.</p>
            <div className={`${styles.heroActions} ${styles.blurIn}`}><a className={styles.solidButton} href="#projects">See works <ArrowDown aria-hidden="true" /></a><a className={styles.outlineButton} href="#contact">Reach out <ArrowUpRight aria-hidden="true" /></a></div>
          </div>
          <a href="#projects" className={styles.scrollHint}><span>Scroll</span><span className={styles.scrollTrack}><span /></span></a>
        </section>

        <section id="projects" className={`${styles.container} ${styles.work}`} aria-label="Selected work">
          <SectionHeading eyebrow="Selected work" title="Featured" italic="projects" description="A selection of games and interactive experiences, from concept to launch." action={{ href: "#project-index", label: "View all work" }} />
          {!loading && !error && featuredCards.length > 0 && <div className={styles.bento}>{featuredCards.map((project, index) => <motion.button key={project.url ?? project.name} type="button" data-featured-card data-reveal className={styles.projectCard} initial={reducedMotion ? false : { opacity: 0.6, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }} onClick={event => { chooseProject(project, event); document.getElementById("selected-project")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }) }}>
            <img {...projectImage(project)} alt="" loading="lazy" onError={handleImageError} />
            <span className={styles.halftone} aria-hidden="true" /><span className={styles.cardCaption}><span>{project.platform && project.platform !== "Unknown" ? project.platform : "Itch.io"}</span><strong>{project.name}</strong></span><span className={styles.cardHover}><span>View <span aria-hidden="true">—</span> <em>{project.name}</em> <ArrowUpRight aria-hidden="true" /></span></span>
          </motion.button>)}</div>}

          {!loading && !error && featured.length > 0 && <div className={styles.projectChoices} aria-label="Featured project selection">{featured.map(project => <button type="button" key={project.url} aria-pressed={selected?.url === project.url} aria-controls="selected-project" data-project-choice onClick={event => chooseProject(project, event)}>{project.name}</button>)}</div>}
          {loading ? <div role="status" aria-busy="true" data-project-skeleton><span className="sr-only">Loading projects from Itch.io...</span><div aria-hidden="true"><Skeleton className={`${styles.projectFrame} ${styles.skeleton} ${styles.skeletonImage}`} /><div className={styles.caption}><div><Skeleton className={`${styles.skeleton} ${styles.skeletonTitle}`} /><Skeleton className={`${styles.skeleton} ${styles.skeletonLine} ${styles.skeletonShort}`} /></div><div><Skeleton className={`${styles.skeleton} ${styles.skeletonLine}`} /><Skeleton className={`${styles.skeleton} ${styles.skeletonLine}`} /><Skeleton className={`${styles.skeleton} ${styles.skeletonLine} ${styles.skeletonShort}`} /></div></div><div className={styles.detail}><Skeleton className={`${styles.skeleton} ${styles.skeletonImage}`} /><Skeleton className={`${styles.skeleton} ${styles.skeletonLine}`} /></div></div></div>
            : error ? <div className={styles.status} role="status"><h3>Projects are temporarily unavailable</h3><p>Please try again later, <a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer">visit Itch.io</a>, or contact me for project details.</p></div>
            : selected ? <article id="selected-project" className={styles.selectedProject}>
              <div className={styles.projectFrame} data-media={selectedArt ? "gameplay" : "cover"} style={selectedArt ? { maxWidth: selectedArt.width } : undefined}><img ref={mainImage} data-project-image {...selectedImage} alt={selectedImage?.alt} onLoad={revealImage} onError={handleImageError} /></div>
              <div className={styles.caption} aria-live="polite" aria-atomic="true"><div><p className={styles.label}>Project spotlight</p><h3 data-project-title>{selected.name}</h3><p>{selected.platform && selected.platform !== "Unknown" ? selected.platform : "Itch.io"} <span aria-hidden="true">/</span> {selected.metrics.published}</p></div><div><p>{selected.description}</p>{selected.url && <a data-project-link href={selected.url} target="_blank" rel="noopener noreferrer">Explore {selected.name} <ArrowUpRight aria-hidden="true" /></a>}</div></div>
              {selectedArt && <figure className={styles.detail}><img {...responsiveImage(selectedArt.detail, selectedArt.detailWidth, selectedArt.detailHeight, "(max-width: 520px) 60vw, (max-width: 800px) 35vw, 400px")} alt={selectedArt.detailAlt} loading="lazy" /><figcaption>Another moment in {selected.name}.</figcaption></figure>}
            </article> : <p className={styles.status} role="status">{searchTerm ? "No projects match your search. Try another title or clear the search." : "No published projects yet. Published games from Itch.io will appear here."}</p>}
          <div id="project-index" className={styles.indexHeader}><h3>Project index</h3><div className={styles.search}><label htmlFor="project-search">Find a project</label><input id="project-search" type="search" placeholder="Title or description" value={searchTerm} disabled={loading} onChange={event => { pendingAnimation.current = false; setSearchTerm(event.target.value) }} />{searchTerm && <button type="button" onClick={() => setSearchTerm("")}>Clear search</button>}</div></div>
          {loading ? <ul className={styles.projectIndex} aria-hidden="true" data-index-skeleton>{Array.from({ length: 6 }, (_, index) => <li key={index}><Skeleton className={`${styles.skeleton} ${styles.skeletonRow}`} /></li>)}</ul> : !error && <ul className={styles.projectIndex} aria-label="All published projects">{projects.map(project => <li key={project.url ?? project.name}><button type="button" data-project-choice aria-pressed={selected === project} aria-controls="selected-project" onClick={event => chooseProject(project, event)}><span>{project.name}</span><span className={styles.platform}>{project.platform && project.platform !== "Unknown" ? project.platform : "Itch.io"}</span></button>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on Itch.io`}><ArrowUpRight aria-hidden="true" /></a>}</li>)}</ul>}
        </section>

        <section id="journal" className={`${styles.container} ${styles.journal}`} aria-label="Project archive">
          <SectionHeading eyebrow="Journal" title="From the" italic="archive" description="A few entries from the game development archive." action={{ href: "https://grimoire-games.itch.io", label: "View all" }} />
          {!loading && !error && projects.length > 0 ? <div className={styles.journalList}>{projects.slice(0, 4).map(project => <a data-journal-item className={styles.journalItem} key={project.url ?? project.name} href={project.url || "#project-index"} target={project.url ? "_blank" : undefined} rel={project.url ? "noopener noreferrer" : undefined}><img {...projectImage(project)} alt="" loading="lazy" onError={handleImageError} /><span className={styles.journalTitle}><strong>{project.name}</strong><small>{project.platform && project.platform !== "Unknown" ? project.platform : "Itch.io"} project</small></span><span className={styles.journalDate}>{project.metrics.published}</span><ArrowUpRight aria-hidden="true" /></a>)}</div> : <p className={styles.sectionIntro}>{loading ? "Loading project releases..." : "Explore the project index above for more work."}</p>}
        </section>

        <section id="explorations" ref={exploreSection} className={styles.explorations} aria-labelledby="explorations-title">
          <div ref={exploreContent} className={styles.exploreContent}><p className={styles.eyebrow}><span />Explorations</p><h2 id="explorations-title">Visual <em>playground</em></h2><p>A closer look at the worlds, details and interactions behind the work.</p><a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer" className={styles.outlineButton}>Explore on Itch.io <ArrowUpRight aria-hidden="true" /></a></div>
          <div className={styles.galleryLayer}>{[0, 1].map(column => <div className={column === 0 ? styles.galleryColumnLeft : styles.galleryColumnRight} key={column}>{gallery.filter((_, index) => index % 2 === column).map((image, index) => <button data-exploration-item key={`${image.src}-${index}`} type="button" onClick={() => openImage(image)} aria-label={`View ${image.alt}`}><img src={image.src} alt="" loading="lazy" onError={handleImageError} /></button>)}</div>)}</div>
          <dialog ref={dialog} className={styles.lightbox} onClose={() => setLightbox(null)} onClick={event => { if (event.target === event.currentTarget) closeImage() }} aria-label={lightbox ? `${lightbox.title} image` : "Project image"}><button type="button" onClick={closeImage} aria-label="Close image"><X aria-hidden="true" /></button>{lightbox && <figure><img src={lightbox.src} alt={lightbox.alt} onError={handleImageError} /><figcaption>{lightbox.title}</figcaption></figure>}</dialog>
        </section>

        <section id="about" className={`${styles.container} ${styles.about}`} aria-labelledby="about-title"><div><p className={styles.eyebrow}><span />About</p><h2 id="about-title">Game roots.<br /><em>Wider horizons.</em></h2></div><div><p>I studied game development. Since 2020, I&apos;ve been building with Unity across games, VR/AR and interactive applications.</p><p>My work connects gameplay mechanics, performance optimization and scalable systems. I&apos;m interested in what happens when those skills meet a different kind of brief.</p></div></section>
        <section className={`${styles.container} ${styles.stats}`} aria-label="Selected experience highlights"><div><strong>15<span>+</span></strong><p>Game developments led</p></div><div><strong>20<span>+</span></strong><p>Interactive apps developed</p></div><div><strong>13<span>+</span></strong><p>Award-winning projects</p></div></section>
        <section id="experience" className={`${styles.container} ${styles.experience}`} aria-labelledby="experience-title"><p className={styles.eyebrow}><span />The journey</p><h2 id="experience-title">Experience</h2><div>{experience.map(job => <article className={styles.job} key={job.studio} data-motion="row"><div><h3>{job.studio}</h3><p>{job.role}</p><p className={styles.dates}>{job.dates}</p></div><p>{job.highlights}</p></article>)}</div></section>
        <section id="skills" className={`${styles.container} ${styles.skills}`} aria-labelledby="skills-title"><div><p className={styles.eyebrow}><span />The toolkit</p><h2 id="skills-title">Tools of the <em>trade.</em></h2></div><dl>{skills.map(group => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(" · ")}</dd></div>)}</dl></section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title"><AmbientVideo inverted /><div className={styles.contactShade} aria-hidden="true" /><div className={styles.contactContent}><div className={styles.marqueeWindow} aria-hidden="true"><div ref={marquee} className={styles.marquee}>{Array.from({ length: 10 }, (_, index) => <span key={index}>BUILDING THE FUTURE <b>•</b> </span>)}</div></div><div className={styles.contactMain}><p className={styles.eyebrow}><span />Have a project in mind?</p><h2 id="contact-title">Let&apos;s build<br /><em>what&apos;s next.</em></h2><p>A game, an application, an experience.<br />Tell me what you&apos;re working on.</p><a className={styles.emailButton} href="mailto:ericzaleta@gmail.com">ericzaleta@gmail.com <ArrowUpRight aria-hidden="true" /></a></div><footer className={styles.footer}><p>Eric Zaleta © {new Date().getFullYear()}</p><div><a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://grimoire-games.itch.io" target="_blank" rel="noopener noreferrer">Itch.io</a><a href="tel:+524811124012">+52 481 112 4012</a><Link href="/game-designer">Game design archive</Link></div><p className={styles.availability}><span />Let&apos;s connect</p></footer></div></section>
      </main>
    </div></MotionConfig>
  )
}
