"use client"

import { Download, ExternalLink, Linkedin, Mail, Play, Phone, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { RoleSwitcher } from "@/components/role-switcher"
import { TableOfContents } from "@/components/table-of-contents"
import { ProgressIndicator } from "@/components/progress-indicator"
import { useItchGames, Project } from "@/hooks/use-itch-games"

export default function UnityDeveloperPage() {
  const { convertToProjects, loading, searchTerm, setSearchTerm } = useItchGames()
  
  const tocItems = [
    { id: "about", title: "About Me", level: 1 },
    { id: "projects", title: "Featured Projects", level: 1 },
    { id: "experience", title: "Experience", level: 1 },
    { id: "skills", title: "Skills & Tools", level: 1 },
    { id: "contact", title: "Contact", level: 1 },
  ]

  // Only show Itch.io projects in featured section
  const itchProjects: Project[] = convertToProjects('unity').map(project => ({
    ...project,
    tech: project.tech || []
  }))

  // Show only Itch.io projects as featured
  const projects = itchProjects

  const experience = [
    {
      studio: "Inmersys",
      role: "XR Designer",
      dates: "June 2024 - June 2025",
      highlights: "Created immersive 3D environments and VR prototypes, improving client delivery timelines by 25%",
      current: true,
    },
    {
      studio: "FUSE People & Technology",
      role: "Unity Developer",
      dates: "August 2022 - June 2025",
      highlights:
        "Developed 20+ interactive apps, improved player engagement by 48.7% and reduced crash rates by 74.3%",
      current: true,
    },
    {
      studio: "Grimoire Games",
      role: "Unity Game Developer",
      dates: "November 2020 - Present",
      highlights: "Led teams through 15+ game developments, created 13+ award-winning projects across various genres",
      current: true,
    },
  ]

  const skillCategories = [
    {
      category: "Core Technologies",
      skills: ["Unity", "C#", ".NET", "Visual Studio"],
    },
    {
      category: "XR Development",
      skills: ["VR/AR", "OpenXR", "Oculus SDK", "HoloLens"],
    },
    {
      category: "Multiplayer & Networking",
      skills: ["Multiplayer", "Photon", "Mirror", "WebRTC"],
    },
    {
      category: "Integration & APIs",
      skills: ["APIs", "JSON", "REST", "WebGL"],
    },
    {
      category: "Graphics & Rendering",
      skills: ["Shaders", "HLSL", "URP", "HDRP"],
    },
    {
      category: "Leadership & Process",
      skills: ["Team Leadership", "Agile", "Code Review", "Mentoring"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <ProgressIndicator />
      <Navigation />
      <RoleSwitcher />
      <TableOfContents items={tocItems} />

      {/* Background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7EE787]/20 via-transparent to-[#A970FF]/10"></div>
        <div className="floating-particles"></div>
      </div>

      <div className="relative z-10 pt-20">
        <BreadcrumbNav />

        <main id="main-content">
          {/* Hero Section */}
          <section className="px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent animate-fade-in">
                Eric Zaleta — Unity Developer
              </h1>
              <p className="text-xl md:text-2xl text-[#F4F4F5]/80 mb-8 animate-slide-up">
                Engineering immersive gameplay, XR experiences & interactive applications
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Button 
                  asChild
                  className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 px-8 py-4 text-lg h-auto focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                >
                  <a href="#projects" className="flex items-center">
                    <Play className="w-6 h-6 mr-3" />
                    View Projects
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#7EE787] text-[#7EE787] hover:bg-[#7EE787]/10 px-8 py-4 text-lg bg-transparent h-auto focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                  asChild
                >
                  <a
                    href="/Portfolio/Eric-Zaleta-Unity-Developer-Resume.pdf"
                    download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-6 h-6 mr-3" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-[#7EE787]">About Me</h2>
              <div className="bg-[#232329]/30 backdrop-blur-sm rounded-2xl p-8 border border-[#232329]">
                <p className="text-lg leading-relaxed text-[#F4F4F5]/90 mb-6">
                  I'm a passionate Unity developer with over 6 years of experience creating immersive experiences that
                  push the boundaries of interactive technology. My expertise spans from VR/AR applications to
                  multiplayer systems and interactive enterprise applications.
                </p>
                <p className="text-lg leading-relaxed text-[#F4F4F5]/90">
                  I've led teams of 4-20 members through the development of 15+ video games and created over 20
                  interactive apps using cutting-edge technologies. Whether it's crafting XR training modules,
                  implementing AI systems, or optimizing performance pipelines, I bring both technical precision and
                  creative vision to every project.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section id="projects" className="px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                <h2 className="text-3xl font-bold text-[#7EE787] mb-4 md:mb-0">Featured Projects</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7EE787]/60" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#232329]/50 border border-[#7EE787]/30 rounded-lg text-[#F4F4F5] placeholder-[#F4F4F5]/50 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {loading ? (
                  // Loading state
                  <div className="col-span-full text-center py-16">
                    <div className="animate-spin w-8 h-8 border-2 border-[#7EE787] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-[#F4F4F5]/60">Loading projects from Itch.io...</p>
                  </div>
                ) : projects.length === 0 ? (
                  // No projects state
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-xl text-[#F4F4F5]/60 mb-4">No games found</h3>
                    <p className="text-[#F4F4F5]/40">Published games from Itch.io will appear here</p>
                  </div>
                ) : (
                  projects.map((project, index) => (
                    <article
                      key={index}
                      className="project-card bg-[#232329]/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#232329] hover:border-[#7EE787]/30 transition-all duration-500 group cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-[#7EE787]/10"
                      onClick={() => {
                        if (project.url) {
                          window.open(project.url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (project.url) {
                            window.open(project.url, '_blank', 'noopener,noreferrer');
                          }
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Play ${project.name} on Itch.io`}
                    >
                      <ProjectContent project={project} />
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          <section id="experience" className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-[#7EE787]">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <article key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-4 h-4 bg-[#7EE787] rounded-full mt-2 group-hover:scale-125 transition-transform relative">
                      {exp.current && <div className="absolute inset-0 bg-[#7EE787] rounded-full animate-ping"></div>}
                    </div>
                    <div className="bg-[#232329]/30 backdrop-blur-sm rounded-xl p-6 border border-[#232329] flex-1 hover:border-[#7EE787]/30 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#F4F4F5]">{exp.studio}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[#7EE787] font-medium">{exp.dates}</span>
                          {exp.current && (
                            <span className="bg-[#7EE787]/20 text-[#7EE787] px-2 py-1 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-[#A970FF] font-medium mb-2">{exp.role}</p>
                      <p className="text-[#F4F4F5]/70 leading-relaxed">{exp.highlights}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Skills & Tools */}
          <section id="skills" className="px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-[#7EE787]">Skills & Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category, index) => (
                  <div key={index} className="bg-[#232329]/30 backdrop-blur-sm rounded-xl p-6 border border-[#232329]">
                    <h3 className="text-lg font-semibold text-[#F4F4F5] mb-4">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="skill-badge bg-[#232329]/50 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-[#232329] relative overflow-hidden text-sm text-[#F4F4F5]/90"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-[#7EE787]">Let's Build Something Amazing</h2>
              <p className="text-xl text-[#F4F4F5]/80 mb-8 leading-relaxed">
                Ready to bring your next Unity project to life? Let's collaborate and create something extraordinary.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                  asChild
                  className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 px-8 py-4 text-lg h-auto focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                >
                  <a href="mailto:ericzaleta@gmail.com">
                    <Mail className="w-6 h-6 mr-3" />
                    ericzaleta@gmail.com
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#7EE787] text-[#7EE787] hover:bg-[#7EE787]/10 p-4 bg-transparent h-auto focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                  title="LinkedIn Profile"
                >
                  <a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#7EE787] text-[#7EE787] hover:bg-[#7EE787]/10 p-4 bg-transparent h-auto focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                  title="Call +52 481 112 4012"
                >
                  <a href="tel:+524811124012">
                    <Phone className="w-6 h-6" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-[#232329]">
          <div className="max-w-4xl mx-auto text-center text-[#F4F4F5]/60">
            <p>Eric Zaleta © {new Date().getFullYear()} • Crafted with passion and precision</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function ProjectContent({ project }: { project: Project }) {
  return (
    <>
      <div className="aspect-video bg-[#232329]/50 relative overflow-hidden">
        <img
          src={project.video || "/placeholder.svg"}
          alt={`${project.name} project screenshot`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 to-transparent"></div>
        {project.featured && (
          <div className="absolute top-4 left-4 bg-[#7EE787] text-[#0e0e10] px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-[#F4F4F5] group-hover:text-[#7EE787] transition-colors">{project.name}</h3>
        <p className="text-[#F4F4F5]/70 mb-4 leading-relaxed">{project.description}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="bg-[#7EE787]/10 px-3 py-1 rounded-full">
              <span className="text-xs text-[#7EE787] font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-[#232329]/50 text-[#F4F4F5]/80 rounded-full text-sm border border-[#232329]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#7EE787]/80 text-sm font-medium">
            <ExternalLink className="w-4 h-4 mr-2 group-hover:text-[#7EE787] transition-colors" />
            <span className="group-hover:text-[#7EE787] transition-colors">Click to play on Itch.io</span>
          </div>
        </div>
      </div>
    </>
  )
}
