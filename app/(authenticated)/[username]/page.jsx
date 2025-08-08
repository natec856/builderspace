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

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !user) {
    console.error("User not found or error:", error);
    return notFound();
  }

  return (
    <MainAuth>
      <Header username={username}/>
      <MobileNav username={username}/>
      <ProfileContainer user={user} />
    </MainAuth>
  );
}