'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import ChatMessagingHeader from './ChatMessagingHeader'
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

export default function ChatMessagingContainer({ chatId, currentUser }) {
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
              user_chats(
                name,
                avatar_url
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
            .single()
    
          if (!isMounted) return
    
          if (error) {
            setError(error)
            setChat(null)
            setMessages([])
          } else if (data) {
            setChat({
              id: data.id,
              chatName: data.user_chats.name,
              avatar_url: data.user_chats.avatar_url,
              last_message: data.last_message,
              last_message_date: formatTimestamp(data.last_message_date),
            })
            setMessages(data.messages || [])
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
    <div className="bg-white shadow-md flex flex-col max-h-[calc(100vh-100px)] h-fit">
        <ChatMessagingHeader
          chatName={chat.chatName} />
        <ChatMessageList
          messages={messages}
          currentUserId={currentUser} />
        <ChatMessageInput
          chatId={chatId}
          currentUserId={currentUser}
          setMessages={setMessages} />
    </div>
  )
}