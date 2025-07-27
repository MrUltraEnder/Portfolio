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
  TrendingUp,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"

export default function UnityDeveloperPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const skills = {
    "Programming Languages": ["C#", "JavaScript", "Python", "SQL"],
    "Game Engines & Frameworks": ["Unity 3D", "Unity 2D", "Unreal Engine", "WebGL"],
    "VR/AR Development": ["Oculus SDK", "OpenXR", "ARCore", "ARKit", "Mixed Reality Toolkit"],
    "Development Tools": ["Visual Studio", "Git", "Perforce", "Jenkins", "Docker"],
    Platforms: ["PC", "Mobile (iOS/Android)", "VR Headsets", "Web", "Console"],
    Specializations: ["Performance Optimization", "Multiplayer Systems", "AI Implementation", "Shader Programming"],
  }

  const projects = [
    {
      title: "VR Training Simulator",
      company: "Enterprise Client",
      description:
        "Developed an immersive VR training platform for industrial safety protocols, reducing training time by 40% and improving retention rates by 65%.",
      technologies: ["Unity 3D", "Oculus SDK", "C#", "Multiplayer"],
      metrics: "500+ users trained, 40% time reduction",
      featured: true,
      status: "Production",
    },
    {
      title: "AR Visualization Tool",
      company: "Manufacturing Corp",
      description:
        "Created an AR application for visualizing complex machinery components, enabling remote assistance and reducing on-site visits by 30%.",
      technologies: ["Unity", "ARCore", "ARKit", "Cloud Anchors"],
      metrics: "30% reduction in site visits",
      featured: true,
      status: "Production",
    },
    {
      title: "Emplayer - Employee Engagement Platform",
      company: "Startup Project",
      description:
        "Led development of a gamified employee engagement platform with real-time analytics, achievement systems, and social features.",
      technologies: ["Unity", "C#", "Firebase", "Analytics"],
      metrics: "10K+ active users, 85% engagement rate",
      featured: true,
      status: "Live",
    },
    {
      title: "Educational Game Suite",
      company: "EdTech Startup",
      description:
        "Developed a series of educational games for K-12 students, improving learning outcomes by 25% across participating schools.",
      technologies: ["Unity 2D", "C#", "Analytics", "Cloud Save"],
      metrics: "50K+ students, 25% improvement in outcomes",
      featured: false,
      status: "Production",
    },
    {
      title: "Multiplayer Racing Game",
      company: "Indie Development",
      description:
        "Built a cross-platform multiplayer racing game with real-time networking and custom physics systems.",
      technologies: ["Unity", "Photon", "Custom Physics", "Cross-platform"],
      metrics: "100K+ downloads, 4.5★ rating",
      featured: false,
      status: "Published",
    },
  ]

  const experience = [
    {
      title: "Senior Unity Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      location: "Remote",
      description:
        "Leading VR/AR development projects for enterprise clients, managing a team of 5 developers, and architecting scalable Unity solutions.",
      achievements: [
        "Delivered 8 major VR training applications",
        "Reduced development time by 35% through optimization",
        "Mentored 3 junior developers to senior level",
      ],
    },
    {
      title: "Unity Developer",
      company: "GameStudio Inc",
      period: "2020 - 2022",
      location: "San Francisco, CA",
      description:
        "Developed mobile and PC games using Unity, implemented multiplayer systems, and optimized performance for various platforms.",
      achievements: [
        "Shipped 5 successful mobile games",
        "Implemented custom networking solutions",
        "Achieved 99.9% crash-free rate across all projects",
      ],
    },
    {
      title: "Junior Game Developer",
      company: "Indie Collective",
      period: "2018 - 2020",
      location: "Los Angeles, CA",
      description:
        "Started career developing 2D and 3D games, learning Unity fundamentals and game development best practices.",
      achievements: [
        "Contributed to 10+ game projects",
        "Learned advanced C# and Unity patterns",
        "Built strong foundation in game development",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <Navigation />
      <LanguageToggle />

      <main id="main-content" className="pt-20">
        {/* Header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7EE787]/5 via-transparent to-[#A970FF]/5" />
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" asChild className="text-[#F4F4F5]/70 hover:text-[#7EE787]">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent">
                    Unity Developer
                  </span>
                </h1>
                <Badge variant="outline" className="border-[#7EE787]/30 text-[#7EE787] bg-[#7EE787]/10">
                  Currently Available
                </Badge>
              </div>

              <p className="text-xl text-[#F4F4F5]/80 max-w-3xl">
                Specialized in creating immersive VR/AR experiences and high-performance Unity applications. 6+ years of
                experience delivering enterprise solutions and award-winning games.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90" asChild>
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
                  className="border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent"
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

        {/* Featured Projects */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-[#F4F4F5]">Featured Projects</h2>
              <Badge variant="outline" className="border-[#7EE787]/30 text-[#7EE787]">
                {projects.filter((p) => p.featured).length} Featured
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {projects
                .filter((project) => project.featured)
                .map((project, index) => (
                  <Card
                    key={index}
                    className="bg-[#1a1a1f] border-[#232329] hover:border-[#7EE787]/30 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-[#F4F4F5] text-xl">{project.title}</CardTitle>
                          <p className="text-[#7EE787] text-sm font-medium">{project.company}</p>
                        </div>
                        <Badge variant="outline" className="border-[#7EE787]/30 text-[#7EE787] bg-[#7EE787]/10">
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-[#F4F4F5]/80">{project.description}</p>

                      <div className="flex items-center gap-2 text-sm text-[#7EE787]">
                        <TrendingUp className="w-4 h-4" />
                        {project.metrics}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="bg-[#232329] text-[#F4F4F5]/80">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent">
                View All Projects ({projects.length})
              </Button>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16 bg-[#1a1a1f]/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#F4F4F5] mb-12">Professional Experience</h2>

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
                              <span className="text-[#7EE787] font-medium">{job.company}</span>
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
                                <Award className="w-4 h-4 text-[#7EE787] mt-0.5 flex-shrink-0" />
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#F4F4F5] mb-12">Skills & Tools</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <Card key={index} className="bg-[#1a1a1f] border-[#232329]">
                  <CardHeader>
                    <CardTitle className="text-[#7EE787] text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="bg-[#232329] text-[#F4F4F5]/80 hover:bg-[#7EE787]/20 hover:text-[#7EE787] transition-colors"
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
        <section className="py-16 bg-gradient-to-r from-[#7EE787]/10 to-[#A970FF]/10">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-3xl font-bold text-[#F4F4F5]">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-[#F4F4F5]/80">
              Let's discuss your Unity development needs and create immersive experiences together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90" asChild>
                <a href="mailto:ericzaleta@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Start a Project
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent"
                asChild
              >
                <Link href="/game-designer">
                  View Game Design Portfolio
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
