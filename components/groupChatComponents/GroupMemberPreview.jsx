import React from 'react'
import Link from 'next/link'

export default function GroupMemberPreview({ userId, username, name }) {
  return (
    <Link
      href={`/${username}`}
      className="flex items-center gap-3 border-b border-slate-200 py-2 sm:py-3 hover:bg-slate-50 hover:cursor-pointer"
    >
      <div className="aspect-square w-16 sm:w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center relative shrink-0">
        <i className="fa-solid fa-user text-slate-500 text-2xl sm:text-4xl"></i>
      </div>

      <div className="flex flex-col min-w-0">
        <div className="font-bold sm:text-xl text-slate-900 truncate whitespace-nowrap overflow-hidden">
          {name}
        </div>
        <div className="text-sm text-slate-600 truncate whitespace-nowrap overflow-hidden">
          @{username}
        </div>
      </div>
    </Link>
  )
}
