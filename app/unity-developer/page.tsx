import { ArrowLeft, Download, ExternalLink, Github, Linkedin, Mail, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnityDeveloperPage() {
  const projects = [
    {
      name: "VR Physics Playground",
      description: "Interactive VR environment with advanced physics simulation and haptic feedback systems.",
      tech: ["Unity", "VR", "Physics", "C#"],
      video: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Unity Editor Tools Suite",
      description: "Custom editor tools for level design automation and asset pipeline optimization.",
      tech: ["Unity", "Editor Tools", "Automation", "Pipeline"],
      video: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Multiplayer Combat System",
      description: "Real-time multiplayer combat with client-side prediction and server reconciliation.",
      tech: ["Unity", "Netcode", "Multiplayer", "Combat"],
      video: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Procedural World Generator",
      description: "Infinite terrain generation with biome blending and dynamic LOD optimization.",
      tech: ["Unity", "Procedural", "Terrain", "Optimization"],
      video: "/placeholder.svg?height=300&width=500",
    },
  ]

  const experience = [
    {
      studio: "Indie Game Studio",
      role: "Lead Unity Developer",
      dates: "2022 - Present",
      highlights: "Built core gameplay systems, VR integration, and custom editor tools",
    },
    {
      studio: "Tech Startup",
      role: "Unity Developer",
      dates: "2020 - 2022",
      highlights: "Developed AR applications and real-time multiplayer systems",
    },
    {
      studio: "Freelance",
      role: "Unity Consultant",
      dates: "2019 - 2020",
      highlights: "Performance optimization and technical architecture consulting",
    },
  ]

  const skills = [
    "Unity",
    "C#",
    "Shader Graph",
    "VR/AR",
    "WebGL",
    "Git",
    "AI/ML",
    "Multiplayer",
    "Clean Code",
    "Performance",
    "Editor Tools",
    "Physics",
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7EE787]/20 via-transparent to-[#A970FF]/10"></div>
        <div className="floating-particles"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <Link href="/" className="inline-flex items-center text-[#7EE787] hover:text-[#7EE787]/80 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent animate-fade-in">
              Eric Z. — Unity Developer
            </h1>
            <p className="text-xl md:text-2xl text-[#F4F4F5]/80 mb-8 animate-slide-up">
              Engineering immersive gameplay, systems & tools in Unity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 px-8 py-3 text-lg">
                <Play className="w-5 h-5 mr-2" />
                View Projects
              </Button>
              <Button
                variant="outline"
                className="border-[#7EE787] text-[#7EE787] hover:bg-[#7EE787]/10 px-8 py-3 text-lg bg-transparent"
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
            <h2 className="text-3xl font-bold mb-8 text-[#7EE787]">About Me</h2>
            <div className="bg-[#232329]/30 backdrop-blur-sm rounded-2xl p-8 border border-[#232329]">
              <p className="text-lg leading-relaxed text-[#F4F4F5]/90">
                I'm a passionate Unity developer with a deep love for creating immersive experiences that push the
                boundaries of interactive technology. My expertise spans from VR/AR applications to complex multiplayer
                systems, always focusing on clean architecture and performance optimization. I thrive on solving
                technical challenges and building tools that empower other developers. Whether it's crafting custom
                editor extensions, implementing advanced physics simulations, or optimizing rendering pipelines, I bring
                both technical precision and creative vision to every project.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#7EE787]">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-card bg-[#232329]/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#232329] hover:border-[#7EE787]/30 transition-all duration-500 group"
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
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-[#7EE787]/20 text-[#7EE787] rounded-full text-sm">
                          #{tech}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-[#7EE787] hover:bg-[#7EE787]/10 p-0">
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
            <h2 className="text-3xl font-bold mb-12 text-[#7EE787]">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-4 h-4 bg-[#7EE787] rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                  <div className="bg-[#232329]/30 backdrop-blur-sm rounded-xl p-6 border border-[#232329] flex-1 hover:border-[#7EE787]/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#F4F4F5]">{exp.studio}</h3>
                      <span className="text-[#7EE787] font-medium">{exp.dates}</span>
                    </div>
                    <p className="text-[#A970FF] font-medium mb-2">{exp.role}</p>
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
            <h2 className="text-3xl font-bold mb-12 text-[#7EE787]">Skills & Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-tag bg-[#232329]/30 backdrop-blur-sm rounded-xl p-4 text-center border border-[#232329] hover:border-[#7EE787]/50 hover:bg-[#7EE787]/5 transition-all duration-300 group"
                >
                  <span className="text-[#F4F4F5] group-hover:text-[#7EE787] transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#7EE787]">Let's Build Something Amazing</h2>
            <p className="text-xl text-[#F4F4F5]/80 mb-8">
              Ready to bring your next Unity project to life? Let's collaborate and create something extraordinary.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 px-6 py-3">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Button>
              <Button
                variant="outline"
                className="border-[#7EE787] text-[#7EE787] hover:bg-[#7EE787]/10 px-6 py-3 bg-transparent"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="border-[#7EE787] text-[#7EE787] hover:bg-[#7EE787]/10 px-6 py-3 bg-transparent"
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
