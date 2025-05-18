'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import NavbarDemo from '@/components/ui/navbar'



const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}
export default function HeroSection() {


  return (
    <>
      <NavbarDemo />
      <main className="bg-background text-foreground overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            {/* Background Image */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <Image
                src="https://res.cloudinary.com/dqj0v4x2g/image/upload/v1698230005/hero-bg"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width={3276}
                height={4095}
              />
            </AnimatedGroup>

            {/* Radial overlay */}
            <div className="absolute inset-0 -z-10 size-full bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />

            <div className="mx-auto max-w-7xl px-6 text-center sm:mx-auto lg:mr-auto">
              {/* Heading */}
              <TextEffect
               
                speedSegment={0.3}
                as="h1"
                className="mt-8 text-balance text-5xl sm:text-6xl md:text-6xl lg:mt-16 xl:text-[4.25rem] leading-tight font-bold"
              >
                Revolutionizing Exam Preparation with AI
              </TextEffect>

              {/* Description */}
              <TextEffect
            
                
                speedSegment={0.1}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg md:text-xl text-muted-foreground"
              >
                Utilize AI and Retrieval-Augmented Generation (RAG) for automated exam paper
                creation and notes summarization. Streamlining exam preparation and enhancing
                learning efficiency.
              </TextEffect>

              {/* Buttons */}
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row"
              >
                <div className="bg-foreground/10 rounded-xl border p-0.5">
                  <AnimatedGroup variants={transitionVariants}>
                    <Link
                      href="/auth/signup"
                      className="group mx-auto flex w-fit items-center gap-6 rounded-full bg-background p-1 pl-4 shadow-md transition-colors duration-300 hover:bg-accent"
                    >
                      <span className="text-sm md:text-base font-medium text-white transition-colors duration-300 group-hover:text-black">
                        Get Started
                      </span>

                      <div className="relative size-10 flex rounded-full overflow-hidden bg-white transition-colors duration-500 group-hover:bg-black">
                        <div className="absolute inset-0 flex w-20 -translate-x-1/2 transform transition-transform duration-500 ease-in-out group-hover:translate-x-0">
                          <ArrowRight color="white" className="size-5 m-auto" />
                          <ArrowRight color="black" className="size-5 m-auto" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedGroup>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
