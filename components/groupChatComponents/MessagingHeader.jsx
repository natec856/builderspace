import React from 'react'
import Link from 'next/link'

export default function MessagingHeader({groupId, groupName, color}) {

  return (
    <div 
      className="flex items-center w-full py-4 px-4 text-xl text-slate-900 sticky top-0 z-10 slateBottomShadow rounded-b-md"
      style={{backgroundColor: color}}>
      <Link
        href={`/groups`}
        className="bg-slate-900 rounded-md w-6 h-6 flex items-center justify-center text-base shadow-sm">
        <i className="fa-solid fa-arrow-left text-white"></i>
      </Link>
      <span className="mx-2 flex-1 font-bold text-center truncate text-shadow-xs">
        {groupName}
          </span>
      <Link
        href={`/groups/${groupId}/groupFocus`}
        className="bg-slate-900 rounded-md w-6 h-6 flex items-center justify-center text-base shadow-sm">
        <i className="fa-solid fa-arrow-right text-white"></i>
      </Link>
    </div>
  )
}