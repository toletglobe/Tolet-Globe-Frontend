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
    <div ref={containerRef} className="bg-black p-6 border border-white rounded-[10px]  max-w-[1212px] h-auto mx-2" >
      <div className="grid grid-cols-1 sm:grid-cols-1 sm:gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-9 mx-auto my-auto lg:gap-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-transparent p-[27.22px] my-6 rounded-[13.61px] border border-white w-full mx-auto min-w-[179.18px] h-auto border-1.34 md:min-w-[150px]">
            <h3 className="text-white text-sm font-medium mb-1 w-full h-auto">{stat.title}</h3>
            <p className="text-white text-2xl font-bold w-full h-auto">
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