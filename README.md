# NextQ: AI-Powered Exam Paper & Notes Generator

NextQ is a modern EdTech platform that uses AI to automate question paper generation, notes summarization, and more. Built with Next.js, FastAPI, and Azure OpenAI, it empowers students and educators to create, summarize, and analyze academic content with ease.

## 🚀 Features
- **Custom Question Paper Generation**: Upload syllabus and previous papers, and generate new question papers using AI.
- **Notes Summarizer**: Upload your notes and get concise, actionable summaries as PDF.
- **Predictive Question Paper**: Analyze past papers to generate likely exam questions.
- **Modern UI**: Built with Next.js, shadcn/ui, and a beautiful dark theme.

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd nextq
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your API keys (Azure OpenAI, Together AI, etc).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to use the app.

## 📝 Usage
- **Custom Question Paper:** Go to `/features/custom-question-paper` to generate question papers from your syllabus and previous papers.
- **Notes Summarizer:** Go to `/features/notes-summarizer` to upload notes and get a summarized PDF.
- **Predictive Question Paper:** Go to `/features/questionpaper-ai` to generate likely exam questions from past papers.

## 🧑‍💻 Tech Stack
- **Frontend:** Next.js, React, shadcn/ui
- **Backend:** FastAPI, Azure OpenAI, Together AI
- **PDF Handling:** fpdf, pdfplumber

## 🌐 Deploy on Vercel
The easiest way to deploy is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)
