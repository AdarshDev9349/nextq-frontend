'use client'

import { motion } from 'framer-motion'
import React from 'react'

export const AnimatedGroup = ({
  children,
  className = '',
  variants,
}: {
  children: React.ReactNode
  className?: string
  variants?: any
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants?.container}
    >
      {React.Children.map(children, (child, index) =>
        <motion.div variants={variants?.item} key={index}>
          {child}
        </motion.div>
      )}
    </motion.div>
  )
}
