"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Sparkles,
  Users,
  BookOpen,
  Brain,
  FileText,
  Star,
  UserCheck,
  Mail,
  Zap,
  Target,
  Rocket,
  Code,
  Database,
  Palette,
  TestTube,
} from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [hoveredTeamMember, setHoveredTeamMember] = useState<string | null>(null)

  const teamMembers = [
    {
      name: "Adarsh Dev M.R.",
      email: "adarsh.dev@example.com",
      icon: Code,
    },
    {
      name: "Ardra Prem",
      email: "ardra.prem@example.com",
      icon: Database,
    },
    {
      name: "R S Pragathy",
      email: "rs.pragathy@example.com",
      icon: Brain,
    },
    {
      name: "Pavithra S S",
      email: "pavithra.ss@example.com",
      icon: Palette,
    },
    {
      name: "Ayyappan M",
      email: "ayyappan.m@example.com",
      icon: TestTube,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-zinc-500/10 to-white/5 blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-white animate-pulse" />
                <div className="absolute inset-0 h-16 w-16 bg-white/20 rounded-full blur-xl animate-ping"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent leading-tight">
              Next-Gen EduTech
            </h1>

            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              <span className="text-white font-semibold">AI-powered</span> automation for exam paper & notes generation
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-white/20 px-4 py-2 hover:bg-white/20 transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                RAG-Based AI
              </Badge>
              <Badge
                variant="secondary"
                className="bg-zinc-800/50 text-zinc-300 border-zinc-600/30 px-4 py-2 hover:bg-zinc-700/50 transition-colors"
              >
                <Target className="h-4 w-4 mr-2" />
                Academic Excellence
              </Badge>
              <Badge
                variant="secondary"
                className="bg-zinc-700/50 text-zinc-200 border-zinc-500/30 px-4 py-2 hover:bg-zinc-600/50 transition-colors"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Innovation
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-20 pb-20">
        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Brain className="h-8 w-8 text-zinc-300" />
              Revolutionary Features
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Cutting-edge AI technology designed to transform academic content creation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-white/30 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Question Paper Generation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  Automatically generate editable question papers based on selected syllabus, modules, and mark
                  distribution with AI precision.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-zinc-400/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-zinc-600/20 group-hover:bg-zinc-500/30 transition-colors">
                    <BookOpen className="h-6 w-6 text-zinc-300" />
                  </div>
                  <CardTitle className="text-xl text-white">Smart Notes Summarizer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  Upload study notes and receive concise, organized summaries that simplify complex material for faster
                  learning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-zinc-500/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-zinc-700/30 group-hover:bg-zinc-600/40 transition-colors">
                    <Star className="h-6 w-6 text-zinc-400" />
                  </div>
                  <CardTitle className="text-xl text-white">Predictive Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  Analyze previous papers and syllabus patterns to generate probable exam questions with data-driven
                  insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

         <div className="h-px bg-zinc-800 w-full"></div>

        {/* Mission Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-zinc-300" />
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-zinc-300 text-lg leading-relaxed">
                To build a smarter academic ecosystem by automating content creation, reducing manual effort, and
                increasing access to high-quality, AI-generated learning resources. Our goal is to empower students and
                educators with intelligent tools for effective teaching and learning.
              </p>
            </div>
          </div>
        </section>

        <div className="h-px bg-zinc-800 w-full"></div>

        {/* Team Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-zinc-300" />
              Meet Our Team
            </h2>
            <p className="text-zinc-400 text-lg">
              Passionate B.Tech IT students revolutionizing academic content management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-zinc-500 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-zinc-700 transition-all duration-300 group cursor-pointer"
                  onMouseEnter={() => setHoveredTeamMember(member.name)}
                  onMouseLeave={() => setHoveredTeamMember(null)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg group-hover:text-zinc-200 transition-colors">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 text-zinc-400 transition-all duration-300 ${
                        hoveredTeamMember === member.name ? "text-zinc-200" : ""
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

         <div className="h-px bg-zinc-800 w-full"></div>

        {/* Guidance Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-zinc-300" />
              Guidance & Mentorship
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-zinc-500 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-zinc-700 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="p-4 rounded-full bg-white/10 w-fit mx-auto">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xl">Project Coordinator</h3>
                  <p className="text-zinc-300 font-medium">Ms. Sabeena A.S.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-zinc-500 hover:bg-gradient-to-br hover:from-zinc-800 hover:to-zinc-700 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="p-4 rounded-full bg-zinc-600/20 w-fit mx-auto">
                  <UserCheck className="h-8 w-8 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xl">Project Guide</h3>
                  <p className="text-zinc-300 font-medium">Ms. Anupama Sathyan</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-zinc-400">
              <span className="text-white font-semibold">Department of Information Technology</span>
              <br />
              University College Of Engineering Kariavattom
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
