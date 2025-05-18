"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is NextQ?",
    answer: "NextQ is a modern question paper generator and editor built with Next.js.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, your data is stored securely and is never shared with third parties.",
  },
  {
    question: "How do I print my question paper?",
    answer: "Use the print button in the editor toolbar to print your question paper in A4 format.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-zinc-700 rounded-lg bg-zinc-900">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium text-left text-white focus:outline-none"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
              aria-controls={`faq-${idx}`}
            >
              {faq.question}
              <span className="ml-4">{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx && (
              <div
                id={`faq-${idx}`}
                className="px-6 pb-4 text-zinc-300 animate-fade-in"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}