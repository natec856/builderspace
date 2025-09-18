'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import DesktopChatMessagingHeader from './DesktopChatMessagingHeader'
import ChatMessageList from './ChatMessageList'
import ChatMessageInput from './ChatMessageInput'

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

export default function DesktopChatMessagingContainer({ chatId, currentUserId }) {
  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!chatId) {
      setChat(null)
      setMessages([])
      setError(null)
      setLoading(false)
      return
    }

    const supabase = createClient()
    let isMounted = true

    async function fetchChatAndMessages() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('direct_chats')
        .select(`
          id,
          last_message,
          last_message_date,
          user_chats!inner (
            user_id,
            name,
            username
          ),
          direct_messages (
            id,
            content,
            created_at,
            user_id,
            user:users!direct_messages_user_id_fkey (
              id,
              name
            )
          )
        `)
        .eq('id', chatId)
        .eq('user_chats.user_id', currentUserId)
        .single()

      if (!isMounted) return

      if (error) {
        setError(error)
        setChat(null)
        setMessages([])
      } else if (data) {
        setChat({
          id: data.id,
          chatName: data.user_chats?.[0]?.name || '',
          chatUser: data.user_chats?.[0]?.username || '',
          last_message: data.last_message,
          last_message_date: formatTimestamp(data.last_message_date),
        })
        setMessages(data.direct_messages || [])
      }

      setLoading(false)
    }

    fetchChatAndMessages()

    // Inside your useEffect, replace this block:
  const messageListener = supabase
    .channel('public:direct_messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'direct_messages',
        filter: `chat_id=eq.${chatId}`
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
  }, [chatId])

  if (!chatId) {
    return (
      <div className="w-full max-w-screen-md mt-30 text-slate-500 text-2xl">
        <p className="text-center">Select a chat to view</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-screen-md mt-30 text-slate-500 text-2xl">
        <p className="text-center">Loading chat...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-screen-md mt-30 text-red-500 text-2xl">
        <p className="text-center">Error loading chat: {error.message}</p>
      </div>
    )
  }

  if (!chat) return null

  return (
    <div className="bg-white rounded-md h-[calc(100vh-100px)] mx-2 mt-4 mb-35 flex flex-col w-full max-w-screen-md 2xl:max-w-screen-lg shadow-md shadow-slate-400">
      <DesktopChatMessagingHeader
        chatName={chat.chatName}
        chatUser={chat.chatUser} />
      <ChatMessageList
        chatName={chat.chatName}
        messages={messages}
        currentUserId={currentUserId} />
      <ChatMessageInput
        chatId={chatId} 
        currentUserId={currentUserId}
        setMessages={setMessages} />
    </div>
  )
}