'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ProfileVisitorBtns({ user_id }) {

  const [isConnected, setIsConnected] = useState(false)
  const [invited, setInvited] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function checkConnection() {
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !currentUser) {
        setIsConnected(false)
        setInvited(false)
        return
      }

      // Check accepted connection
      const { data: acceptedData, error: acceptedError } = await supabase
        .from('user_connections')
        .select('*')
        .or(
          `and(user_id.eq.${currentUser.id},connection_id.eq.${user_id}),and(user_id.eq.${user_id},connection_id.eq.${currentUser.id})`
        )
        .eq('status', 'accepted')
        .limit(1)
        .single()

      if (acceptedError || !acceptedData) {
        setIsConnected(false)
      } else {
        setIsConnected(true)
      }

      // Check pending connection
      const { data: pendingData, error: pendingError } = await supabase
        .from('user_connections')
        .select('*')
        .or(
          `and(user_id.eq.${currentUser.id},connection_id.eq.${user_id}),and(user_id.eq.${user_id},connection_id.eq.${currentUser.id})`
        )
        .eq('status', 'pending')
        .limit(1)
        .single()

      if (pendingError || !pendingData) {
        setInvited(false)
      } else {
        setInvited(true)
      }
    }

    checkConnection()
  }, [supabase, user_id])

  async function handleInvite() {
    setLoading(true)
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !currentUser) {
      alert('You must be logged in to send a connection request.')
      setLoading(false)
      return
    }

    // Check if connection or request already exists
    const { data: existing, error: existingError } = await supabase
      .from('user_connections')
      .select('*')
      .or(
        `and(user_id.eq.${currentUser.id},connection_id.eq.${user_id}),and(user_id.eq.${user_id},connection_id.eq.${currentUser.id})`
      )
      .limit(1)
      .single()

    if (existing) {
      // If pending, set invited true; if accepted, set connected true
      if (existing.status === 'pending') {
        setInvited(true)
      } else if (existing.status === 'accepted') {
        setIsConnected(true)
      }
      setLoading(false)
      return
    }

    // Insert new pending connection request
    const { error: insertError } = await supabase.from('user_connections').insert([
      {
        user_id: currentUser.id,
        connection_id: user_id,
        status: 'pending',
      },
    ])

    if (insertError) {
      alert('Failed to send connection request. Please try again.')
      setLoading(false)
      return
    }

    setInvited(true)
    setLoading(false)
  }

  return (
    <div className="flex w-full items-center justify-center text-sm sm:text-lg lg:text-xl">
      {isConnected ? (
        <Link
          href={`/directMessages`}
          className="bg-slate-200 text-slate-900 rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold w-full"
        >
          Message
        </Link>
      ) : invited ? (
        <button
          disabled
          className="bg-slate-200 text-slate-900 rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold cursor-not-allowed w-full"
        >
          Requested
        </button>
      ) : (
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-blue-600 text-white rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold disabled:opacity-50 w-full"
        >
          {loading ? 'Sending...' : 'Connect'}
        </button>
      )}
    </div>
  )
}