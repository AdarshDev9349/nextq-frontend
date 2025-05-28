"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Loader2, Sparkles } from "lucide-react"

const NoteSummarizerPage = () => {
  const [form, setForm] = useState({
    subject: "",
    module: "",
    prompt: "",
    file: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    if (name === "file" && files) {
      setForm((prev) => ({ ...prev, file: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm((prev) => ({ ...prev, file: e.dataTransfer.files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      if (form.file) formData.append("file", form.file)
      if (form.prompt) formData.append("prompt", form.prompt)
      // Send to our Next.js API route
      const res = await fetch("/api/summarize-note", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        const error = await res.json()
        alert(error.error || "Failed to summarize note.")
        setLoading(false)
        return
      }
      // Download the summarized PDF
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "summary.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      setLoading(false)
    } catch (err) {
      const error = err as Error;
      alert(error.message || "Unknown error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">Note Summarizer</h1>
          </div>
          <p className="text-zinc-400 text-lg">Transform your notes into concise, actionable summaries with AI</p>
        </div>

        <Card className="bg-black border-zinc-800 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Upload Your Notes
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Fill in the details below to get a personalized summary of your notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject and Module Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-zinc-300 font-medium">
                    Subject Name *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Mathematics, Physics"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="module" className="text-zinc-300 font-medium">
                    Module <span className="text-zinc-500">(optional)</span>
                  </Label>
                  <Input
                    id="module"
                    name="module"
                    type="text"
                    value={form.module}
                    onChange={handleChange}
                    placeholder="e.g., Calculus, Quantum Mechanics"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-zinc-300 font-medium">
                  Custom Instructions <span className="text-zinc-500">(optional)</span>
                </Label>
                <Textarea
                  id="prompt"
                  name="prompt"
                  value={form.prompt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., Focus on key formulas and examples, include practice problems..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-zinc-300 font-medium">Note File *</Label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-500/10"
                      : form.file
                        ? "border-green-500 bg-green-500/10"
                        : "border-zinc-700 bg-zinc-800/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleChange}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className={`mx-auto h-12 w-12 mb-4 ${form.file ? "text-green-500" : "text-zinc-400"}`} />
                    {form.file ? (
                      <div>
                        <p className="text-green-400 font-medium">{form.file.name}</p>
                        <p className="text-zinc-500 text-sm mt-1">{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-zinc-300 font-medium">Drop your file here or click to browse</p>
                        <p className="text-zinc-500 text-sm mt-1">Supports PDF, DOC, DOCX, TXT files</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-base transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-zinc-500 text-sm">Your files are processed securely and never stored permanently</p>
        </div>
      </div>
    </div>
  )
}

export default NoteSummarizerPage
