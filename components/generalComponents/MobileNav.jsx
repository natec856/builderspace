import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function MobileNav({username, avatar_url}) {
  return (
    <nav className="sm:hidden left-0 w-full flex flex-col z-50 shadow-sm relative bg-white">
      <div className="grid grid-cols-4 justify-around items-center py-3 px-4">
        <Link href="/findGroups" className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-search text-xl"></i>
        </Link>
        <Link href="/groups" className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-users text-xl"></i>
        </Link>
        <Link href="/directChat" className="flex flex-col items-center gap-1 text-slate-900">
          <i className="fa-solid fa-message text-center text-xl"></i>
        </Link>
        <Link href={`/${username}`} className="flex flex-col items-center gap-1 text-slate-900">
          {avatar_url ? (
            <div className='w-7 h-7 rounded-full overflow-hidden relative'>
              <Image
                src={avatar_url}
                alt="Profile"
                fill
                sizes="(max-width: 640px) 32px,
                        (max-width: 1024px) 40px,
                        (max-width: 1280px) 64px,
                        (max-width: 1536px) 80px,
                        80px"
                className="object-cover"
              />
            </div>
          ):(
            <i className='fa-solid fa-user'></i>
          )}
        </Link>
      </div>
    </nav>
  )
}