'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Image from 'next/image'

export default function ImageHoverScanner({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before image',
  afterAlt = 'After image',
  className = '',
}: {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackW, setTrackW] = useState(0)
  const x = useMotionValue(0)
  const controls = useRef<ReturnType<typeof animate> | null>(null)

  // measure container
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const apply = () => {
      const w = el.clientWidth
      setTrackW(w)
      x.set(w / 2) // default at center
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [x])

  const clipPath = useTransform(x, (v) => `inset(0 0 0 ${v}px)`)

  // Start scanning on hover (always left → right)
  const startScan = () => {
    if (!trackW) return
    controls.current?.stop()
    controls.current = animate(x, [0, trackW], {
      duration: 3, // scanning speed
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    })
  }

  // Stop scanning → reset to center
 const stopScan = () => {
  controls.current?.stop()
  controls.current = animate(x, trackW / 2, {
    duration: 0.6,   // how fast it goes back to center
    ease: 'linear',  // smooth linear motion
  })
}

  return (
    <div
      ref={trackRef}
      className={`relative  overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={startScan}
      onMouseLeave={stopScan}
    >
       {/* before image (top, clipped by scanning line) */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath }}
      >
           <Image
        width={1200}
        height={800}
        src={beforeSrc}
        alt={beforeAlt}
        className="block h-full w-full object-cover select-none"
        draggable={false}
      />
       
      </motion.div>

      {/* after image (bottom, always visible) */}
   
 <Image
          width={1200}
          height={800}
          src={afterSrc}
          alt={afterAlt}
          className="block h-full w-full object-cover select-none"
          draggable={false}
        />
     
      {/* Thin glass scanning line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] bg-white/30 
                   shadow-[0_0_8px_rgba(255,255,255,0.9)] 
                   pointer-events-none"
        style={{ left: x }}
      />
    </div>
  )
}
