import MainPublic from '@/components/MainPublic'
import React from 'react'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <MainPublic>
      <div className="mx-auto w-full max-w-screen-md flex flex-col items-center text-slate-900 bg-white shadow-md shadow-slate-400 rounded-md h-fit px-4 py-6 md:mt-10 mb-36">
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
          Welcome back!
        </h1>
        <form className='flex flex-col w-full px-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-5 lg:mt-10'>
            <label 
              htmlFor="email"
              className='font-semibold'>
                Email:
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder='Name@example.com'
              required 
              autoComplete="on"
              className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 md:py-3 md:px-3 mb-4 lg:mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <label 
              htmlFor="password"
              className='font-semibold'>
                Password:
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder='Enter password'
              required 
              autoComplete="off"
              className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 md:py-3 md:px-3 mb-4 lg:mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <button formAction={login} className='bg-blue-600 text-white rounded-full py-2 md:py-4 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Login</button>
        </form>
        <div className='flex gap-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-1'>
          <p>Don't have an account yet?</p>
          <Link
          href={'/auth/signup'}
          className='hover:underline text-blue-600'>
            Sign Up
          </Link>
        </div>
      </div>
    </MainPublic>
  )
}
