'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from './actions'
import Main from '@/components/Main'
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
    <Main>
      <div className='flex flex-col items-center text-slate-900 text-base bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1'>
        <h1 className='font-bold text-xl mb-6'>
          Create an account
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-[300px] mb-2'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder='Name@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-sm py-1 px-2 mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder='Enter a username'
            required
            autoComplete='off'
            maxLength={30}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-slate-300 rounded-sm py-1 px-2 mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder='Password'
            required
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300 rounded-sm py-1 px-2 mb-8 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-full ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>

        <div className='flex gap-1 text-sm'>
          <p>Already have an account?</p>
          <Link
            href={'/auth/login'}
            className='hover:underline text-blue-600'
          >
            Login
          </Link>
        </div>
      </div>
    </Main>
  )
}