import React from 'react'
import Link from 'next/link'

export default function MessagingHeader({groupId, groupName}) {

  return (
    <div className="flex items-center w-full py-2 px-4 border-b border-slate-300 text-base sm:text-lg text-slate-900 bg-white sticky top-0 z-10">
      <Link
        href={`/groups`}
        className="bg-slate-900 rounded-md w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 flex items-center justify-center">
        <i className="fa-solid fa-arrow-left text-white"></i>
      </Link>
      <span className="mx-2 flex-1 font-bold text-center truncate">
        {groupName}
          </span>
      <Link
        href={`/groups/${groupId}/groupFocus`}
        className="bg-slate-900 rounded-md w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 flex items-center justify-center">
        <i className="fa-solid fa-arrow-right text-white"></i>
      </Link>
    </div>
  )
}