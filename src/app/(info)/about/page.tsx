"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Sparkles, Users, BookOpen, Brain, FileText, Star, UserCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-12 px-4">
      <Card className="w-full max-w-3xl bg-zinc-900 border-zinc-800 shadow-xl mb-10 animate-fade-in">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-blue-400 animate-pulse" />
            <CardTitle className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Next-Gen EduTech: RAG-Based AI System
            </CardTitle>
          </div>
          <CardDescription className="text-zinc-300 text-center text-lg mt-2">
            <span className="text-blue-400 font-semibold">AI-powered</span> automation for exam paper & notes generation. Built by passionate B.Tech IT students to revolutionize academic content management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 mt-4">
          <section>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Brain className="h-5 w-5 text-cyan-400" /> Key Features</h2>
            <Accordion type="single" collapsible className="rounded-lg border border-zinc-800 bg-zinc-900">
              <AccordionItem value="qpg">
                <AccordionTrigger className="text-zinc-200 text-base flex items-center gap-2"><FileText className="h-4 w-4 text-blue-400" /> Custom Question Paper Generation</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  Automatically generate editable question papers based on selected syllabus, modules, and mark distribution. Create well-structured, syllabus-aligned question sets that save time and enhance assessment quality.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="notes">
                <AccordionTrigger className="text-zinc-200 text-base flex items-center gap-2"><BookOpen className="h-4 w-4 text-purple-400" /> Notes Summarizer</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  Upload study notes and receive concise, organized summaries. Simplifies complex material, allowing students to review key concepts more effectively and prepare faster.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="predict">
                <AccordionTrigger className="text-zinc-200 text-base flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /> Question Paper Prediction</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  Analyze uploaded previous year question papers and the syllabus to identify patterns and generate probable exam questions—offering smarter, data-driven preparation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-blue-400" /> Our Mission</h2>
            <p className="text-zinc-300 text-base">
              To build a smarter academic ecosystem by automating content creation, reducing manual effort, and increasing access to high-quality, AI-generated learning resources. Our goal is to empower students and educators with intelligent tools for effective teaching and learning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-green-400" /> Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <UserCheck className="h-6 w-6 text-blue-400" />
                <div>
                  <div className="text-white font-semibold">Adarsh Dev M.R.</div>
                  <div className="text-zinc-400 text-xs">Roll No. 3 — Team Lead & AI Integration</div>
                </div>
              </Card>
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <UserCheck className="h-6 w-6 text-purple-400" />
                <div>
                  <div className="text-white font-semibold">Ardra Prem</div>
                  <div className="text-zinc-400 text-xs">Roll No. 15 — Backend Developer</div>
                </div>
              </Card>
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <UserCheck className="h-6 w-6 text-yellow-400" />
                <div>
                  <div className="text-white font-semibold">R S Pragathy</div>
                  <div className="text-zinc-400 text-xs">Roll No. 36 — Data Processing & Content Curation</div>
                </div>
              </Card>
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <UserCheck className="h-6 w-6 text-pink-400" />
                <div>
                  <div className="text-white font-semibold">Pavithra S S</div>
                  <div className="text-zinc-400 text-xs">Roll No. 34 — Frontend Developer</div>
                </div>
              </Card>
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <UserCheck className="h-6 w-6 text-cyan-400" />
                <div>
                  <div className="text-white font-semibold">Ayyappan M</div>
                  <div className="text-zinc-400 text-xs">Roll No. 17 — UI/UX Designer & Tester</div>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><BookOpen className="h-5 w-5 text-purple-400" /> Guidance & Mentorship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <div>
                  <div className="text-white font-semibold">Project Coordinator:</div>
                  <div className="text-zinc-400 text-xs">Ms. Sabeena A.S.</div>
                </div>
              </Card>
              <Card className="bg-zinc-800 border-zinc-700 flex flex-row items-center gap-3 p-3">
                <div>
                  <div className="text-white font-semibold">Project Guide:</div>
                  <div className="text-zinc-400 text-xs">Ms. Anupama Sathyan</div>
                </div>
              </Card>
            </div>
            <div className="mt-4 text-zinc-400 text-sm">Department of Information Technology<br />[Your College Name]</div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
