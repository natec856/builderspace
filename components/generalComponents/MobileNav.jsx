'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function MobileNav() {
  const supabase = createClient()
  const [currentUser, setCurrentUser] = useState(null)
  const [username, setUsername] = useState(null)

  // Helper to fetch username by user ID
  const fetchUsername = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Failed to fetch username:', error.message)
      setUsername(null)
    } else {
      setUsername(data?.username || null)
    }
  }

  useEffect(() => {
    // Initial user fetch on mount
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      setCurrentUser(authUser)
      if (authUser) fetchUsername(authUser.id)
      else setUsername(null)
    })

    // Listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user || null
      setCurrentUser(user)
      if (user) fetchUsername(user.id)
      else setUsername(null)
    })

    // Cleanup on unmount
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  if (!currentUser) return null

  return (
    <nav className="sm:hidden left-0 w-full flex flex-col z-50 shadow-sm relative">
      {/* Top Nav Icons */}
      <div className="grid grid-cols-3 justify-around items-center pt-3 pb-2 px-4">
        <Link href="/findGroups" className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-search text-xl"></i>
          <span className="text-xs">Find Groups</span>
        </Link>

        <Link href="/groups" className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-users text-xl"></i>
          <span className="text-xs">Groups</span>
        </Link>

        <Link href={`/${username}`} className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-user text-center text-xl"></i>
          <span className="text-xs">Profile</span>
        </Link>

      </div>
    </nav>
  )
}