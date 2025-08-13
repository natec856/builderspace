import ProfileContainer from "@/components/profileComponents/ProfileContainer";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import MainAuth from "@/components/MainAuth";

export const metadata = {
  title: "BuilderSpace",
};

export default async function ProfilePage({ params }) {
  const { username } = await params;

  const supabase = await createClient();

  // 1️⃣ Get the logged-in user from the server
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    console.error("Auth error:", authError);
    return notFound();
  }

  let currentUsername = null;

  if (authUser) {
    const { data: currentUserData } = await supabase
      .from("users")
      .select("username")
      .eq("id", authUser.id)
      .single();

    currentUsername = currentUserData?.username || null;
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
      <Header username={currentUsername} />
      <MobileNav username={currentUsername} />
      <ProfileContainer user={viewedUser} />
    </MainAuth>
  );
}
