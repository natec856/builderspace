'use client'

import { useState, useEffect } from 'react'
import mockData from '@/public/mockData.json'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import MessagingHeader from './MessagingHeader'

export default function GroupMessagingContainer({ groupId }) {
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
    return <p className="text-center text-slate-500">Group not found</p>
  }

  return (
    <div className="bg-white shadow-md shadow-slate-400 flex flex-col rounded-md max-h-[calc(100vh-100px)] h-fit mt-5">
        <MessagingHeader
            groupId={groupId}
            groupName={group.groupName} />
        <MessageList
            messages={messages} />
        <MessageInput
            groupId={groupId}
            messages={messages}
            setMessages={setMessages} />
    </div>
  )
}
