import { notFound } from "next/navigation";
import MainAuth from "@/components/MainAuth";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import { createClient } from "@/utils/supabase/server";
import ChatMessagingContainer from "@/components/chatComponents/ChatMessagingContainer";

export default async function ChatPage({ params }) {
  // params is a plain object, no await needed
  const { chatId } = await params;

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
    .select("username")
    .eq("id", authUser.id)
    .single();

  if (userError || !userRecord) {
    console.error("User not found or error:", userError);
    return notFound();
  }

  return (
    <MainAuth>
      <Header username={userRecord.username} />
      <MobileNav username={userRecord.username} />
      <ChatMessagingContainer
        chatId={chatId}
        currentUser={authUser.id} />
    </MainAuth>
  );
}