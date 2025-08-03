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
    <div className="flex flex-col h-full rounded-md max-h-49/50">
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
