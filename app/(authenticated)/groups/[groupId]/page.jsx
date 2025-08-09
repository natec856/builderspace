import { notFound } from 'next/navigation'
import mockData from '@/public/mockData.json'
import GroupMessaging from '@/components/groupChatComponents/GroupMessagingContainer';
import MainAuth from '@/components/MainAuth';
import Header from '@/components/generalComponents/Header';
import MobileNav from '@/components/generalComponents/MobileNav';
import { createClient } from '@/utils/supabase/server';

export default async function GroupPage({ params }) {
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

  const { groupId } = await params;
  const group = mockData.find(group => group.groupId === groupId);
  
  if (!group) {
    return notFound();
  }

  return (
    <MainAuth>
      <Header username={userRecord.username}/>
      <MobileNav username={userRecord.username}/>
      <GroupMessaging groupId={groupId} />
    </MainAuth>
  )
}