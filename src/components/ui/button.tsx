'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'|  'outline'
  size?: 'sm' | 'lg'| 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'lg', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none'
    const sizeStyles = {
      sm: 'h-9 px-3 text-sm rounded-md',
      lg: 'h-11 px-6 text-base rounded-xl',
      icon: 'h-10 w-10 rounded-full',
    }

    const variantStyles = {
      default: 'bg-foreground text-background hover:bg-foreground/90',
      ghost: 'bg-transparent hover:bg-muted text-foreground',
      outline: 'bg-transparent border border-foreground hover:bg-muted text-foreground',
      

    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
