import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import InvitesButton from './InvitesButton'

export default function InvitesPreview({ invite_id, username, name, avatar_url, currentUserUsername, currentUserId }) {
  return (
    <div className="flex items-center justify-between w-full gap-3 border-b border-slate-200 py-2 lg:py-3 xl:py-4 h-fit">
      {/* User Info container */}
      <div className="flex items-center gap-3 min-w-0">
        <div className='flex items-center justify-center shrink-0 ml-1'>
          <div 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-500 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm shadow-slate-400">
              {avatar_url ? (
                <div className='w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden relative'>
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
                <div className='flex flex-col items-center justify-center w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden relative'>
                  <i className='fa-solid fa-user'></i>
                </div>
              )}
          </div>
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