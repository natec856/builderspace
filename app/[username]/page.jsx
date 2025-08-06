import Main from "@/components/Main";
import ProfileContainer from "@/components/profileComponents/ProfileContainer";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
    <Main>
      <ProfileContainer user={user} />
    </Main>
  );
}