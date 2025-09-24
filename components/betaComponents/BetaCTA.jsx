'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function BetaCTA() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    setLoading(true)

    const { error } = await supabase.from('waitlist').insert([{ email }])

    setLoading(false)

    if (error) {
      console.error('Insert Error:', error)
      setErrorMessage('Database error saving your email: ' + error.message)
    } else {
      setSubmitted(true)
      setEmail('') // clear input
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full md:max-w-[500px] lg:max-w-[600px] mx-auto sm:px-4 py-6 sm:py-10">
      {submitted ? (
        <div className="text-center text-lg font-semibold text-green-700">
          Thanks for joining the waitlist! We’ll be in touch as soon as there are enough users to make the groups worth your while.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900'>
            **Only 100 spots available**
          </h1>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full font-light border-3 border-blue-300 rounded-sm py-3 px-3 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white text-center py-3 sm:py-4 md:py-5 font-semibold rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg transition transform hover:scale-[1.02] ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Joining...' : 'Join the Waitlist Now!'}
          </button>
          <p className='text-slate-900 font-semibold text-base md:text-lg text-center'>We'll reach out as soon as groups are ready...</p>
          {errorMessage && (
            <div className="text-red-600 font-medium mt-2">Looks like your already signed up! We'll reach out when groups are ready.</div>
          )}
        </form>
      )}
    </div>
  )
}
