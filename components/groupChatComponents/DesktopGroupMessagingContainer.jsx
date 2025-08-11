'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import DesktopMessagingHeader from './DesktopGroupMessagingHeader'

// Utility to safely format timestamp strings
function formatTimestamp(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date)) return ''
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DesktopGroupMessagingContainer({ groupId, currentUser, onFocus }) {
  const [group, setGroup] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!groupId) {
      setGroup(null)
      setMessages([])
      setError(null)
      setLoading(false)
      return
    }

    const supabase = createClient()
    let isMounted = true

    async function fetchGroupAndMessages() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('groups')
        .select(`
          id,
          name,
          last_message,
          last_message_date,
          messages (
            id,
            content,
            created_at,
            user_id,
            user:users!messages_user_id_fkey (
              id,
              name
            )
          )
        `)
        .eq('id', groupId)
        .single()

      if (!isMounted) return

      if (error) {
        setError(error)
        setGroup(null)
        setMessages([])
      } else if (data) {
        setGroup({
          id: data.id,
          groupName: data.name,
          last_message: data.last_message,
          last_message_date: formatTimestamp(data.last_message_date),
        })
        setMessages(data.messages || [])
      }

      setLoading(false)
    }

    fetchGroupAndMessages()

    // Inside your useEffect, replace this block:
  const messageListener = supabase
    .channel('public:messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `group_id=eq.${groupId}`
      },
      (payload) => {
        if (!isMounted) return
        setMessages((current) => {
          const exists = current.some(msg => msg.id === payload.new.id)
          return exists ? current : [...current, payload.new]
        })
      }
    )
    .subscribe()


    return () => {
      isMounted = false
      supabase.removeChannel(messageListener)
    }
  }, [groupId])

  if (!groupId) {
    return (
      <div className="w-full max-w-screen-md mt-30 text-slate-500 text-2xl">
        <p className="text-center">Select a group to view chat</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-screen-md mt-30 text-slate-500 text-2xl">
        <p className="text-center">Loading group...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-screen-md mt-30 text-red-500 text-2xl">
        <p className="text-center">Error loading group: {error.message}</p>
      </div>
    )
  }

  if (!group) return null

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md max-h-[calc(100vh-200px)] h-fit mx-2 mt-4 px-4 mb-35 flex flex-col w-full max-w-screen-md">
      <DesktopMessagingHeader
        groupName={group.groupName}
        onFocus={onFocus}
      />
      <MessageList 
        messages={messages}
        currentUserId={currentUser} />
      <MessageInput 
        groupId={groupId} 
        currentUser={currentUser}
        messages={messages} 
        setMessages={setMessages} />
    </div>
  )
}