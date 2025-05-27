"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Brain, Sparkles, ExternalLink, X, Plus } from "lucide-react"

const QuestionPaperAIPage = () => {
  const [form, setForm] = useState({
    subject: "",
    syllabus: null as File | null,
    questionpapers: [] as File[],
  })
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === "syllabus" && files) {
      setForm((prev) => ({ ...prev, syllabus: files[0] }))
    } else if (name === "questionpapers" && files) {
      setForm((prev) => ({ ...prev, questionpapers: [...prev.questionpapers, ...Array.from(files)] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const removeFile = (index: number, type: "syllabus" | "questionpapers") => {
    if (type === "syllabus") {
      setForm((prev) => ({ ...prev, syllabus: null }))
    } else {
      setForm((prev) => ({
        ...prev,
        questionpapers: prev.questionpapers.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setLoading(false)
          alert("Question paper generated successfully!")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                QuestionPaper AI
              </h1>
            </div>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Generate intelligent question papers using AI-powered analysis of your syllabus and previous papers.
              Upload your materials and let our AI create comprehensive question papers tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 pb-20">
        <div className="space-y-8">
          {/* Main Form */}
          <Card className="bg-black backdrop-blur-sm border-zinc-800 overflow-hidden group  transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-zinc-800 text-white border-zinc-700">
                  <Upload className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl font-semibold">Upload Your Files</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Provide your subject details and upload the required files to generate questions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Subject Name */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-zinc-300 font-medium">
                    Subject Name
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Data Structures and Algorithms"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-zinc-600 h-12 text-base"
                  />
                </div>

                {/* File Upload Section */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Syllabus Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label className="text-zinc-300 font-medium">Syllabus File</Label>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                          Required
                        </Badge>
                      </div>
                      <Link
                        href="https://ktu.edu.in/eu/att/attachments.htm"
                        target="_blank"
                        className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <span>Need a syllabus?</span>
                        <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* Upload Box */}
                    <div className="relative">
                      <input
                        type="file"
                        name="syllabus"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleChange}
                        required
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="syllabus-upload"
                      />
                      <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-600 transition-colors bg-zinc-800/30">
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-3 bg-zinc-800 rounded-lg">
                            <Upload className="h-6 w-6 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Choose syllabus file</p>
                            <p className="text-zinc-400 text-sm">PDF, DOC, DOCX, TXT</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Uploaded Syllabus */}
                    {form.syllabus && (
                      <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-800 rounded-lg">
                            <FileText className="h-4 w-4 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{form.syllabus.name}</p>
                            <p className="text-zinc-400 text-xs">{formatFileSize(form.syllabus.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(0, "syllabus")}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Question Papers Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-zinc-300 font-medium">Question Papers</Label>
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                        Required
                      </Badge>
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                        Multiple
                      </Badge>
                    </div>

                    {/* Upload Box */}
                    <div className="relative">
                      <input
                        type="file"
                        name="questionpapers"
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="questionpapers-upload"
                      />
                      <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-600 transition-colors bg-zinc-800/30">
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-3 bg-zinc-800 rounded-lg">
                            <Plus className="h-6 w-6 text-zinc-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">Choose question papers</p>
                            <p className="text-zinc-400 text-sm">PDF, DOC, DOCX, TXT (Multiple files)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Uploaded Question Papers */}
                    {form.questionpapers.length > 0 && (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {form.questionpapers.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-zinc-800 rounded">
                                <FileText className="h-3.5 w-3.5 text-zinc-400" />
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                                <p className="text-zinc-400 text-xs">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index, "questionpapers")}
                              className="text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 w-8 p-0"
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {loading && (
                  <Card className="bg-zinc-800/50 border-zinc-700">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-300 font-medium">Processing files...</span>
                          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                            {progress}%
                          </Badge>
                        </div>
                        <Progress value={progress} className="h-2 bg-zinc-700" />
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
                          <span>Analyzing content and generating questions...</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !form.syllabus || form.questionpapers.length === 0}
                  className="w-full bg-blue-600  hover:bg-blue-800 text-white font-medium py-3 h-12 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-zinc-400 border-t-black rounded-full animate-spin"></div>
                      <span>Generating Questions...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      <span>Generate Question Paper</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 w-fit mx-auto mb-4">
                  <Brain className="h-6 w-6 text-zinc-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-zinc-400 text-sm">
                  Advanced AI algorithms analyze your materials to generate relevant questions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 w-fit mx-auto mb-4">
                  <FileText className="h-6 w-6 text-zinc-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Multiple Formats</h3>
                <p className="text-zinc-400 text-sm">
                  Support for PDF, DOC, DOCX, and TXT files for maximum flexibility
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:bg-zinc-900/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 w-fit mx-auto mb-4">
                  <Upload className="h-6 w-6 text-zinc-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Instant Generation</h3>
                <p className="text-zinc-400 text-sm">Get your customized question papers generated in seconds</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionPaperAIPage
