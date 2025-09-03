import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GroupFocusButtons from './GroupFocusButtons'

export default function GroupMemberPreview({ user_id, name, username, avatar_url, currentUserUsername }) {
  return (
    <div className="flex items-center justify-between w-full gap-3 border-b min-h-[80px] border-slate-200 px-4 py-2 sm:px-6 sm:py-3"
    >
      {/* User Info container */}
      <div className="flex items-center gap-3 min-w-0">
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
        <div className="flex flex-col lg:flex-row gap-2 h-fit">
          <GroupFocusButtons
             user_id={user_id}/>
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