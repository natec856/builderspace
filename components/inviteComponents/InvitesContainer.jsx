'use client'

import React, { useEffect, useState } from 'react'
import InvitesList from './InvitesList'
import { createClient } from '@/utils/supabase/client'

export default function InvitesContainer({ user }) {
  const supabase = createClient()
  const [invites, setInvites] = useState([])

  useEffect(() => {
    async function fetchInvites() {
      const { data, error } = await supabase
        .from('user_connections')
        .select(`
          id,
          user_id (
            username,
            name,
            avatar_url
          ),
          connection_id,
          status,
          created_at,
          other_user:users!user_connections_connection_id_fkey (id, name, username, avatar_url)
        `)
        .eq('connection_id', user.id)       // only invites created by current user
        .eq('status', 'pending')      // only pending ones
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching invites:', error)
        return
      }

      // Here, `other_user` will always be the connection target since user_id is always current user
      const normalized = (data || []).map((conn) => ({
        ...conn,
        other: conn.other_user
      }))

      setInvites(normalized)
    }

    fetchInvites()
  }, [supabase, user.id])

  return (
    <div className="flex flex-col items-center bg-white shadow-md shadow-slate-400 rounded-md h-fit px-4 py-6">
      <InvitesList 
        invites={invites}
        currentUserUsername={user.username}
        currentUserId={user.id} />
    </div>
  )
}