import React from 'react'
import './styles/flip.css'
export default function Flip(props) {
   return (
      <>
         <div className="flip-box w-64 h-64 mx-14 my-8 md:my-0 sm:mb-16 " >
            <div className="flip-box-inner relative text-center transition-transform duration-700 flex justify-center ">
               <div className="flip-box-front absolute flex justify-center items-center  ">
                  <img className=" border-[3px] border-[#6cc0c4] rounded-3xl"
                     src={props.image}
                     alt="Founder"
                  />
               </div>
               <div className="flip-box-back absolute w-full bg-black text-white border-[3px] border-[#6cc0c4] rounded-3xl flex justify-center items-center flex-col md:text-lg py-0">
                  <a href={props.linkedin} className='no-underline text-white'>
                     <h2 className=' font-semibold'>{props.name}</h2>
                     <p className='font-medium'>{props.post}</p>
                  </a>
               </div>
            </div>
         </div>
      </>
   )
}