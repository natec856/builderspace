'use client'
import React, { useState, useMemo } from 'react'
import DesktopChatPreview from './DesktopChatPreview'
import ChatSearchBar from './ChatSearchBar'

export default function DesktopChatList({ onSelectChat, chats }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredChats = useMemo(() => {
    if (!chats) return []

    // Create a copy and sort by last_message_date descending
    const sortedChats = [...chats].sort((a, b) => {
      const dateA = a.direct_chats.last_message_date ? new Date(a.direct_chats.last_message_date).getTime() : 0
      const dateB = b.direct_chats.last_message_date ? new Date(b.direct_chats.last_message_date).getTime() : 0
      return dateB - dateA
    })

    // Then filter by search term
    return sortedChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, chats])

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md w-full min-w-[350px] max-w-[500px] mx-2 mt-4 px-4 py-6 mb-35 flex-1 h-fit">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Direct Chats</h1>
      <ChatSearchBar onSearch={setSearchTerm} />

      <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
        {filteredChats.length === 0 && <li>No chats found</li>}
        {filteredChats.map((chat) => (
          <li key={chat.direct_chats.id}>
            <DesktopChatPreview
              chatId={chat.direct_chats.id}
              chatName={chat.name}
              lastMessage={chat.direct_chats.last_message || ''}
              lastMessageDate={chat.direct_chats.last_message_date || ''}
              avatar_url={chat.avatar_url}
              onClick={() => onSelectChat(chat.direct_chats.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}