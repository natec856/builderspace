'use client'

import React, { useState, useMemo } from 'react'
import DesktopChatList from '../chatList/DesktopChatList'
import ChatList from '../chatList/ChatList'
import DesktopChatMessagingContainer from '../chatComponents/DesktopChatMessagingContainer'
import { useSearchParams } from 'next/navigation'

export default function ChatView({ chats, currentUserId }) {

  const searchParams = useSearchParams()
  const providedChatId = searchParams.get('providedChatId')

  // Find group with most recent last_message_date on initial render
  const initialChatId = useMemo(() => {
    if (!chats || chats.length === 0) return null

    // Filter groups that have last_message_date defined, parse to Date
    const chatsWithDates = chats
      .filter(c => c.direct_chats.last_message_date)
      .map(c => ({
        ...c,
        lastMessageDateObj: new Date(c.direct_chats.last_message_date),
      }))
    
    if (chatsWithDates.length === 0) return null

    // Sort descending by date and get first id
    chatsWithDates.sort(
      (a, b) => b.lastMessageDateObj - a.lastMessageDateObj
    )

    return chatsWithDates[0].direct_chats.id || chatsWithDates[0].chatId || null
  }, [chats])

  const [selectedChatId, setSelectedChatId] = useState(providedChatId || initialChatId)

  // Accept the selected group id from child component
  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId)
    console.log(chatId)
  }

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex w-full justify-center">
        <DesktopChatList
          chats={chats} 
          onSelectChat={handleSelectChat} 
        />
        <DesktopChatMessagingContainer
          chatId={selectedChatId}
          currentUserId={currentUserId}
        />
      </div>

      {/* Mobile layout */}
      <div className="md:hidden w-full">
        <ChatList chats={chats}/>
      </div>
    </>
  )
}