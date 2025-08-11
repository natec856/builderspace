import MainAuth from "@/components/MainAuth";
import GroupView from "@/components/generalComponents/GroupView";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "BuilderSpace",
};

export default async function GroupListPage() {
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

  // Get groups that user is part of, including joined_date
  const { data: userGroups, error: groupsError } = await supabase
  .from("user_groups")
  .select(`
    joined_at,
    groups ( 
      id,
      name,
      description,
      last_message,
      last_message_date,
      color
    )
  `)
  .eq("user_id", authUser.id);

  if (groupsError) {
    console.error("Error fetching groups:", groupsError);
    return notFound();
  }

  // Map to an array of objects combining group data and joined_date
  const groupsWithJoinDate = userGroups.map((ug) => ({
    ...ug.groups,
    joined_date: ug.joined_date,
  }));

  return (
    <MainAuth>
      <Header username={userRecord.username} />
      <MobileNav username={userRecord.username} />
      <GroupView 
        groups={groupsWithJoinDate}
        currentUserId={userRecord.id}
        currentUserUsername={userRecord.username} />
    </MainAuth>
  );
}