import React from 'react'
import Link from 'next/link'

export default function GroupMemberPreview({ username, name }) {
  return (
    <div className="flex items-center justify-between w-full gap-3 border-b border-slate-200 py-2 sm:py-3 hover:bg-slate-50 hover:cursor-pointer"
    >
      {/* User Info container */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="aspect-square w-16 sm:w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          <i className="fa-solid fa-user text-slate-500 text-2xl sm:text-4xl"></i>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-slate-900 truncate whitespace-nowrap overflow-hidden">
            {name}
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 truncate whitespace-nowrap overflow-hidden">
            @{username}
          </div>
        </div>
      </div>

      {/* Buttons container */}
      <div className="flex flex-col md:flex-row gap-2">
        <button className="bg-blue-600 text-white py-1 px-2 md:py-2 md:px-4 font-semibold rounded-md text-sm sm:text-lg">
          Connect
        </button>
        <Link
          href={`/${username}`}
          className="bg-slate-200 text-slate-900 py-1 px-2 md:py-2 md:px-4 font-semibold rounded-md text-sm sm:text-lg text-center"
        >
          View
        </Link>
      </div>
    </div>
  )
}