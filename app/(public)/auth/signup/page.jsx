'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from './actions'
import MainPublic from '@/components/MainPublic'
import Link from 'next/link'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await signup(email, password, username)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      // ✅ Redirect to the user's profile page
      router.push(`/${username}?edit=true`)
    }
  }

  return (
    <MainPublic>
      <div className="mx-auto w-full max-w-screen-md flex flex-col items-center text-slate-900 bg-white shadow-md shadow-slate-400 rounded-md h-fit px-4 py-6 md:mt-10 mb-36">
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
          Create an account
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col w-full px-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-5 lg:mt-10'>
          <label htmlFor="email" className='font-semibold'>Email</label>
          <input
            id="email"
            type="email"
            placeholder='Name@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 md:py-3 md:px-3 mb-4 lg:mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <label htmlFor="username" className='font-semibold'>Username</label>
          <input
            id="username"
            type="text"
            placeholder='Enter a username'
            required
            autoComplete='off'
            maxLength={30}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 md:py-3 md:px-3 mb-4 lg:mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <label htmlFor="password" className='font-semibold'>Password</label>
          <input
            id="password"
            type="password"
            placeholder='Password'
            required
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full font-light border-3 border-slate-300 rounded-sm py-2 px-2 md:py-3 md:px-3 mb-4 lg:mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white rounded-full py-2 md:py-4 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>

        <div className='flex gap-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-1'>
          <p>Already have an account?</p>
          <Link
            href={'/auth/login'}
            className='hover:underline text-blue-600'
          >
            Login
          </Link>
        </div>
      </div>
    </MainPublic>
  )
}