import React from "react"
import MainAuth from "@/components/MainAuth"
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";

export default async function ErrorPage() {
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
      <div className="flex w-full justify-center">
        <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-screen-md mx-2 mt-4 px-4 py-6 flex flex-col items-center gap-4">
          <h1 className="text-lg lg:text-xl font-semibold text-center">Sorry, something went wrong!</h1>
        </div>
      </div>
    </MainAuth>
  )
}