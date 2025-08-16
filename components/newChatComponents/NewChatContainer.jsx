'use client'
import React, { useState, useEffect } from 'react'
import NewChatList from './NewChatList'
import { createClient } from '@/utils/supabase/client'

export default function NewChatContainer({ user, onChatSelected }) {
    const supabase = createClient()
  const [connections, setConnections] = useState([])

  useEffect(() => {
    async function fetchConnections() {
      const { data, error } = await supabase
        .from('user_connections')
        .select(`
          id,
          user_id,
          connection_id,
          status,
          created_at,
          last_Message,
          last_Message_Date,
          other_user:users!user_connections_connection_id_fkey (id, name, username, avatar_url),
          other_user_alt:users!user_connections_user_id_fkey (id, name, username, avatar_url)
        `)
        .or(`user_id.eq.${user.id},connection_id.eq.${user.id}`) // ✅ only the user's connections
        .eq('status', 'accepted')

      if (error) {
        console.error('Error fetching connections:', error)
        return
      }

      const normalized = (data || []).map((conn) => {
        let other
        if (conn.user_id === user.id) {
          other = conn.other_user
        } else {
          other = conn.other_user_alt
        }
        return { ...conn, other }
      })

      setConnections(normalized)
    }

    fetchConnections()
  }, [supabase, user.id])

  return (
    <div className="flex flex-col items-center bg-white shadow-md shadow-slate-400 rounded-md h-fit py-6">
      <NewChatList
        connections={connections}
        currentUserUsername={user.username}
        currentUserId={user.id}
        currentUserName={user.name}
        currentUserAvatarUrl={user.avatar_url}
        onChatSelected={onChatSelected} />
    </div>
  )
}