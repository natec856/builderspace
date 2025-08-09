import MainAuth from "@/components/MainAuth";
import FindGroupsContainer from "@/components/findGroups/FindGroupsContainer";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
    title: "BuilderSpace",
  };

export default async function FindGroupsPage() {
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
  

  return (
    <MainAuth>
      <Header username={userRecord.username} />
      <MobileNav username={userRecord.username} />
      <FindGroupsContainer />
    </MainAuth>
  )
}
