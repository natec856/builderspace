import React from 'react'
import Link from 'next/link'

export default function MessagingHeader({groupId, groupName, color}) {

  return (
    <div 
      className="flex items-center w-full py-4 px-4 text-xl text-slate-900 sticky top-0 z-10 slateBottomShadow rounded-b-md"
      style={{backgroundColor: color}}>
      <Link href={`/groups`}>
        <i className="fa-solid fa-chevron-left text-shadow-sm"></i>
      </Link>
      <span className="mx-2 flex-1 font-bold text-center truncate text-shadow-xs">
        {groupName}
          </span>
      <Link href={`/groups/${groupId}/groupFocus`}>
        <i className="fa-solid fa-chevron-right text-shadow-sm"></i>
      </Link>
    </div>
  )
}