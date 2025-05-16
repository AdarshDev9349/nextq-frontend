"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import HardBreak from "@tiptap/extension-hard-break"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Type,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
  CornerDownRightIcon as CornerDown,
  Undo,
  Redo,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  className?: string
}

// Custom implementation of Tooltip since the user doesn't have it
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 whitespace-nowrap">
        {content}
      </div>
    </div>
  )
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, className }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  // Responsive: close sidebar by default on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarCollapsed(true)
    }
    setMounted(true)
  }, [])

  // Ensure theme is only accessed client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      HorizontalRule,
      HardBreak,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `${className || ""} bg-background text-foreground print:bg-white print:text-black rounded min-h-[300px] p-6 focus:outline-none ProseMirror`,
      },
    },
  })

  if (!editor || !mounted) return null

  // Responsive sidebar toggle button
  const SidebarToggle = () => {
    // Only show if sidebar is collapsed (show open button) or on mobile and sidebar is open (show close button)
    if (typeof window !== "undefined" && window.innerWidth >= 768) return null;
    if (sidebarCollapsed) {
      // Show open button when sidebar is collapsed
      return (
        <button
          type="button"
          aria-label="Open toolbar"
          onClick={() => setSidebarCollapsed(v => !v)}
          className="md:hidden fixed top-4 left-4 z-30 bg-zinc-900 text-white rounded-full p-2 shadow-lg border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary"
        >
     
        </button>
      );
    }
    // Show close button only if sidebar is open and on mobile
    return null;
  }

  const ToolbarButton = ({
    title,
    onClick,
    active = false,
    disabled = false,
    icon,
  }: {
    title: string
    onClick: () => void
    active?: boolean
    disabled?: boolean
    icon: React.ReactNode
  }) => (
    <Tooltip content={title}>
      <button
        type="button"
        tabIndex={-1}
        onMouseDown={e => { e.preventDefault(); onClick(); }}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors text-sm font-medium",
          active
            ? "bg-primary text-primary-foreground shadow"
            : "bg-transparent text-muted-foreground hover:bg-muted hover:text-background",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {icon}
        <span>{title}</span>
      </button>
    </Tooltip>
  )

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650")
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print</title>
            <style>
              body {
                background: #fff;
                color: #111;
                font-size: 1.1rem;
                padding: 2rem;
                font-family: system-ui, -apple-system, sans-serif;
              }
              .ProseMirror-a4 {
                font-size: 1.1rem;
                margin: 0 auto;
                background: #fff;
                color: #111;
                min-height: 1122px;
                width: 793px;
                max-width: 793px;
                border-radius: 0.75rem;
              }
              .ProseMirror {
                background: #fff;
                color: #111;
                min-height: 350px;
                font-size: 1.1rem;
                padding: 2rem;
              }
              .ProseMirror h1 { font-size: 2rem; font-weight: 700; margin: 1.2em 0 0.6em 0; color: #000; }
              .ProseMirror h2 { font-size: 1.5rem; font-weight: 600; margin: 1em 0 0.5em 0; color: #000; }
              .ProseMirror h3 { font-size: 1.2rem; font-weight: 600; margin: 0.8em 0 0.4em 0; color: #000; }
              .ProseMirror ul, .ProseMirror ol { margin: 0.5em 0 0.5em 2em; padding-left: 1.5em; }
              .ProseMirror ul {
                list-style-type: disc;
              }
              .ProseMirror ol {
                list-style-type: decimal;
              }
              .ProseMirror li { margin: 0.2em 0; padding-left: 0.2em; }
              .ProseMirror blockquote { border-left: 4px solid #888; margin: 1em 0; padding: 0.5em 1em; color: #444; background: #f7f7f7; border-radius: 0.25em; font-style: italic; }
              .ProseMirror code { background: #f4f4f4; color: #c7254e; padding: 0.2em 0.4em; border-radius: 0.2em; font-size: 0.95em; }
              .ProseMirror pre { background: #222; color: #f8f8f2; padding: 1em; border-radius: 0.3em; overflow-x: auto; font-size: 1em; }
              .ProseMirror hr { border: none; border-top: 2px solid #bbb; margin: 1.5em 0; }
              .ProseMirror p { margin: 0.5em 0; }
              .ProseMirror strong { font-weight: bold; }
              .ProseMirror em { font-style: italic; }
              .ProseMirror u { text-decoration: underline; }
              .ProseMirror s { text-decoration: line-through; }
              @media print {
                body { margin: 0; padding: 0; }
                .ProseMirror-a4 { box-shadow: none; border: none; }
              }
            </style>
          </head>
          <body>
            <div class='ProseMirror-a4'>
              <div class='ProseMirror'>${editor.getHTML()}</div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background relative">
      {/* Sidebar Toolbar */}
      <aside className={cn(
        "flex flex-col gap-2 w-70 bg-zinc-900 border-r border-border shadow-lg fixed left-0 top-0 h-screen z-20 transition-all duration-300",
        sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        {/* Sidebar toggle for mobile */}
        <button
          type="button"
          className="absolute top-4 right-[-2.5rem] z-30 bg-zinc-900 border border-border rounded-full p-2 shadow-md flex items-center justify-center md:hidden"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? "Open toolbar" : "Close toolbar"}
        >
          {sidebarCollapsed ? <ChevronRight className="h-6 w-6 text-muted-foreground" /> : <ChevronLeft className="h-6 w-6 text-muted-foreground" />}
        </button>
        <div className="flex flex-col gap-2 px-4 pt-8 ">
          {/* Only show toolbar if not collapsed or on desktop */}
          <div className={cn("flex flex-col gap-2", sidebarCollapsed && "hidden md:flex")}>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 tracking-widest">TEXT STYLE</h4>
              <div className="flex flex-wrap ">
                <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} icon={<Bold className="h-4 w-4" />} />
                <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} icon={<Italic className="h-4 w-4" />} />
                <ToolbarButton title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} icon={<UnderlineIcon className="h-4 w-4" />} />
                <ToolbarButton title="Strike" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} icon={<Strikethrough className="h-4 w-4" />} />
                <ToolbarButton
                  title="Clear Formatting"
                  onClick={() => {
                    editor.chain()
                      .focus()
                      .unsetAllMarks()
                      .clearNodes()
                      .setParagraph() // This ensures block types are reset to paragraph
                      .run()
                  }}
                  icon={<Type className="h-4 w-4" />}
                />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 tracking-widest">HEADINGS</h4>
              <div className="flex flex-wrap gap-0">
                <ToolbarButton title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} icon={<Heading1 className="h-4 w-4" />} />
                <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} icon={<Heading2 className="h-4 w-4" />} />
                <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} icon={<Heading3 className="h-4 w-4" />} />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 tracking-widest">ALIGNMENT</h4>
              <div className="flex flex-wrap gap-1">
                <ToolbarButton title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} icon={<AlignLeft className="h-4 w-4" />} />
                <ToolbarButton title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} icon={<AlignCenter className="h-4 w-4" />} />
                <ToolbarButton title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} icon={<AlignRight className="h-4 w-4" />} />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 tracking-widest">LISTS & BLOCKS</h4>
              <div className="flex flex-wrap gap-0">
                <ToolbarButton title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} icon={<List className="h-4 w-4" />} />
                <ToolbarButton title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} icon={<ListOrdered className="h-4 w-4" />} />
                <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} icon={<Quote className="h-4 w-4" />} />
                <ToolbarButton title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} icon={<Code2 className="h-4 w-4" />} />
                <ToolbarButton title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<Minus className="h-4 w-4" />} />
                <ToolbarButton title="Hard Break" onClick={() => editor.chain().focus().setHardBreak().run()} icon={<CornerDown className="h-4 w-4" />} />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 tracking-widest">HISTORY</h4>
              <div className="flex flex-row gap-1">
                <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={<Undo className="h-4 w-4" />} />
                <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={<Redo className="h-4 w-4" />} />
              </div>
            </div>
          </div>
        </div>
        {/* Print Button at Bottom */}
        <div className="flex justify-center">
          <ToolbarButton title="Print" onClick={handlePrint} icon={<Printer className="h-8 w-8" />} />
        </div>
      </aside>
      {/* Sidebar Toggle Button (mobile only) */}
      <SidebarToggle />
      {/* Editor Canvas */}
      <main className={cn(
        "flex-1 flex items-center justify-center bg-zinc-950 min-h-screen transition-all duration-300",
        sidebarCollapsed ? "ml-0" : "ml-64"
      )}>
        <div className="ProseMirror-a4 relative flex flex-col justify-start w-[793px] h-[1122px] max-w-[793px] max-h-[1122px] border border-border shadow-xl bg-white rounded-xl">
          <EditorContent editor={editor} className="h-full" />
        </div>
      </main>
      <style jsx global>{`
        .ProseMirror {
          color: #111 !important;
          background: #fff;
          outline: none;
          height: 100%;
          min-height: 0;
          max-height: 100%;
          overflow: auto;
        }
        .ProseMirror-a4 {
          min-height: 60vh;
          max-width: 100vw;
          width: 100%;
          padding: 1rem;
          background: #fff;
          border-radius: var(--radius-xl);
          box-shadow: 0 2px 16px 0 #0002;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        @media (min-width: 768px) {
          .ProseMirror-a4 {
            min-width: 793px;
            max-width: 793px;
            width: 793px;
            min-height: 1122px;
            max-height: 1122px;
            height: 1122px;
            margin: 0;
            padding: 2rem;
          }
        }
        .ProseMirror h1 { font-size: 2rem; font-weight: 700; margin: 1.2em 0 0.6em 0; }
        .ProseMirror h2 { font-size: 1.5rem; font-weight: 600; margin: 1em 0 0.5em 0; }
        .ProseMirror h3 { font-size: 1.2rem; font-weight: 600; margin: 0.8em 0 0.4em 0; }
        .ProseMirror ul, .ProseMirror ol { margin: 0.5em 0 0.5em 2em; padding-left: 1.5em; }
        .ProseMirror ul { list-style-type: disc; }
        .ProseMirror ol { list-style-type: decimal; }
        .ProseMirror li { margin: 0.2em 0; padding-left: 0.2em; }
        .ProseMirror blockquote { border-left: 4px solid #888; margin: 1em 0; padding: 0.5em 1em; color: #444; background: #f7f7f7; border-radius: 0.25em; font-style: italic; }
        .ProseMirror code { background: hsl(var(--muted) / 0.5); color: hsl(var(--primary)); padding: 0.2em 0.4em; border-radius: 0.2em; font-size: 0.95em; }
        .ProseMirror pre { background: hsl(var(--card) / 0.8); color: hsl(var(--card-foreground)); padding: 1em; border-radius: 0.3em; overflow-x: auto; font-size: 1em; }
        .ProseMirror hr { border: none; border-top: 1px solid black; margin: 1.5em 0; }
        .ProseMirror p { margin: 0.5em 0; }
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: #fff !important; color: #111 !important; }
          .ProseMirror-a4 { box-shadow: none; border: none; min-width: 793px !important; max-width: 793px !important; width: 793px !important; min-height: 1122px !important; max-height: 1122px !important; height: 1122px !important; margin: 0 auto !important; }
        }
      `}</style>
    </div>
  )
}

export default TiptapEditor
