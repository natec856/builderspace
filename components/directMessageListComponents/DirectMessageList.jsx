'use client'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import DirectMessagePreview from './DirectMessagePreview'
import DirectMessageSearch from './DirectMessageSearch'

export default function DirectMessageList({ dummyDirectMessages }) {

  let chatId = null

    const [searchTerm, setSearchTerm] = useState('');

    const filteredDirectMessages = useMemo(() => {
        return dummyDirectMessages.filter(chat =>
            chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, dummyDirectMessages])
    
  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-full max-h-[400px] md:max-h-[450px] xl:max-h-[500px] 2xl:max-h-[1000px] overflow-y-scroll max-w-full mx-2 mt-4 px-4 py-6 mb-5 flex-1">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl sm:text-3xl font-bold">Messages</h1>
        <Link
          href={`directMessages/${chatId}`}>
          <i className='fa-solid fa-edit text-blue-600 text-lg ml-auto mr-2'></i>
        </Link>
      </div>
      
      <DirectMessageSearch onSearch={setSearchTerm} />
      <ul>
        {filteredDirectMessages.map(chat => (
          <li key={chat.chatId}>
            <DirectMessagePreview
              chatId={chat.chatId}
              chatName={chat.chatName}
              lastMessage={chat.lastMessage}
              lastMessageDate={chat.lastMessageDate}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
