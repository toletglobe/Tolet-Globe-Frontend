'use client'

import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

export default function OurReach() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null)

  const stats = [
    { title: "Partnered Universities", value: 20, suffix: "+" },
    { title: "Team Members", value: 300, suffix: "+" },
    { title: "Internships Offered", value: 1500, suffix: "+" },
    { title: "Satisfied Customers", value: 2000, suffix: "+" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full px-4 py-8">
      <div 
        ref={containerRef} 
        className="bg-black p-6 border border-white rounded-[10px] mx-auto max-w-[1212px] h-auto"
      >
        {/* Grid container with responsive classes */}
        <div className="grid grid-cols-1 gap-6
          max-[450px]:mx-2
          min-[450px]:grid-cols-2 min-[450px]:p-[18.14px] min-[450px]:mx-[51.55px]
          lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="border border-white rounded-xl transition-transform
                max-[450px]:p-[27.22px] max-[450px]:my-6 max-[450px]:min-w-[179.18px]
                min-[450px]:p-6 min-[450px]:hover:scale-105"
            >
              <h3 className="text-white text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className="text-white font-bold
                max-[450px]:text-2xl
                min-[450px]:text-3xl">
                {isVisible ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={index * (window.innerWidth <= 450 ? 0.5 : 0.2)}
                    separator=","
                  />
                ) : (
                  '0'
                )}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}