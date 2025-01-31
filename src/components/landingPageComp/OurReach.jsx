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
        className="bg-black p-6 border border-white rounded-[10px] mx-auto max-w-[1212px]"
      >
        {/* Modified grid container with mobile-first approach */}
        <div className="grid grid-cols-2 gap-4 max-[450px]:mx-auto max-[450px]:max-w-md min-[450px]:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="border border-white rounded-lg p-4 max-[450px]:aspect-square max-[450px]:flex max-[450px]:flex-col max-[450px]:justify-center min-[450px]:p-6 min-[450px]:hover:scale-105 transition-transform"
            >
              <h3 className="text-white text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className="text-white font-bold text-xl max-[450px]:text-2xl min-[450px]:text-3xl">
                {isVisible ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={index * 0.2}
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