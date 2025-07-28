"use client"

import { Download, ExternalLink, Linkedin, Mail, Play, Phone, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { RoleSwitcher } from "@/components/role-switcher"
import { TableOfContents } from "@/components/table-of-contents"
import { ProgressIndicator } from "@/components/progress-indicator"
import { LanguageToggle } from "@/components/language-toggle"
import { useItchGames, Project } from "@/hooks/use-itch-games"

export default function GameDesignerPage() {
  const { convertToProjects, loading, searchTerm, setSearchTerm } = useItchGames()
  
  const tocItems = [
    { id: "about", title: "About Me", level: 1 },
    { id: "projects", title: "Featured Projects", level: 1 },
    { id: "experience", title: "Experience", level: 1 },
    { id: "skills", title: "Skills & Tools", level: 1 },
    { id: "contact", title: "Contact", level: 1 },
  ]

  // Only show Itch.io projects in featured section
  const itchProjects: Project[] = convertToProjects('designer').map(project => ({
    ...project,
    focus: project.focus || []
  }))

  // Show only Itch.io projects as featured
  const projects = itchProjects

  const experience = [
    {
      studio: "Creative Game Studio",
      role: "Senior Game Designer",
      dates: "2022 - Present",
      highlights: "Led design on narrative-driven indie titles, focusing on player experience and emotional engagement",
      current: true,
    },
    {
      studio: "Mobile Game Company",
      role: "Game Designer",
      dates: "2020 - 2022",
      highlights: "Designed progression systems and monetization strategies for casual mobile games",
      current: false,
    },
    {
      studio: "Game Jam Community",
      role: "Design Mentor",
      dates: "2019 - Present",
      highlights: "Mentored emerging designers and prototyped experimental gameplay mechanics",
      current: true,
    },
  ]

  const skillCategories = [
    {
      category: "Design Fundamentals",
      skills: ["Level Design", "Systems Design", "Game Balancing", "Prototyping"],
    },
    {
      category: "Player Experience",
      skills: ["UX/UI Design", "Player Psychology", "Accessibility", "Playtesting"],
    },
    {
      category: "Narrative & Content",
      skills: ["Narrative Design", "Dialogue Systems", "World Building", "Character Development"],
    },
    {
      category: "Technical Skills",
      skills: ["Unity", "Unreal Engine", "Figma", "Miro"],
    },
    {
      category: "Research & Analysis",
      skills: ["User Research", "Data Analysis", "A/B Testing", "Market Research"],
    },
    {
      category: "Collaboration",
      skills: ["Team Leadership", "Cross-functional", "Agile", "Documentation"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <ProgressIndicator />
      <Navigation />
      <RoleSwitcher />
      <TableOfContents items={tocItems} />
      <LanguageToggle />

      {/* Background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A970FF]/20 via-transparent to-[#7EE787]/10"></div>
        <div className="floating-particles"></div>
      </div>

      <div className="relative z-10 pt-20">
        <BreadcrumbNav />

        <main id="main-content">
          {/* Hero Section */}
          <section className="px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#A970FF] to-[#7EE787] bg-clip-text text-transparent animate-fade-in">
                Eric Zaleta — Game Designer
              </h1>
              <p className="text-xl md:text-2xl text-[#F4F4F5]/80 mb-8 animate-slide-up">
                Designing meaningful interactions, systems, and player experiences
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Button 
                  asChild
                  className="bg-[#A970FF] text-[#F4F4F5] hover:bg-[#A970FF]/90 px-8 py-4 text-lg h-auto focus:ring-2 focus:ring-[#A970FF] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                >
                  <a href="#projects" className="flex items-center">
                    <Play className="w-6 h-6 mr-3" />
                    View Projects
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#A970FF] text-[#A970FF] hover:bg-[#A970FF]/10 px-8 py-4 text-lg bg-transparent h-auto focus:ring-2 focus:ring-[#A970FF] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
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
              <h2 className="text-3xl font-bold mb-8 text-[#A970FF]">About Me</h2>
              <div className="bg-[#232329]/30 backdrop-blur-sm rounded-2xl p-8 border border-[#232329]">
                <p className="text-lg leading-relaxed text-[#F4F4F5]/90 mb-6">
                  I'm a game designer and Unity developer with over 6 years of experience leading teams and creating
                  engaging player experiences. My approach combines technical expertise with creative vision, having led
                  groups of 4-20 members through the development of 15+ video games across different genres.
                </p>
                <p className="text-lg leading-relaxed text-[#F4F4F5]/90">
                  I specialize in interactive design, user experience optimization, and creating systems that resonate
                  with players. Through my work at Grimoire Games and various enterprise projects, I've consistently
                  delivered award-winning experiences that balance innovation with user engagement, always focusing on
                  meaningful gameplay that connects with diverse audiences.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section id="projects" className="px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                <h2 className="text-3xl font-bold text-[#A970FF] mb-4 md:mb-0">Featured Projects</h2>
                <div className="relative">
                  <Search className="w-5 h-5 text-[#A970FF]/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#232329]/50 border border-[#232329] rounded-lg pl-10 pr-4 py-2 text-[#F4F4F5] placeholder-[#F4F4F5]/50 focus:border-[#A970FF]/50 focus:outline-none transition-colors w-full md:w-64"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {loading ? (
                  // Loading state
                  <div className="col-span-full text-center py-16">
                    <div className="animate-spin w-8 h-8 border-2 border-[#A970FF] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-[#F4F4F5]/60">Loading projects from Itch.io...</p>
                  </div>
                ) : projects.length === 0 ? (
                  // No projects state
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-xl text-[#F4F4F5]/60 mb-4">No games found</h3>
                    <p className="text-[#F4F4F5]/40">Published games from Itch.io will appear here</p>
                  </div>
                ) : (
                  // Projects grid
                  projects.map((project, index) => (
                    <article
                      key={index}
                      className="project-card bg-[#232329]/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#232329] hover:border-[#A970FF]/30 transition-all duration-500 group cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-[#A970FF]/10"
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
              <h2 className="text-3xl font-bold mb-12 text-[#A970FF]">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <article key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-4 h-4 bg-[#A970FF] rounded-full mt-2 group-hover:scale-125 transition-transform relative">
                      {exp.current && <div className="absolute inset-0 bg-[#A970FF] rounded-full animate-ping"></div>}
                    </div>
                    <div className="bg-[#232329]/30 backdrop-blur-sm rounded-xl p-6 border border-[#232329] flex-1 hover:border-[#A970FF]/30 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#F4F4F5]">{exp.studio}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[#A970FF] font-medium">{exp.dates}</span>
                          {exp.current && (
                            <span className="bg-[#A970FF]/20 text-[#A970FF] px-2 py-1 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-[#7EE787] font-medium mb-2">{exp.role}</p>
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
              <h2 className="text-3xl font-bold mb-12 text-[#A970FF]">Skills & Tools</h2>
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
              <h2 className="text-3xl font-bold mb-6 text-[#A970FF]">
                Let's Build Something Clever, Fun, and Playable
              </h2>
              <p className="text-xl text-[#F4F4F5]/80 mb-8 leading-relaxed">
                Ready to create meaningful player experiences? Let's collaborate and design something extraordinary
                together.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                  asChild
                  className="bg-[#A970FF] text-[#F4F4F5] hover:bg-[#A970FF]/90 px-8 py-4 text-lg h-auto focus:ring-2 focus:ring-[#A970FF] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                >
                  <a href="mailto:ericzaleta@gmail.com">
                    <Mail className="w-6 h-6 mr-3" />
                    ericzaleta@gmail.com
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#A970FF] text-[#A970FF] hover:bg-[#A970FF]/10 p-4 bg-transparent h-auto focus:ring-2 focus:ring-[#A970FF] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                  title="LinkedIn Profile"
                >
                  <a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#A970FF] text-[#A970FF] hover:bg-[#A970FF]/10 p-4 bg-transparent h-auto focus:ring-2 focus:ring-[#A970FF] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
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
          <div className="absolute top-4 left-4 bg-[#A970FF] text-[#F4F4F5] px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-[#F4F4F5] group-hover:text-[#A970FF] transition-colors">{project.name}</h3>
        <p className="text-[#F4F4F5]/70 mb-4 leading-relaxed">{project.description}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="bg-[#A970FF]/10 px-3 py-1 rounded-full">
              <span className="text-xs text-[#A970FF] font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.focus?.map((focus, focusIndex) => (
            <span
              key={focusIndex}
              className="px-3 py-1 bg-[#232329]/50 text-[#F4F4F5]/80 rounded-full text-sm border border-[#232329]"
            >
              {focus}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#A970FF]/80 text-sm font-medium">
            <ExternalLink className="w-4 h-4 mr-2 group-hover:text-[#A970FF] transition-colors" />
            <span className="group-hover:text-[#A970FF] transition-colors">Click to play on Itch.io</span>
          </div>
        </div>
      </div>
    </>
  )
}
