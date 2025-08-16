'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ConnectionsPreview({
  connectionUser_id,
  connectionUsername,
  connectionName,
  connectionAvatar_url,
  currentUserUsername,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl
}) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleMessageClick = async () => {
    if (loading) return
    setLoading(true)

    try {
      // 1) find chat that contains BOTH users
      const { data: chats, error: chatsError } = await supabase
        .from('user_chats')
        .select('chat_id')
        .in('user_id', [currentUserId, connectionUser_id])

      if (chatsError) throw chatsError

      const counts = {}
      for (const c of (chats ?? [])) counts[c.chat_id] = (counts[c.chat_id] || 0) + 1
      let chatId = Object.keys(counts).find(id => counts[id] === 2)

      // 2) create chat if missing
      if (!chatId) {
        const { data: newChat, error: createError } = await supabase
          .from('direct_chats')
          .insert({
            last_message: '',
            last_message_date: new Date().toISOString(),
            created_by: currentUserId
          })
          .select('id')   // now allowed by the SELECT policy above
          .single()

        if (createError) throw createError

        const { error: linkErr } = await supabase
          .from('user_chats')
          .insert([
            { chat_id: newChat.id, user_id: currentUserId,       name: connectionName, avatar_url: connectionAvatar_url },
            { chat_id: newChat.id, user_id: connectionUser_id,   name: currentUserName, avatar_url: currentUserAvatarUrl }
          ])
        if (linkErr) throw linkErr

        chatId = newChat.id
      }

      // 3) route
      if (window.innerWidth < 768) router.push(`/directChat/${chatId}`)
      else router.push(`/directChat?providedChatId=${chatId}`)
    } catch (err) {
      console.error('start message error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between w-full gap-3 border-b min-h-[80px] border-slate-200 py-2 lg:py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="aspect-square w-14 sm:w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          {connectionAvatar_url ? (
            <img src={connectionAvatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <i className="fa-solid fa-user text-slate-500 text-2xl sm:text-4xl" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-slate-900 truncate">{connectionName}</div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 truncate">@{connectionUsername}</div>
        </div>
      </div>

      {currentUserUsername === connectionUsername ? null : (
        <div className="flex flex-col xl:flex-row gap-2 h-fit">
          <button onClick={handleMessageClick} disabled={loading}
            className="sm:hidden bg-blue-600 text-white py-1 px-2 lg:py-2 lg:px-4 font-semibold rounded-md text-sm sm:text-lg lg:text-xl disabled:opacity-50">
            Message
          </button>
          <button onClick={handleMessageClick} disabled={loading}
            className="hidden sm:flex bg-blue-600 text-white py-1 px-2 lg:py-2 lg:px-4 font-semibold rounded-md text-sm sm:text-lg lg:text-xl disabled:opacity-50">
            Message
          </button>
          <Link href={`/${connectionUsername}`}
            className="bg-slate-200 text-slate-900 py-1 px-2 lg:py-2 lg:px-4 font-semibold rounded-md text-sm sm:text-lg lg:text-xl text-center">
            View
          </Link>
        </div>
      )}
    </div>
  )
}