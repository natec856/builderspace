import MainAuth from "@/components/MainAuth";
import ChatView from "@/components/generalComponents/ChatView";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "BuilderSpace",
};

export default async function ChatListPage() {
  const supabase = await createClient();

  // Get authenticated user
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

  // Get groups that user is part of
  const { data: userChats, error: chatsError } = await supabase
  .from("user_chats")
  .select(`
    name,
    avatar_url,
    direct_chats(id, last_message, last_message_date)
  `)
  .eq("user_id", authUser.id);

  if (chatsError) {
    console.error("Error fetching groups:", chatsError);
    return notFound();
  }

  console.log(userChats)

  return (
    <MainAuth>
      <Header username={userRecord.username} />
      <MobileNav username={userRecord.username} />
      <ChatView
        chats={userChats}
        currentUserId={userRecord.id}
        currentUserUsername={userRecord.username} />
    </MainAuth>
  );
}