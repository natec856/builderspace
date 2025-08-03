'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      router.push('/protected')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1">
        <h2 className="text-2xl font-semibold mb-2">Reset Your Password</h2>
        <p className="text-gray-600 mb-6">Please enter your new password below.</p>
        <form onSubmit={handleForgotPassword} className="flex flex-col gap-6">
            <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    New password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="New password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save new password'}
          </button>
        </form>
    </div>
  )
}