"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Mail,
  Phone,
  Linkedin,
  Download,
  ExternalLink,
  Award,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Briefcase,
  Palette,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"

export default function GameDesignerPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const skills = {
    "Design Principles": ["Game Mechanics", "Level Design", "User Experience", "Player Psychology"],
    "Design Tools": ["Figma", "Adobe Creative Suite", "Miro", "Notion", "Trello"],
    Prototyping: ["Paper Prototyping", "Digital Mockups", "Interactive Prototypes", "Playtesting"],
    "Analytics & Research": ["Player Analytics", "A/B Testing", "User Research", "Data Analysis"],
    "Game Genres": ["Educational Games", "VR Experiences", "Mobile Games", "Serious Games"],
    Collaboration: ["Cross-functional Teams", "Agile/Scrum", "Design Documentation", "Stakeholder Management"],
  }

  const projects = [
    {
      title: "VR Learning Adventure",
      company: "EdTech Innovation",
      description:
        "Designed an immersive VR educational experience that increased student engagement by 80% and improved learning retention by 60%.",
      role: "Lead Game Designer",
      metrics: "80% engagement increase, 60% retention improvement",
      featured: true,
      status: "Live",
    },
    {
      title: "Emplayer - Gamified Workplace",
      company: "HR Tech Startup",
      description:
        "Created a comprehensive gamification system for employee engagement, featuring achievement systems, leaderboards, and social challenges.",
      role: "UX/Game Designer",
      metrics: "85% employee participation, 40% productivity boost",
      featured: true,
      status: "Production",
    },
    {
      title: "Mindful Moments",
      company: "Wellness App",
      description:
        "Designed a meditation and mindfulness game that combines relaxation techniques with gentle gameplay mechanics.",
      role: "Game Designer",
      metrics: "4.8★ rating, 500K+ downloads",
      featured: true,
      status: "Published",
    },
    {
      title: "STEM Quest Series",
      company: "Educational Publisher",
      description:
        "Developed a series of science-based puzzle games for middle school students, improving STEM test scores by 25%.",
      role: "Educational Game Designer",
      metrics: "25% test score improvement, 100K+ students",
      featured: false,
      status: "Production",
    },
    {
      title: "Corporate Training Simulator",
      company: "Fortune 500 Client",
      description:
        "Designed interactive training scenarios for customer service representatives, reducing training time by 35%.",
      role: "Serious Game Designer",
      metrics: "35% training time reduction, 95% completion rate",
      featured: false,
      status: "Deployed",
    },
  ]

  const experience = [
    {
      title: "Senior Game Designer",
      company: "Interactive Learning Solutions",
      period: "2022 - Present",
      location: "Remote",
      description:
        "Leading game design for educational and training applications, focusing on engagement mechanics and learning outcomes.",
      achievements: [
        "Designed 12 award-winning educational games",
        "Improved average user engagement by 65%",
        "Led design team of 4 designers and researchers",
      ],
    },
    {
      title: "UX/Game Designer",
      company: "Digital Playground Studios",
      period: "2020 - 2022",
      location: "Austin, TX",
      description:
        "Designed user experiences and game mechanics for mobile and web-based games, with focus on player retention and monetization.",
      achievements: [
        "Increased player retention by 45% across 6 titles",
        "Designed successful F2P monetization systems",
        "Conducted 50+ user research sessions",
      ],
    },
    {
      title: "Junior Game Designer",
      company: "Indie Game Collective",
      period: "2018 - 2020",
      location: "San Diego, CA",
      description:
        "Started career designing game mechanics and levels for indie games, learning fundamental design principles and player psychology.",
      achievements: [
        "Contributed to 8 published indie games",
        "Developed expertise in player psychology",
        "Built strong foundation in design thinking",
      ],
    },
  ]

  const designPhilosophy = [
    {
      title: "Player-Centered Design",
      description: "Every design decision starts with understanding the player's needs, motivations, and context.",
      icon: Users,
    },
    {
      title: "Meaningful Engagement",
      description: "Creating experiences that are not just fun, but purposeful and emotionally resonant.",
      icon: TrendingUp,
    },
    {
      title: "Iterative Excellence",
      description: "Continuous testing, learning, and refinement to achieve the best possible player experience.",
      icon: Award,
    },
    {
      title: "Inclusive Design",
      description: "Designing games that are accessible and enjoyable for diverse audiences and abilities.",
      icon: Palette,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <Navigation />
      <LanguageToggle />

      <main id="main-content" className="pt-20">
        {/* Header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#A970FF]/5 via-transparent to-[#7EE787]/5" />
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" asChild className="text-[#F4F4F5]/70 hover:text-[#A970FF]">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-[#A970FF] to-[#7EE787] bg-clip-text text-transparent">
                    Game Designer
                  </span>
                </h1>
                <Badge variant="outline" className="border-[#A970FF]/30 text-[#A970FF] bg-[#A970FF]/10">
                  Available for Projects
                </Badge>
              </div>

              <p className="text-xl text-[#F4F4F5]/80 max-w-3xl">
                Passionate about creating meaningful and engaging interactive experiences. Specialized in educational
                games, user experience design, and player psychology.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#A970FF] text-[#0e0e10] hover:bg-[#A970FF]/90" asChild>
                  <a href="mailto:ericzaleta@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    ericzaleta@gmail.com
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent"
                  asChild
                >
                  <a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent"
                  asChild
                >
                  <a href="tel:+1234567890">
                    <Phone className="w-4 h-4 mr-2" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#A970FF]/30 text-[#A970FF] hover:bg-[#A970FF]/10 bg-transparent"
                  asChild
                >
                  <a
                    href="/Eric-Zaleta-Unity-Developer-Resume.pdf"
                    download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#F4F4F5] mb-12">Design Philosophy</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designPhilosophy.map((principle, index) => {
                const Icon = principle.icon
                return (
                  <Card
                    key={index}
                    className="bg-[#1a1a1f] border-[#232329] hover:border-[#A970FF]/30 transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="p-3 rounded-full bg-[#A970FF]/10 w-fit mx-auto">
                        <Icon className="w-6 h-6 text-[#A970FF]" />
                      </div>
                      <h3 className="font-bold text-[#F4F4F5]">{principle.title}</h3>
                      <p className="text-sm text-[#F4F4F5]/70">{principle.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 bg-[#1a1a1f]/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-[#F4F4F5]">Featured Design Projects</h2>
              <Badge variant="outline" className="border-[#A970FF]/30 text-[#A970FF]">
                {projects.filter((p) => p.featured).length} Featured
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {projects
                .filter((project) => project.featured)
                .map((project, index) => (
                  <Card
                    key={index}
                    className="bg-[#1a1a1f] border-[#232329] hover:border-[#A970FF]/30 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-[#F4F4F5] text-xl">{project.title}</CardTitle>
                          <p className="text-[#A970FF] text-sm font-medium">{project.company}</p>
                          <p className="text-[#F4F4F5]/60 text-sm">{project.role}</p>
                        </div>
                        <Badge variant="outline" className="border-[#A970FF]/30 text-[#A970FF] bg-[#A970FF]/10">
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-[#F4F4F5]/80">{project.description}</p>

                      <div className="flex items-center gap-2 text-sm text-[#A970FF]">
                        <TrendingUp className="w-4 h-4" />
                        {project.metrics}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent">
                View All Design Projects ({projects.length})
              </Button>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#F4F4F5] mb-12">Design Experience</h2>

            <div className="space-y-8">
              {experience.map((job, index) => (
                <Card key={index} className="bg-[#1a1a1f] border-[#232329]">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-[#F4F4F5]">{job.title}</h3>
                          <div className="flex items-center gap-4 text-[#F4F4F5]/70">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <span className="text-[#A970FF] font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{job.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[#F4F4F5]/80">{job.description}</p>

                        <div className="space-y-2">
                          <h4 className="font-medium text-[#F4F4F5]">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {job.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-[#F4F4F5]/70">
                                <Award className="w-4 h-4 text-[#A970FF] mt-0.5 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Tools */}
        <section className="py-16 bg-[#1a1a1f]/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#F4F4F5] mb-12">Design Skills & Tools</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <Card key={index} className="bg-[#1a1a1f] border-[#232329]">
                  <CardHeader>
                    <CardTitle className="text-[#A970FF] text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="bg-[#232329] text-[#F4F4F5]/80 hover:bg-[#A970FF]/20 hover:text-[#A970FF] transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-[#A970FF]/10 to-[#7EE787]/10">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl font-bold text-[#F4F4F5]">Let's Create Engaging Experiences</h2>
            <p className="text-xl text-[#F4F4F5]/80">
              Ready to design games that captivate, educate, and inspire? Let's collaborate on your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#A970FF] text-[#0e0e10] hover:bg-[#A970FF]/90" asChild>
                <a href="mailto:ericzaleta@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Discuss Your Project
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent"
                asChild
              >
                <Link href="/unity-developer">
                  View Development Portfolio
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
