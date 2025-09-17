import ProfileContainer from "@/components/profileComponents/ProfileContainer";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import MainAuth from "@/components/MainAuth";

export const metadata = {
  title: "Skocoh",
};

export default async function ProfilePage({ params }) {
  const { username } = await params;

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


  // 2️⃣ Get the profile being viewed
  const { data: viewedUser, error: viewedError } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (viewedError || !viewedUser) {
    console.error("User not found or error:", viewedError);
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
      <ProfileContainer user={viewedUser} />
    </MainAuth>
  );
}