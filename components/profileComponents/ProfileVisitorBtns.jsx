'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ProfileVisitorBtns({ user_id }) {
  const [isConnected, setIsConnected] = useState(false)
  const [invited, setInvited] = useState(false)
  const [pendingFromOther, setPendingFromOther] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function checkConnection() {
      const {
        data: { user: currentUser },
        error: userError
      } = await supabase.auth.getUser()

      if (userError || !currentUser) {
        setIsConnected(false)
        setInvited(false)
        setPendingFromOther(false)
        return
      }

      const { data: connectionData } = await supabase
        .from('user_connections')
        .select('id,user_id,connection_id,status')
        .or(
          `and(user_id.eq.${currentUser.id},connection_id.eq.${user_id}),and(user_id.eq.${user_id},connection_id.eq.${currentUser.id})`
        )
        .limit(1)
        .maybeSingle()

      if (!connectionData) {
        setIsConnected(false)
        setInvited(false)
        setPendingFromOther(false)
        return
      }

      if (connectionData.status === 'accepted') {
        setIsConnected(true)
        setInvited(false)
        setPendingFromOther(false)
      } else if (connectionData.status === 'pending') {
        if (connectionData.connection_id === currentUser.id) {
          // current user is recipient → show "Accept"
          setPendingFromOther(true)
          setInvited(false)
        } else {
          // current user is sender → show "Requested"
          setPendingFromOther(false)
          setInvited(true)
        }
        setIsConnected(false)
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

  async function handleAccept() {
    setLoading(true)
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('user_connections')
      .update({ status: 'accepted' })
      .eq('connection_id', currentUser.id)
      .eq('user_id', user_id)

    if (error) {
      alert('Failed to accept connection. Please try again.')
      setLoading(false)
      return
    }

    setIsConnected(true)
    setPendingFromOther(false)
    setLoading(false)
  }

  return (
    <div className="flex w-full items-center justify-center text-center text-sm sm:text-lg lg:text-xl">
      {isConnected ? (
        <Link
          href={`/directMessages`}
          className="bg-slate-200 text-slate-900 rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold w-full"
        >
          Message
        </Link>
      ) : pendingFromOther ? (
        <button
          onClick={handleAccept}
          disabled={loading}
          className="bg-blue-600 text-white rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold w-full hover:cursor-pointer"
        >
          {loading ? 'Accepting...' : 'Accept'}
        </button>
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
