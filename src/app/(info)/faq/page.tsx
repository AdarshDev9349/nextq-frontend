"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Brain,
  FileText,
  Upload,
  FileCheck,
  PenTool,
  Shield,
  HelpCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react"

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const faqData = [
    {
      category: "General FAQs",
      icon: Brain,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      questions: [
        {
          id: "general-1",
          question: "What is NextQ and what does it do?",
          answer:
            "NextQ is an AI-powered educational platform that allows users to upload study materials (PDFs, images, etc.) and get features like note summarization, predictive question paper generation, and custom question paper creation.",
        },
        {
          id: "general-2",
          question: "Who can use this platform?",
          answer:
            "Anyone with a registered account can use the platform — especially useful for students, teachers, and educational institutions.",
        },
        {
          id: "general-3",
          question: "Is the platform free to use?",
          answer:
            "Currently, basic features are free. Advanced features or premium access may be introduced in future versions.",
        },
      ],
    },
    {
      category: "Uploading Documents",
      icon: Upload,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      questions: [
        {
          id: "upload-1",
          question: "What types of files can I upload?",
          answer:
            "You can upload PDF, JPEG, PNG, and DOCX files. Make sure the text is clearly visible for best results.",
        },
        {
          id: "upload-2",
          question: "Where can I view my uploaded documents?",
          answer: "After logging in, go to your Profile page to see all your previously uploaded documents.",
        },
        {
          id: "upload-3",
          question: "Is there a file size limit for uploads?",
          answer:
            "Yes, the maximum file size currently allowed is 10MB. If your file exceeds this, try compressing or splitting it.",
        },
      ],
    },
    {
      category: "Summarizing Notes",
      icon: FileCheck,
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      questions: [
        {
          id: "summary-1",
          question: "How does note summarization work?",
          answer:
            "Our AI scans your uploaded document, extracts key concepts, and generates a concise summary in simple language.",
        },
        {
          id: "summary-2",
          question: "Can I choose the difficulty level of the summary?",
          answer: "Yes, while uploading or summarizing, you can select difficulty levels like Easy, Medium, or Hard.",
        },
      ],
    },
    {
      category: "Predictive Question Paper",
      icon: Brain,
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      questions: [
        {
          id: "predictive-1",
          question: "How does the Predictive Question Paper Generator work?",
          answer:
            "The system analyzes past years' papers or notes and uses AI models to generate likely questions for upcoming exams.",
        },
        {
          id: "predictive-2",
          question: "Can I upload previous question papers for better predictions?",
          answer: "Yes! Uploading past papers improves the prediction accuracy significantly.",
        },
      ],
    },
    {
      category: "Custom Question Paper",
      icon: PenTool,
      color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      questions: [
        {
          id: "custom-1",
          question: "Can I design my own question paper?",
          answer:
            "Absolutely. Use the Custom QP tool to create your own papers with editable sections like institution name, logos, question types, and more.",
        },
        {
          id: "custom-2",
          question: "Can I download the final paper as a PDF?",
          answer: "Yes, all generated or customized question papers can be previewed and downloaded in PDF format.",
        },
      ],
    },
    {
      category: "Account & Security",
      icon: Shield,
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      questions: [
        {
          id: "security-1",
          question: "Is my data safe?",
          answer: "Yes, all documents and user data are securely stored and are only accessible to the account holder.",
        },
        {
          id: "security-2",
          question: "Can I delete my uploaded documents?",
          answer: "Yes, you can delete any uploaded document from your profile page.",
        },
        {
          id: "security-3",
          question: "I forgot my password. What should I do?",
          answer: 'Click on the "Forgot Password" link on the login page to reset your password via email.',
        },
      ],
    },
  ]

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.category.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br ">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <HelpCircle className="h-12 w-12 text-blue-500" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about NextQ&apos;s AI-powered educational platform. Can&apos;t find what you&apos;re
              looking for? Contact our support team.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 shadow-2xl">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredFAQs.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800 text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-zinc-400">Try adjusting your search terms or browse all categories below.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={categoryIndex}
                  className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 overflow-hidden group hover:bg-zinc-900/70 transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${category.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl font-semibold">{category.category}</CardTitle>
                        <CardDescription className="text-zinc-400">
                          {category.questions.length} question{category.questions.length !== 1 ? "s" : ""}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-auto bg-zinc-800 text-zinc-300 border-zinc-700">
                        {category.questions.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border-zinc-800">
                          <AccordionTrigger className="text-left hover:text-blue-400 transition-colors duration-200 group/trigger">
                            <div className="flex items-center gap-3">
                              <span className="text-zinc-500 font-mono text-sm">
                                {String(faqIndex + 1).padStart(2, "0")}
                              </span>
                              <span className="text-white group-hover/trigger:text-blue-400 transition-colors">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-zinc-300 leading-relaxed pl-8 pr-4">
                            <div className="border-l-2 border-blue-500/30 pl-4 py-2">{faq.answer}</div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
            </div>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group">
              <span className="font-medium">Contact Support</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FAQPage
