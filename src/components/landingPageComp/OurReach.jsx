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
    <div className="w-full px-4 py-8 lg:px-[79.69px] lg:py-[39.85px] flex justify-center items-center">
      {/* Mobile View */}
      <div 
        ref={containerRef} 
        className="bg-black p-[15px] border border-white rounded-[10px] mx-auto w-[381px] h-auto flex flex-col gap-[15px] justify-center items-center lg:hidden"
      >
        <div className="flex gap-[15px] w-full justify-center">
          {stats.slice(0, 2).map((stat, index) => (
            <div 
              key={index} 
              className="border border-white rounded-[9.05px] p-[18.1px] min-w-[119.19px] w-[166px] h-[85.75px] flex flex-col justify-center items-start gap-[6.03px]"
            >
              <h3 className="text-white text-[12.07px] font-[400] leading-[18.1px] font-poppins w-full">
                {stat.title}
              </h3>
              <p className="text-white font-bold text-xl w-full">
                {isVisible ? (
                  <CountUp start={0} end={stat.value} duration={2} delay={index * 0.2} separator="," />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-[15px] w-full justify-center">
          {stats.slice(2, 4).map((stat, index) => (
            <div 
              key={index} 
              className="border border-white rounded-[9.05px] p-[18.1px] min-w-[119.19px] w-[166px] h-[85.75px] flex flex-col justify-center items-start gap-[6.03px]"
            >
              <h3 className="text-white text-[12.07px] font-[400] leading-[18.1px] font-poppins w-full">
                {stat.title}
              </h3>
              <p className="text-white font-bold text-xl w-full">
                {isVisible ? (
                  <CountUp start={0} end={stat.value} duration={2} delay={(index + 2) * 0.2} separator="," />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Laptop and Tablet View (Unchanged) */}
      <div
        ref={containerRef}
        className="w-[1212px] h-[241.25px] bg-black border border-[#C8C8C8] rounded-[10px] px-[79.69px] py-[55px] relative hidden lg:flex justify-center items-center mx-auto"
      >
        <div className="grid grid-cols-4 gap-[18.15px] w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-[90%] min-w-[179.18px] h-[128.77px] border border-white rounded-[13.61px] p-[27.22px] flex flex-col gap-[9.07px] transition-transform duration-300 hover:scale-105"
            >
              <div className="w-[192.84px] h-[28px] flex items-center">
                <h3 className="text-white text-lg font-medium text-center truncate">
                  {stat.title}
                </h3>
              </div>
              <div className="w-[192.84px] h-[35px] flex items-center">
                <p className="text-white font-bold text-[27.22px] leading-[34.02px] work-sans font-[700]">
                  {isVisible ? (
                    <CountUp start={0} end={stat.value} duration={2} delay={index * 0.2} separator="," />
                  ) : (
                    "0"
                  )}
                  <span className="text-lg ml-1">{stat.suffix}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>  
    </div>
  )
}
