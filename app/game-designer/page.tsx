import { ArrowLeft, Download, ExternalLink, Github, Linkedin, Mail, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GameDesignerPage() {
  const projects = [
    {
      name: "Quantum Puzzle Mechanics",
      description:
        "Mind-bending puzzle system where players manipulate quantum states to solve multi-dimensional challenges.",
      focus: ["Puzzle Design", "Player Psychology", "Progressive Difficulty"],
      video: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Narrative Branching System",
      description: "Dynamic storytelling framework that adapts to player choices with meaningful consequences.",
      focus: ["Narrative Design", "Choice Architecture", "Player Agency"],
      video: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Cooperative Strategy Game",
      description: "Asymmetric multiplayer experience emphasizing communication and strategic planning.",
      focus: ["Systems Design", "Multiplayer Balance", "Social Dynamics"],
      video: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Accessibility-First Platformer",
      description: "Inclusive game design with customizable difficulty and multiple input methods.",
      focus: ["UX Design", "Accessibility", "Inclusive Design"],
      video: "/placeholder.svg?height=300&width=500",
    },
  ]

  const experience = [
    {
      studio: "Creative Game Studio",
      role: "Senior Game Designer",
      dates: "2022 - Present",
      highlights: "Led design on narrative-driven indie titles, focusing on player experience and emotional engagement",
    },
    {
      studio: "Mobile Game Company",
      role: "Game Designer",
      dates: "2020 - 2022",
      highlights: "Designed progression systems and monetization strategies for casual mobile games",
    },
    {
      studio: "Game Jam Community",
      role: "Design Mentor",
      dates: "2019 - Present",
      highlights: "Mentored emerging designers and prototyped experimental gameplay mechanics",
    },
  ]

  const skills = [
    "Level Design",
    "Narrative Systems",
    "Puzzle Design",
    "UX/UI",
    "Game Balancing",
    "Prototyping",
    "Player Psychology",
    "Systems Thinking",
    "Accessibility",
    "Playtesting",
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A970FF]/20 via-transparent to-[#7EE787]/10"></div>
        <div className="floating-particles"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <Link href="/" className="inline-flex items-center text-[#A970FF] hover:text-[#A970FF]/80 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#A970FF] to-[#7EE787] bg-clip-text text-transparent animate-fade-in">
              Eric Z. — Game Designer
            </h1>
            <p className="text-xl md:text-2xl text-[#F4F4F5]/80 mb-8 animate-slide-up">
              Designing meaningful interactions, systems, and player experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button className="bg-[#A970FF] text-[#F4F4F5] hover:bg-[#A970FF]/90 px-8 py-3 text-lg">
                <Play className="w-5 h-5 mr-2" />
                View Projects
              </Button>
              <Button
                variant="outline"
                className="border-[#A970FF] text-[#A970FF] hover:bg-[#A970FF]/10 px-8 py-3 text-lg bg-transparent"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#A970FF]">About Me</h2>
            <div className="bg-[#232329]/30 backdrop-blur-sm rounded-2xl p-8 border border-[#232329]">
              <p className="text-lg leading-relaxed text-[#F4F4F5]/90">
                I'm a game designer passionate about crafting experiences that resonate deeply with players. My approach
                combines analytical thinking with creative intuition, focusing on the psychology behind player
                motivation and engagement. I specialize in systems design, narrative architecture, and creating
                inclusive experiences that welcome players of all backgrounds and abilities. Every design decision I
                make is driven by empathy for the player and a commitment to meaningful, memorable gameplay that goes
                beyond entertainment.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#A970FF]">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-card bg-[#232329]/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#232329] hover:border-[#A970FF]/30 transition-all duration-500 group"
                >
                  <div className="aspect-video bg-[#232329]/50 relative overflow-hidden">
                    <img
                      src={project.video || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-[#F4F4F5]">{project.name}</h3>
                    <p className="text-[#F4F4F5]/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.focus.map((focus, focusIndex) => (
                        <span
                          key={focusIndex}
                          className="px-3 py-1 bg-[#A970FF]/20 text-[#A970FF] rounded-full text-sm"
                        >
                          #{focus}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-[#A970FF] hover:bg-[#A970FF]/10 p-0">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#A970FF]">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-4 h-4 bg-[#A970FF] rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                  <div className="bg-[#232329]/30 backdrop-blur-sm rounded-xl p-6 border border-[#232329] flex-1 hover:border-[#A970FF]/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#F4F4F5]">{exp.studio}</h3>
                      <span className="text-[#A970FF] font-medium">{exp.dates}</span>
                    </div>
                    <p className="text-[#7EE787] font-medium mb-2">{exp.role}</p>
                    <p className="text-[#F4F4F5]/70">{exp.highlights}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Tools */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#A970FF]">Skills & Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-badge bg-[#232329]/50 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-[#232329] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A970FF]/5 to-[#7EE787]/5 opacity-50"></div>
                  <span className="relative text-[#F4F4F5] font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#A970FF]">Let's Build Something Clever, Fun, and Playable</h2>
            <p className="text-xl text-[#F4F4F5]/80 mb-8">
              Ready to create meaningful player experiences? Let's collaborate and design something extraordinary
              together.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="bg-[#A970FF] text-[#F4F4F5] hover:bg-[#A970FF]/90 px-6 py-3">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Button>
              <Button
                variant="outline"
                className="border-[#A970FF] text-[#A970FF] hover:bg-[#A970FF]/10 px-6 py-3 bg-transparent"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="border-[#A970FF] text-[#A970FF] hover:bg-[#A970FF]/10 px-6 py-3 bg-transparent"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-[#232329]">
          <div className="max-w-4xl mx-auto text-center text-[#F4F4F5]/60">
            <p>Eric Z. © {new Date().getFullYear()} • Made with love and code</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
