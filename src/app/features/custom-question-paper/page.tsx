'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false });

const Page = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    semester: '',
    subject: '',
    customSubject: '',
    module: '',
    numQuestions: '',
  });
  const [sections, setSections] = useState([
    { name: 'Section A', numQuestions: '', marksPerQuestion: '', modules: '' },
    { name: 'Section B', numQuestions: '', marksPerQuestion: '', modules: '' },
  ]);
  const [totalMarks, setTotalMarks] = useState('100');
  const [showEditor, setShowEditor] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const subjectOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'Biology',
    'Other',
  ];

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (idx: number, field: 'name' | 'numQuestions' | 'marksPerQuestion' | 'modules', value: string) => {
    const updated = [...sections];
    updated[idx][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { name: `Section ${String.fromCharCode(65 + sections.length)}`, numQuestions: '', marksPerQuestion: '', modules: '' }]);
  };

  const removeSection = (idx: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== idx));
    }
  };

  const calcTotal = () => {
    return sections.reduce((sum, sec) => {
      const n = parseInt(sec.numQuestions);
      const m = parseInt(sec.marksPerQuestion);
      return sum + (isNaN(n) || isNaN(m) ? 0 : n * m);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  if (!user) return null;

  // If showEditor is true, show only the editor
  if (showEditor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Your Question Paper</h2>
        <div className="w-full max-w-3xl">
          <TiptapEditor
            content={editorContent}
            onChange={setEditorContent}
            className="bg-white text-black rounded min-h-[300px] border border-zinc-700"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">
        Welcome to the Custom Question Paper Page, {user.username}!
      </h1>
      <p className="text-center mt-4">
        Here you can create your own custom question papers using our AI tools.
      </p>
      <div className="mt-10 max-w-2xl mx-auto">
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6 bg-black/80 p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Semester</label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1}`}>{`${i + 1} Semester`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Subject</option>
                  {subjectOptions.map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
                {form.subject === 'Other' && (
                  <input
                    type="text"
                    name="customSubject"
                    value={form.customSubject}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject name"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Module</label>
                <input
                  type="text"
                  name="module"
                  value={form.module}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Module 1"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-300 mb-1">Smart Mark Distribution</label>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-zinc-400">Total Marks:</span>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={e => setTotalMarks(e.target.value)}
                    min={1}
                    className="w-24 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {sections.map((sec, idx) => (
                  <div key={idx} className="flex flex-wrap items-center gap-2 mb-2 bg-zinc-900 p-2 rounded">
                    <input
                      type="text"
                      value={sec.name}
                      onChange={e => handleSectionChange(idx, 'name', e.target.value)}
                      className="w-28 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white"
                    />
                    <span className="text-zinc-400">Questions:</span>
                    <input
                      type="number"
                      value={sec.numQuestions}
                      onChange={e => handleSectionChange(idx, 'numQuestions', e.target.value)}
                      min={1}
                      className="w-16 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white"
                    />
                    <span className="text-zinc-400">Marks/Question:</span>
                    <input
                      type="number"
                      value={sec.marksPerQuestion}
                      onChange={e => handleSectionChange(idx, 'marksPerQuestion', e.target.value)}
                      min={1}
                      className="w-16 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white"
                    />
                    <button type="button" onClick={() => removeSection(idx)} className="text-red-400 hover:text-red-600 ml-2">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={addSection} className="mt-2 rounded bg-blue-700 px-2 py-1 text-xs text-white hover:bg-blue-800">+ Add Section</button>
                <div className="mt-2 text-sm text-zinc-300">Calculated Total: <b>{calcTotal()}</b> / {totalMarks} marks</div>
                {calcTotal() !== parseInt(totalMarks) && <div className="text-xs text-red-400">Warning: Total does not match!</div>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition mt-4"
            >
              Continue
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">Welcome to Question Generator!</h2>
            <p className="text-zinc-300 mb-6">You can now generate your custom question paper based on the details you provided.</p>
            <div className="bg-zinc-800 rounded-lg p-4 text-left text-sm text-zinc-200 max-w-md mx-auto">
              <div><b>Semester:</b> {form.semester}</div>
              <div><b>Subject:</b> {form.subject === 'Other' ? form.customSubject : form.subject}</div>
              <div><b>Module:</b> {form.module}</div>
              <div className="mt-2">
                <b>Mark Distribution:</b>
                <ul className="list-disc ml-6">
                  {sections.map((sec, idx) => (
                    <li key={idx}>{sec.name}: {sec.numQuestions} x {sec.marksPerQuestion} marks</li>
                  ))}
                </ul>
                <div>Total: {calcTotal()} / {totalMarks} marks</div>
              </div>
            </div>
            <button
              className="mt-8 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              onClick={() => setStep(1)}
            >
              Edit Details
            </button>
            <button
              className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
              onClick={() => setShowEditor(true)}
            >
              Start Generating Questions
            </button>
          </div>
        )}
      </div>
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} NextQ. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
