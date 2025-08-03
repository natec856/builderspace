'use client'

import React, { useEffect, useState } from 'react'
import DirectMessagingHeader from './DirectMessagingHeader'
import DirectMessageList from './DirectMessageList'
import DirectMessageInput from './DirectMessageInput'

export default function DirectMessageContainer({
  chatId,
  chatName,
  messages,
  isNewChat,
  onStartChat
}) {
  const [chatMessages, setChatMessages] = useState(messages || [])

  useEffect(() => {
    setChatMessages(messages || [])
  }, [messages])

  return (
    <div className="flex flex-col h-full rounded-md max-h-49/50">
      <DirectMessagingHeader
        chatName={chatName}
        isNewChat={isNewChat}
      />

      <DirectMessageList
        messages={chatMessages}
      />

      <DirectMessageInput
        chatId={chatId}
        messages={chatMessages}
        setChatMessages={setChatMessages}
        isNewChat={isNewChat}
        onStartChat={onStartChat}
      />
    </div>
  )
}
