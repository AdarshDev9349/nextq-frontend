'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'

type GroupVariants = {
  container?: Variants
  item?: Variants
}

export const AnimatedGroup = ({
  children,
  className = '',
  variants,
}: {
  children: React.ReactNode
  className?: string
  variants?: GroupVariants
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants?.container}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div variants={variants?.item} key={index}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
