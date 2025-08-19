import React from "react"
import MainAuth from "@/components/MainAuth"
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";
import Link from "next/link";

export default async function notFound() {
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
      <div className='flex flex-col items-center justify-center mt-5 lg:mt-10 gap-5 lg:gap-10'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900'>404 Error: Page not found</h1>
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900'>Whoops, something went wrong!</p>
        <Link href={`/${userRecord.username}`} className='bg-blue-600 text-white font-semibold rounded-full text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-10 py-5'>Go Home</Link>
      </div>
    </MainAuth>
  )
}