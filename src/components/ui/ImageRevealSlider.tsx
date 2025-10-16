'use client'

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Image from 'next/image'

export default function ImageRevealSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before image',
  afterAlt = 'After image',
  className = '',
  initial = 50,
  handleSize = 44,
  showSliderButton = false,
  showPercentageBadge = true,
}: {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
  initial?: number
  handleSize?: number
  showSliderButton?:boolean
  showPercentageBadge?:boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLElement | Window | null>(null)
  const [trackW, setTrackW] = useState(0)
  const x = useMotionValue(0)
  const half = handleSize / 2
  const handleX = useTransform(x, (v) => v - half)
  const [percent, setPercent] = useState(initial)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)

  const clamp = useCallback((v: number, min: number, max: number) => Math.min(Math.max(v, min), max), [])

  // Find the nearest scrollable container
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    
    let parent = el.parentElement
    while (parent && parent !== document.body) {
      const style = window.getComputedStyle(parent)
      if (style.overflowY === 'scroll' || style.overflowY === 'auto' || style.overflow === 'scroll' || style.overflow === 'auto') {
        scrollContainerRef.current = parent
        break
      }
      parent = parent.parentElement
    }
    
    if (!scrollContainerRef.current) {
      scrollContainerRef.current = window
    }
  }, [])

  // Measure track width
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const apply = () => {
      const w = el.clientWidth
      setTrackW(w)
      const startPx = (clamp(initial, 0, 100) / 100) * w
      x.set(startPx)
      setPercent((startPx / w) * 100)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [initial, clamp, x])

  // Update percent in real-time
  useEffect(() => {
    const unsub = x.on('change', (px) => {
      if (!trackW) return
      const clamped = clamp(px, 0, trackW)
      setPercent((clamped / trackW) * 100)
    })
    return () => unsub()
  }, [x, trackW, clamp])

  // Click anywhere on track
  const onTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging.current) return
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const target = clamp(e.clientX - rect.left, 0, rect.width)
      animate(x, target, { type: 'spring', bounce: 0, duration: 0.35 })
    },
    [x, clamp]
  )

  // Keyboard navigation
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!trackW) return
      const step = Math.max(1, Math.round(trackW / 100))
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next = x.get() + (e.key === 'ArrowLeft' ? -step : step)
        x.set(clamp(next, 0, trackW))
      }
      if (e.key === 'Home') {
        e.preventDefault()
        x.set(0)
      }
      if (e.key === 'End') {
        e.preventDefault()
        x.set(trackW)
      }
    },
    [trackW, x, clamp]
  )

  const handleStyle = useMemo<React.CSSProperties>(
    () => ({ width: handleSize, height: handleSize, willChange: 'transform' }),
    [handleSize]
  )

  // Enhanced scroll-to-reveal that works with any scrollable container
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging.current || !trackW) return
      
      const el = trackRef.current
      if (!el) return
      
      const rect = el.getBoundingClientRect()
      const container = scrollContainerRef.current
      
      let visible = 0
      
      if (container === window || !container) {
        // Window scroll behavior
        const vh = window.innerHeight
        visible = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
      } else {
        // Container scroll behavior
        const containerRect = (container as HTMLElement).getBoundingClientRect()
        const containerHeight = containerRect.height
        const relativeTop = rect.top - containerRect.top
        const relativeBottom = relativeTop + rect.height
        
        if (relativeTop <= 0 && relativeBottom >= containerHeight) {
          // Element spans entire container
          visible = 0.5
        } else if (relativeTop >= 0 && relativeBottom <= containerHeight) {
          // Element fully visible
          visible = (relativeTop + rect.height / 2) / containerHeight
        } else if (relativeTop < 0) {
          // Element entering from top
          visible = Math.max(0, relativeBottom / containerHeight)
        } else {
          // Element entering from bottom
          visible = Math.min(1, (containerHeight - relativeTop) / containerHeight)
        }
      }
      
      x.set(visible * trackW)
    }

    const container = scrollContainerRef.current
    if (container === window || !container) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    } else {
      (container as HTMLElement).addEventListener('scroll', handleScroll, { passive: true })
    }
    
    handleScroll() // Initial call
    
    return () => {
      if (container === window || !container) {
        window.removeEventListener('scroll', handleScroll)
      } else {
        (container as HTMLElement).removeEventListener('scroll', handleScroll)
      }
    }
  }, [trackW, x])

  const beforeWidth = useTransform(x, (v) => `${clamp(v, 0, trackW)}px`)

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="relative w-full overflow-hidden rounded-2xl"
        onClick={onTrackClick}
        aria-label="Before and after image comparison"
        role="group"
      >
        {/* After image */}
        <Image width={1200} height={800} src={afterSrc} alt={afterAlt} className="block h-full w-full object-cover select-none" draggable={false} />

        {/* Before image */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none will-change-[width]"
          style={{ width: beforeWidth }}
        >
          <Image width={1200} height={800} src={beforeSrc} alt={beforeAlt} className="block h-full w-full object-cover select-none" draggable={false} />
        </motion.div>

        {/* Divider */}
        <motion.div className="absolute inset-y-0 pointer-events-none" style={{ x }}>
          <div className="h-full w-1 bg-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
        </motion.div>

        {/* Handle */}
        {showSliderButton && (  
        <motion.button
          suppressHydrationWarning
          type="button"
          aria-label="Drag to reveal"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          className="absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center rounded-full bg-white shadow-lg outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          drag="x"
          dragConstraints={{ left: -half, right: trackW - half }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={(event) => {
            isDragging.current = true
            const rect = trackRef.current!.getBoundingClientRect()
            dragStartX.current = rect.left
          }}
          onDragEnd={() => {
            isDragging.current = false
          }}
          onDrag={(event, info) => {
            if (!trackRef.current) return
            const rect = trackRef.current.getBoundingClientRect()
            const relativeX = info.point.x - rect.left
            const newX = clamp(relativeX, 0, trackW)
            x.set(newX)
          }}
          style={{
            ...handleStyle,
            x: handleX
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onKeyDown={onKeyDown}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </motion.button>
        )}
      </div>

      {/* Percentage badge */}
      {showPercentageBadge && (
         <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white">
        {Math.round(percent)}%
      </div>
        )}
     
    </div>
  )
}