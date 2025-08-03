import Link from 'next/link'
import React from 'react'

export default function MobileNav() {
//test username 
  const username="NateC32"

  const loggedIn = true

  if (!loggedIn) return null;

  return (
    <nav className="sm:hidden left-0 w-full flex flex-col z-50">
      
      {/* Top Nav Icons */}
      <div className="grid grid-cols-4 justify-around items-center pt-3 pb-2 px-4 shadow-sm shadow-slate-300">
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

        <Link href="/directMessages" className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-message text-xl"></i>
          <span className="text-xs">DMs</span>
        </Link>
      </div>
    </nav>
  )
}
