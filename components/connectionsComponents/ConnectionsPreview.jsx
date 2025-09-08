'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
            { chat_id: newChat.id, user_id: currentUserId, name: connectionName, username: connectionUsername, avatar_url: connectionAvatar_url },
            { chat_id: newChat.id, user_id: connectionUser_id, name: currentUserName, username:currentUserUsername, avatar_url: currentUserAvatarUrl }
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
        <div className='flex items-center justify-center shrink-0 ml-1'>
        <div 
          className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-500 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm shadow-slate-400">
            {connectionAvatar_url ? (
              <div className='w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden relative'>
                <Image
                  src={connectionAvatar_url}
                  alt="Profile"
                  fill
                  quality={100}
                  sizes="(max-width: 640px) 64px,
                        (max-width: 1024px) 80px,
                        (max-width: 1280px) 96px,
                        (max-width: 1536px) 96px,
                        96px"
                  className="object-cover"
                />
              </div>
            ):(
              <div className='flex flex-col items-center justify-center w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden relative'>
                <i className='fa-solid fa-user'></i>
              </div>
            )}
        </div>
      </div>
        <div className="flex flex-col min-w-0">
          <div className="font-bold text-base sm:text-lg md:text-xl xl:text-2xl text-slate-900 truncate">{connectionName}</div>
          <div className="text-sm sm:text-base md:text-lg xl:text-2xl text-slate-600 truncate">@{connectionUsername}</div>
        </div>
      </div>

      {currentUserUsername === connectionUsername ? null : (
        <div className="flex flex-col 2xl:flex-row gap-2 h-fit">
          <button onClick={handleMessageClick} disabled={loading}
            className="sm:hidden bg-blue-600 text-white py-1 px-2 lg:py-2 lg:px-4 font-semibold rounded-md text-sm sm:text-lg lg:text-xl disabled:opacity-50 cursor-pointer">
            Message
          </button>
          <button onClick={handleMessageClick} disabled={loading}
            className="hidden sm:flex bg-blue-600 text-white py-1 px-2 xl:py-2 xl:px-4 font-semibold rounded-md text-sm sm:text-lg xl:text-xl disabled:opacity-50 cursor-pointer">
            Message
          </button>
          <Link href={`/${connectionUsername}`}
            className="bg-slate-200 text-slate-900 py-1 px-2 xl:py-2 xl:px-4 font-semibold rounded-md text-sm sm:text-lg xl:text-xl text-center"> 
            View
          </Link>
        </div>
      )}
    </div>
  )
}