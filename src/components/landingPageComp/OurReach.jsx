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
    
    <div ref={containerRef} className="bg-black p-6 border border-white rounded-[10px] mx-auto max-w-[1212px] h-auto sm:p-10">
    <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-4 gap-4 p-[18.14px] mx-[51.55px] my-auto">
      {stats.map((stat, index) => (
        <div key={index} className="bg-transparent p-[27.22px] my-6 rounded-[13.61px] border border-white w-full h-auto">
          <h3 className="text-white text-sm sm:text-base font-medium mb-1 truncate">{stat.title}</h3>
          <p className="text-white text-2xl sm:text-xl font-bold break-words">           {isVisible ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2}
                delay={index * 0.5}
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
  
  )
}