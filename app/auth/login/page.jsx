import Main from '@/components/Main'
import React from 'react'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <Main>
      <div className='flex flex-col items-center text-slate-900 bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1'>
        <h1 className='font-bold text-xl mb-6'>
          Welcome back!
        </h1>
        <form className='flex flex-col w-full max-w-[300px] mb-2'>
            <label 
              htmlFor="email"
              className='text-base'>
                Email:
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder='Name@example.com'
              required 
              autoComplete="off"
              className="border border-slate-300 rounded-sm py-1 px-2 mb-4 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <label 
              htmlFor="password"
              className='text-base'>
                Password:
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder='Enter password'
              required 
              autoComplete="off"
              className="border border-slate-300 rounded-sm py-1 px-2 mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <button formAction={login} className='bg-blue-600 text-white rounded-full py-2 text-base font-semibold'>Login</button>
        </form>
        <div className='flex gap-1'>
          <p>Don't have an account yet?</p>
          <Link
          href={'/auth/signup'}
          className='hover:underline text-blue-600'>
            Sign Up
          </Link>
        </div>
      </div>
    </Main>
  )
}
