'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BookOpenText, Brain,NotebookText } from 'lucide-react'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import NavbarDemo from '@/components/ui/navbar'
import Link from 'next/link'


const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export default function ProfilePage() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  return (

    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-zinc-950 py-16 text-white"
    >
            <NavbarDemo/>

      <div className="@container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-18 md:mt-20"
        >
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Smart AI-Powered Tools for Education
          </h2>
          <p className="mt-4 text-zinc-400">
            Empowering students and educators with cutting-edge, AI-driven solutions.
          </p>
          
        </motion.div>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{ scale: 1.04 }}
            
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

const features = [
  {
    icon: <BookOpenText className="size-8" />,
    title: 'Custom Question Paper Generation',
    path:"/features/custom-question-paper",
    description:
      'Automatically generate question papers tailored to syllabus, difficulty, and question count using AI.',
  },
  {
    icon:  <NotebookText className="size-8" />,
    title: 'Notes Summarizer',
     path:"/features/notes-summarizer",
    description:
      'Upload notes in PDF format and get concise, structured summaries for efficient learning.',
  },
  {
    icon: <Brain className="size-8" />,
    title: 'Question Paper Prediction',
     path:"/features/questionpaper-ai",
    description:
      'Analyze previous papers and trends to generate likely exam questions for smarter preparation.',
  },
]

function FeatureCard({
  icon,
  title,
  description,
  path,
}: {
  icon: ReactNode
  title: string
  path:string
  description: string
}) {
  return (
    <Card className="group bg-black border border-zinc-800 shadow-md transition-all duration-200 hover:border-white/20 hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardDecorator>{icon}</CardDecorator>
        <h3 className="mt-6 font-medium text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400">{description}</p>
        <Link
          href={path}
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-700"
        > 
        Learn More
        </Link>

      </CardContent>
    </Card>
  )
}

function CardDecorator({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-white)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      <div
        aria-hidden
        className="bg-radial to-background absolute inset-0 from-transparent to-75%"
      />
      <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
        {children}
      </div>
    </div>
  )
}
