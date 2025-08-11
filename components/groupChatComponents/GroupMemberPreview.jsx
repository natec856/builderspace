import React from 'react'
import Link from 'next/link'

export default function GroupMemberPreview({ username, currentUserUsername, name, avatar_url }) {
  return (
    <div className="flex items-center justify-between w-full gap-3 border-b min-h-[80px] border-slate-200 px-4 py-2 sm:px-6 sm:py-3"
    >
      {/* User Info container */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="aspect-square w-14 sm:w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          {avatar_url ? (
            <img
                src={avatar_url}
                alt="Profile"
                className="w-full h-full object-cover"
            />
            ) : (
            <i className="fa-solid fa-user text-slate-500 text-2xl sm:text-4xl" />
            )}
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
      {currentUserUsername === username ? (
        <></>
      ):(
        <div className="flex flex-col md:flex-row gap-2 h-fit">
          <button className="bg-blue-600 text-white py-1 px-2 md:py-2 md:px-4 font-semibold rounded-md text-sm sm:text-lg lg:text-xl hover:cursor-pointer">
            Connect
          </button>
          <Link
            href={`/${username}`}
            className="bg-slate-200 text-slate-900 py-1 px-2 md:py-2 md:px-4 font-semibold rounded-md text-sm sm:text-lg lg:text-xl text-center"
          >
            View
          </Link>
        </div>
      )}
    </div>
  )
}