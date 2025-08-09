'use client'
import { notFound } from 'next/navigation'
import DirectMessagingContainer from '@/components/directMessagesComponents/DirectMessageContainer'
import { useState } from 'react';
import MainAuth from '@/components/MainAuth';
import Header from '@/components/generalComponents/Header';
import MobileNav from '@/components/generalComponents/MobileNav';
import { createClient } from '@/utils/supabase/server';

export default async function ChatPage({ params }) {
  const supabase = await createClient();
      // Get the currently authenticated user
        const { 
          data: {user: authUser}, 
          error: authError 
        } = await supabase.auth.getUser()
      
        if (authError || ! authUser) {
          console.error("Auth error:", authError)
          return notFound()
        }
      // Get the user record of the authenticated user from the 'users' table
          const { 
            data: userRecord, 
            error: userError 
          } = await supabase
            .from("users")
            .select("*")
            .eq("id", authUser.id)
            .single();
        
          if (userError || !userRecord) {
            console.error("User not found or error:", error);
            return notFound();
          }

  const { chatId } = await params;
  const dummyDirectMessages = [
    {
        chatId: 'sdfhj39576', 
        chatName: 'Alex',
        lastMessage: "Let's set up a Teams call",
        lastMessageDate: '2025-07-21T12:12:00Z',
        messages: [
            {
            "id": 1,
            "text": "Hey was nice meeting you in the group, i have some more questions",
            "sender": "Alex",
            "timestamp": "2025-07-21T10:00:00Z"
            },
            {
            "id": 2,
            "text": "Yeah same here, what's up?",
            "sender": "You",
            "timestamp": "2025-07-21T10:05:00Z"
            },
            {
            "id": 3,
            "text": "I'm working on marketing my saas app, any tips that have been working well for you?",
            "sender": "Alex",
            "timestamp": "2025-07-22T11:09:00Z"
            }
        ],
    },
    {
        chatId: 'drgsjl237596', 
        chatName: 'Peter',
        lastMessage: "Let's go to RJs",
        lastMessageDate: '2025-07-22T12:12:00Z',
        messages: [
            {
            "id": 1,
            "text": "yo whats up my neighbor?",
            "sender": "Alex",
            "timestamp": "2025-07-21T10:00:00Z"
            },
            {
            "id": 2,
            "text": "Ohhh herro peter!",
            "sender": "You",
            "timestamp": "2025-07-21T10:05:00Z"
            },
            {
            "id": 3,
            "text": "I'm trying to market myself as a dj, I was wondering if you'd be willing to meet to brainstorm some ideas",
            "sender": "Alex",
            "timestamp": "2025-07-22T11:09:00Z"
            }
        ],
    },
]

  const chat = dummyDirectMessages.find(chat => chat.chatId === chatId);
  const [isNewChat, setIsNewChat] = useState(!chat)
  
  const handleStartChat = () => {
    setIsNewChat(false)
  }

  return (
    <MainAuth>
      <Header username={userRecord.username} />
      <MobileNav username={userRecord.username} />
      <DirectMessagingContainer 
        chatId={chatId}
        chatName={chat?.chatName ?? 'New Chat'}
        messages={chat?.messages ?? []}
        isNewChat={isNewChat}
        onStartChat={handleStartChat} />
    </MainAuth>
  )
}