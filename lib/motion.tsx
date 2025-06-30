"use client"

import React from 'react'

type MotionProps = {
  initial?: Record<string, any>
  animate?: Record<string, any>
  transition?: Record<string, any>
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

// Simple motion implementation that doesn't require installing framer-motion
export const motion = {
  div: ({ initial, animate, transition, className, children, ...props }: MotionProps) => {
    const ref = React.useRef<HTMLDivElement>(null)
    
    React.useEffect(() => {
      if (ref.current && animate) {
        const element = ref.current
        const duration = transition?.duration || 0.3
        const delay = transition?.delay || 0
        
        setTimeout(() => {
          Object.entries(animate).forEach(([key, value]) => {
            switch(key) {
              case 'opacity':
                element.style.opacity = String(value)
                break
              case 'y':
                element.style.transform = `translateY(${value}px)`
                break
              case 'x':
                element.style.transform = `translateX(${value}px)`
                break
              case 'scale':
                element.style.transform = `scale(${value})`
                break
            }
          })
        }, delay * 1000)
        
        element.style.transition = `all ${duration}s ease`
        
        if (initial) {
          Object.entries(initial).forEach(([key, value]) => {
            switch(key) {
              case 'opacity':
                element.style.opacity = String(value)
                break
              case 'y':
                element.style.transform = `translateY(${value}px)`
                break
              case 'x':
                element.style.transform = `translateX(${value}px)`
                break
              case 'scale':
                element.style.transform = `scale(${value})`
                break
            }
          })
        }
      }
    }, [ref, animate, initial, transition])
    
    return (
      <div 
        ref={ref} 
        className={className}
        style={{
          opacity: initial?.opacity,
          transform: initial?.y ? `translateY(${initial.y}px)` : 
                   initial?.x ? `translateX(${initial.x}px)` : 
                   initial?.scale ? `scale(${initial.scale})` : undefined,
          ...props.style
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
  h1: ({ initial, animate, transition, className, children, ...props }: MotionProps) => {
    const ref = React.useRef<HTMLHeadingElement>(null)
    
    React.useEffect(() => {
      if (ref.current && animate) {
        const element = ref.current
        const duration = transition?.duration || 0.3
        const delay = transition?.delay || 0
        
        setTimeout(() => {
          Object.entries(animate).forEach(([key, value]) => {
            switch(key) {
              case 'opacity':
                element.style.opacity = String(value)
                break
              case 'y':
                element.style.transform = `translateY(${value}px)`
                break
              case 'x':
                element.style.transform = `translateX(${value}px)`
                break
              case 'scale':
                element.style.transform = `scale(${value})`
                break
            }
          })
        }, delay * 1000)
        
        element.style.transition = `all ${duration}s ease`
        
        if (initial) {
          Object.entries(initial).forEach(([key, value]) => {
            switch(key) {
              case 'opacity':
                element.style.opacity = String(value)
                break
              case 'y':
                element.style.transform = `translateY(${value}px)`
                break
              case 'x':
                element.style.transform = `translateX(${value}px)`
                break
              case 'scale':
                element.style.transform = `scale(${value})`
                break
            }
          })
        }
      }
    }, [ref, animate, initial, transition])
    
    return (
      <h1 
        ref={ref} 
        className={className}
        style={{
          opacity: initial?.opacity,
          transform: initial?.y ? `translateY(${initial.y}px)` : 
                   initial?.x ? `translateX(${initial.x}px)` : 
                   initial?.scale ? `scale(${initial.scale})` : undefined,
          ...props.style
        }}
        {...props}
      >
        {children}
      </h1>
    )
  },
  p: ({ initial, animate, transition, className, children, ...props }: MotionProps) => {
    const ref = React.useRef<HTMLParagraphElement>(null)
    
    React.useEffect(() => {
      if (ref.current && animate) {
        const element = ref.current
        const duration = transition?.duration || 0.3
        const delay = transition?.delay || 0
        
        setTimeout(() => {
          Object.entries(animate).forEach(([key, value]) => {
            switch(key) {
              case 'opacity':
                element.style.opacity = String(value)
                break
              case 'y':
                element.style.transform = `translateY(${value}px)`
                break
              case 'x':
                element.style.transform = `translateX(${value}px)`
                break
              case 'scale':
                element.style.transform = `scale(${value})`
                break
            }
          })
        }, delay * 1000)
        
        element.style.transition = `all ${duration}s ease`
        
        if (initial) {
          Object.entries(initial).forEach(([key, value]) => {
            switch(key) {
              case 'opacity':
                element.style.opacity = String(value)
                break
              case 'y':
                element.style.transform = `translateY(${value}px)`
                break
              case 'x':
                element.style.transform = `translateX(${value}px)`
                break
              case 'scale':
                element.style.transform = `scale(${value})`
                break
            }
          })
        }
      }
    }, [ref, animate, initial, transition])
    
    return (
      <p 
        ref={ref} 
        className={className}
        style={{
          opacity: initial?.opacity,
          transform: initial?.y ? `translateY(${initial.y}px)` : 
                   initial?.x ? `translateX(${initial.x}px)` : 
                   initial?.scale ? `scale(${initial.scale})` : undefined,
          ...props.style
        }}
        {...props}
      >
        {children}
      </p>
    )
  }
}