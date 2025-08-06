import Link from 'next/link'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='grid grid-rows-2 gap-4 w-full max-w-[600px] mx-auto '>
        <Link 
          href="/auth/signup"
          className='bg-blue-600 text-white text-center py-2 font-semibold rounded-full mx-2 text-base shadow-md shadow-slate-400'>
          Sign Up
        </Link>
        <p className='text-sm sm:text-base text-center'>Already have an account? <Link className='text-blue-600 text-sm sm:text-base sm:hover:underline' href="/auth/login">Login</Link></p>
    </div>
  )
}
