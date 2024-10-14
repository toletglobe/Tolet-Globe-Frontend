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
    <div ref={containerRef} className="bg-black p-6 border border-white rounded-lg mx-2 sm:mx-4 md:mx-6 lg:mx-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-transparent p-4 rounded-md border border-white">
            <h3 className="text-white text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-white text-2xl font-bold">
              {isVisible ? (
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