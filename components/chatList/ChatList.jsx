'use client'
import React, { useState, useMemo } from 'react'
import ChatSearchBar from './ChatSearchBar'
import ChatPreview from './ChatPreview'
import NewChatContainer from '../newChatComponents/NewChatContainer'

export default function ChatList({chats, user}) {

  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  
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

  const handleNewChatSelected = (chatId) => {
    onSelectChat(chatId)        // ✅ Tell parent to set this chat active
    setIsOpen(false)            // ✅ Close modal after selection
  }

  return (
    <>
      <div className="bg-white shadow-md shadow-slate-400 rounded-md mx-2 mt-4 px-3 py-4 mb-5 flex-1">
        <div className='flex justify-between text-lg sm:text-xl md:text-2xl lg:text-3xl'>
          <h1 className="font-bold">Direct Chats</h1>
          <i className='fa-solid fa-plus' onClick={() => setIsOpen(true)}></i>
        </div>
        <ChatSearchBar onSearch={setSearchTerm} />
        <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll scrollbar-hide">
          {filteredChats.length === 0 && <li>No chats found</li>}
          {filteredChats.map((chat) => (
            <li key={chat.direct_chats.id}>
              <ChatPreview
                chatId={chat.direct_chats.id}
                chatName={chat.name}
                lastMessage={chat.direct_chats.last_message || ''}
                lastMessageDate={chat.direct_chats.last_message_date || ''}
                avatar_url={chat.avatar_url} />
            </li>
          ))}
        </ul>
      </div>
{/* New Chat Modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {/* Modal header */}
            <h2 className="font-bold text-slate-900">
              Create a New Chat
            </h2>

            {/* Modal body */}
            <div className="max-h-[70vh] overflow-y-auto">
              <NewChatContainer 
                user={user} 
                onChatSelected={handleNewChatSelected} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}