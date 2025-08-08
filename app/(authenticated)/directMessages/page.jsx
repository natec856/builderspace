import React from 'react'
import DirectMessageList from '@/components/directMessageListComponents/DirectMessageList'
import MainAuth from '@/components/MainAuth'

export default function DirectMessagesPage() {
  const dummyDirectMessages = [
    {
        chatId: 'sdfhj39576', 
        chatName: 'Alex',
        lastMessage: "Let's set up a Teams call",
        lastMessageDate: '2025-07-21T12:12:00Z',
    },
    {
        chatId: 'drgsjl237596', 
        chatName: 'Peter',
        lastMessage: "Let's go to RJs on thursday for karaoke night then maybe red square",
        lastMessageDate: '2025-07-22T12:12:00Z'
    },
  ]
  return (
    <MainAuth>
        <DirectMessageList
        dummyDirectMessages={dummyDirectMessages} />
    </MainAuth>
  )
}
