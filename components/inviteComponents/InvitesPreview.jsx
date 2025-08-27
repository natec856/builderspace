import React from 'react'
import Link from 'next/link'
import InvitesButton from './InvitesButton'

export default function InvitesPreview({ invite_id, username, name, avatar_url, currentUserUsername, currentUserId }) {
  return (
    <div className="flex items-center justify-between w-full gap-3 border-b border-slate-200 py-2 lg:py-3 xl:py-4 h-fit">
      {/* User Info container */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="aspect-square w-14 sm:w-20 lg:w-16 xl:w-20 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
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
          <Link
            href={`/${username}`}
            className="font-bold text-base sm:text-lg md:text-xl xl:text-2xl text-slate-900 truncate hover:underline"
          >
            {name}
          </Link>
          <div className="text-sm sm:text-base md:text-lg xl:text-2xl text-slate-600 truncate">
            @{username}
          </div>
        </div>
      </div>

      {/* Buttons container */}
      {currentUserUsername === username ? null : (
        <div className='h-fit'>
          <InvitesButton
            invite_id={invite_id}
            currentUserId={currentUserId}
          />
        </div>
      )}
    </div>
  )
}