'use client'
import { useState} from 'react'

export default function FindStart({onDone}) {
    
  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='font-bold text-xl text-center'>Let's find you a group!</h1>
        <p className='text-sm mt-4 px-8 text-center'>Fill out the following questions as accurately as possible so you get the best match.</p>
        <button
            onClick={onDone}
            className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px] mt-6'>
                Get Started
        </button>
    </div>
  )
}
