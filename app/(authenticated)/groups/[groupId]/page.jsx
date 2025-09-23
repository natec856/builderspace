import { notFound } from "next/navigation";
import GroupMessagingContainer from "@/components/groupChatComponents/GroupMessagingContainer";
import MainAuth from "@/components/MainAuth";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import { createClient } from "@/utils/supabase/server";

export default async function GroupPage({ params }) {
  // params is a plain object, no await needed
  const { groupId } = await params;

  // createClient() is async so await it
  const supabase = await createClient();

  // Get authenticated user from Supabase Auth
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    console.error("Auth error:", authError);
    return notFound();
  }

  // Get user record from 'users' table
  const { data: userRecord, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (userError || !userRecord) {
    console.error("User not found or error:", userError);
    return notFound();
  }

  return (
    <MainAuth>
      <Header 
        username={userRecord.username}
        avatar_url={userRecord.avatar_url} />
      <MobileNav 
        username={userRecord.username}
        avatar_url={userRecord.avatar_url} />
      <GroupMessagingContainer 
        groupId={groupId}
        currentUser={authUser.id} />
    </MainAuth>
  );
}