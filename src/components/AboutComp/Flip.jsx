import React from 'react'
import './styles/flip.css'
export default function Flip(props) {
  return (
    <>
      <div className="flip-box w-64 h-64 mx-14 my-8 md:my-0 " >
            <div className="flip-box-inner relative text-center w-full h-full transition-transform duration-700 hover:[transform:rotateY(180deg)]">
              <div className="flip-box-front absolute w-full h-full flex justify-center items-center  ">
                <img
                  className="border-[3px] border-[#6cc0c4] rounded-3xl "
                  src={props.image}
                  alt="Founder"
                  style={{ width: '250px', height: '250px' }}
                />
              </div>
              <div className="flip-box-back  absolute w-full h-full bg-black text-white border-[3px] border-[#6cc0c4] rounded-3xl flex justify-center items-center flex-col text-lg [transform:rotateY(180deg)]">
                <a href={props.linkedin} className='no-underline text-white'>
                  <h2 className='text-3xl font-semibold'>{props.name}</h2>
                  <p className='font-medium'>{props.post}</p>
                </a>
              </div>
            </div>
          </div>
    </>
  )
}
