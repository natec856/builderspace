'use client'

import { useState, useEffect } from 'react'
import mockData from '@/public/mockData.json'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import DesktopMessagingHeader from './DesktopGroupMessagingHeader'

export default function DesktopGroupMessagingContainer({ groupId, onFocus }) {
    const [messages, setMessages] = useState([])
    const [group, setGroup] = useState(null)

    useEffect(() => {
        const foundGroup = mockData.find(g => g.groupId === groupId)
        setGroup(foundGroup)
        if (foundGroup?.messages) {
      setMessages(foundGroup.messages)
        }
    }, [groupId])

  if (!group) {
    return (
      
    <div className="w-full max-w-screen-md mt-30 text-slate-500 text-2xl">
      <p className='text-center'>Select a group to view chat</p>
    </div>
    )
  }

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md max-h-[calc(100vh-200px)] h-fit mx-2 mt-4 px-4 mb-35 flex flex-col w-full max-w-screen-md">
        <DesktopMessagingHeader
            groupId={groupId}
            groupName={group.groupName}
            onFocus={onFocus} />
        <MessageList
            messages={messages} />
        <MessageInput
            groupId={groupId}
            messages={messages}
            setMessages={setMessages} />
    </div>
  )
}