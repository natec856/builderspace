'use client'
import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function InvitesButton({ invite_id, currentUserId }) {
  const supabase = createClient()
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // pending, accepted, declined

  console.log(invite_id)

  const handleAccept = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('user_connections')
      .update({ status: 'accepted' })
      .eq('id', invite_id)

    setLoading(false)
    if (error) {
      console.error('Error accepting invite:', error)
      return
    }
    setStatus('accepted')
  }

  const handleDecline = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('user_connections')
      .update({ status: 'declined' })
      .eq('id', invite_id)

    setLoading(false)
    if (error) {
      console.error('Error declining invite:', error)
      return
    }
    setStatus('declined')
    setShowConfirm(false)
  }

  if (status === 'accepted') {
    return <p className="text-green-600 font-semibold">Invite accepted</p>
  }
  if (status === 'declined') {
    return <p className="text-red-600 font-semibold">Invite declined</p>
  }

  return (
    <div className="flex flex-col xl:flex-row gap-2 h-fit">
      <button
        onClick={handleAccept}
        disabled={loading}
        className="bg-blue-600 text-white rounded-md py-1 px-2 lg:py-2 lg:px-4 font-semibold disabled:opacity-50 w-full text-sm sm:text-lg lg:text-xl hover:cursor-pointer"
      >
        Accept
      </button>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="bg-slate-200 text-slate-900 rounded-md py-1 px-2 lg:py-2 lg:px-4 font-semibold disabled:opacity-50 w-full text-sm sm:text-lg lg:text-xl hover:cursor-pointer"
      >
        Decline
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg p-6 max-w-sm md:max-w-md w-full shadow-lg">
            <p className="mb-4 text-white text-center font-semibold md:text-xl">Are you sure you want to decline this invite?</p>
            <div className="flex justify-center gap-3 md:text-xl">
              <button
                onClick={handleDecline}
                disabled={loading}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50 hover:cursor-pointer"
              >
                {loading ? 'Declining...' : 'Yes, Decline'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-slate-200 text-slate-900 font-semibold px-4 py-2 rounded-md shadow-sm hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}