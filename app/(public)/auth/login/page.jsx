import MainPublic from '@/components/MainPublic'
import React from 'react'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <MainPublic>
      <div className="mx-auto w-full max-w-[500px] flex flex-col items-center text-slate-900 bg-white shadow-md shadow-slate-400 rounded-md h-fit px-4 py-6 mb-36">
        <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>
          Welcome back!
        </h1>
        <form className='flex flex-col w-full px-4 text-base sm:text-lg md:text-xl xl:text-2xl mt-5'>
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
              className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 mb-4 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
              className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 mb-4 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <button formAction={login} className='bg-blue-600 text-white rounded-full py-2 font-semibold text-lg sm:text-xl md:text-2xl hover:cursor-pointer'>
              Login
            </button>
        </form>
        <div className='flex gap-1 text-sm sm:text-base md:text-lg lg:text-xl mt-1'>
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
