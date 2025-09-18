'use client'
import { useState} from 'react'

export default function FindStart({onDone}) {
    
  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center'>Let's find you a group!</h1>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mt-4 mb-6 px-8 text-center'>Fill out the following questions as accurately as possible so you get the best match.</p>
        <button
            onClick={onDone}
            className='text-base sm:text-lg md:text-xl lg:text-2xl bg-blue-600 text-white py-2 px-4 rounded-full font-semibold w-full max-w-[300px] cursor-pointer'>
                Get Started
        </button>
    </div>
  )
}
