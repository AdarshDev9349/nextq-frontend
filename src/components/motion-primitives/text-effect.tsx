'use client'

import { motion } from 'framer-motion'
import React, { JSX } from 'react'

export const TextEffect = ({
  as: Tag = 'span',
  className = '',
 
  speedSegment = 0.3,
  delay = 0,
  children,
 
}: {
  as?: keyof JSX.IntrinsicElements
  className?: string

  speedSegment?: number
  delay?: number
  
  children: string
}) => {
  const words = children.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * speedSegment,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
