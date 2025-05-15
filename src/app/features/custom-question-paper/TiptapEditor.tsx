import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import HardBreak from '@tiptap/extension-hard-break';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      HorizontalRule,
      HardBreak,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `${className || ''} bg-white text-black print:bg-white print:text-black rounded min-h-[300px] border border-zinc-700 p-4 focus:outline-none ProseMirror`,
      
      },
    },
  });

  if (!editor) return null;

  const btn = (opts: {
    title: string;
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      title={opts.title}
      onClick={opts.onClick}
      disabled={opts.disabled}
      className={`px-2 py-1 rounded transition text-sm font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${opts.active ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-200 hover:bg-blue-700 hover:text-white'} ${opts.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {opts.children}
    </button>
  );

  return (
    <div className="flex">
      <div className="print:hidden flex flex-col gap-2 bg-zinc-900 p-3 rounded-l-xl shadow-lg border border-zinc-700 items-center min-w-[52px] sticky top-4 h-fit mr-2">
        {btn({ title: 'Undo', onClick: () => editor.chain().focus().undo().run(), children: '↺', disabled: !editor.can().undo() })}
        {btn({ title: 'Redo', onClick: () => editor.chain().focus().redo().run(), children: '↻', disabled: !editor.can().redo() })}
        <span className="border-t border-zinc-600 w-6 my-1"></span>
        {btn({ title: 'Bold', onClick: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), children: <b>B</b> })}
        {btn({ title: 'Italic', onClick: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), children: <i>I</i> })}
        {btn({ title: 'Underline', onClick: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), children: <u>U</u> })}
        {btn({ title: 'Strike', onClick: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), children: <s>S</s> })}
        <span className="border-t border-zinc-600 w-6 my-1"></span>
        {btn({ title: 'Heading 1', onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), children: 'H1' })}
        {btn({ title: 'Heading 2', onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), children: 'H2' })}
        {btn({ title: 'Heading 3', onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }), children: 'H3' })}
        <span className="border-t border-zinc-600 w-6 my-1"></span>
        {btn({ title: 'Bullet List', onClick: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), children: <span>&#8226;</span> })}
        {btn({ title: 'Ordered List', onClick: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), children: '1.' })}
        {btn({ title: 'Blockquote', onClick: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), children: '❝' })}
        {btn({ title: 'Code Block', onClick: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock'), children: '<>' })}
        {btn({ title: 'Horizontal Rule', onClick: () => editor.chain().focus().setHorizontalRule().run(), children: '―' })}
        {btn({ title: 'Hard Break', onClick: () => editor.chain().focus().setHardBreak().run(), children: '↵' })}
        <span className="border-t border-zinc-600 w-6 my-1"></span>
        {btn({ title: 'Align Left', onClick: () => editor.chain().focus().setTextAlign('left').run(), active: editor.isActive({ textAlign: 'left' }), children: '⯇' })}
        {btn({ title: 'Align Center', onClick: () => editor.chain().focus().setTextAlign('center').run(), active: editor.isActive({ textAlign: 'center' }), children: '≡' })}
        {btn({ title: 'Align Right', onClick: () => editor.chain().focus().setTextAlign('right').run(), active: editor.isActive({ textAlign: 'right' }), children: '⯈' })}
        <span className="border-t border-zinc-600 w-6 my-1"></span>
        {btn({ title: 'Clear Formatting', onClick: () => editor.chain().focus().unsetAllMarks().clearNodes().run(), children: 'Tx' })}
        <span className="border-t border-zinc-600 w-6 my-1"></span>
        {btn({
          title: 'Print',
          onClick: () => {
            const printWindow = window.open('', '', 'width=900,height=650');
            if (printWindow) {
              printWindow.document.write(`<!DOCTYPE html><html><head><title>Print</title><style>body{background:#fff;color:#111;font-size:1.1rem;padding:2rem;} .ProseMirror{background:#fff;color:#111;min-height:350px;font-size:1.1rem;padding:1rem;border-radius:0.5rem;box-shadow:0 1px 4px 0 #0001;border:1px solid #ccc;}</style></head><body>${editor.getHTML()}</body></html>`);
              printWindow.document.close();
              printWindow.focus();
              printWindow.print();
              printWindow.close();
            }
          },
          children: '🖨️sddd',
        })}
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex justify-center">
        <div className="bg-white text-black print:bg-white print:text-black rounded min-h-[1122px] min-w-[793px] max-w-[793px] w-full border border-zinc-700 p-8 shadow-xl relative overflow-auto ProseMirror-a4">
          <EditorContent editor={editor} />
        </div>
      </div>

      <style jsx>{`
        .ProseMirror-a4 {
          box-shadow: 0 2px 16px 0 #0002;
          margin: 0 auto;
          background: #fff;
          color: #111;
          min-height: 1122px;
          min-width: 793px;
          max-width: 793px;
          width: 100%;
          border-radius: 0.75rem;
        }

        .ProseMirror {
          background: #fff;
          color: #111;
          min-height: 350px;
          
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 4px 0 #0001;
          border: 1px solid #ccc;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.2em 0 0.6em 0;
          color: #000;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1em 0 0.5em 0;
          color: #000;
        }

        .ProseMirror h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0.8em 0 0.4em 0;
          color: #000;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          margin: 0.5em 0 0.5em 2em;
          padding-left: 1.5em;
          list-style: initial;
        }

        .ProseMirror li {
          margin: 0.2em 0;
        }

        @media (max-width: 900px) {
          .ProseMirror-a4 {
            min-width: 100vw;
            max-width: 100vw;
            padding: 1rem;
          }
        }

        @media print {
          .print\\:hidden {
            display: none !important;
          }

          .ProseMirror-a4 {
            box-shadow: none !important;
            border: none !important;
          }

          body {
            background: #fff !important;
            color: #111 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
