import React from 'react'
import DirectMessageList from '@/components/directMessageListComponents/DirectMessageList'
import MainAuth from '@/components/MainAuth'
import Header from '@/components/generalComponents/Header'
import MobileNav from '@/components/generalComponents/MobileNav'
import { createClient } from '@/utils/supabase/server'

export default async function DirectMessagesPage() {
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
      <Header username={userRecord.username} />
      <MobileNav username={userRecord.username} />
      <DirectMessageList
        dummyDirectMessages={dummyDirectMessages} />
    </MainAuth>
  )
}
