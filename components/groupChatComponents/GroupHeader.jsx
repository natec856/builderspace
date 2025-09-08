import React from 'react'
import Link from 'next/link'
import GroupButtons from './GroupButtons'

export default function GroupHeader({groupId, groupName, color, isEditing, onChange, onEdit, onDone}) {

  return ( 
    <div
      className="flex items-center w-full justify-between text-slate-900 p-4 text-xl mb-2 slateBottomShadow"
      style={{ backgroundColor: color }}
    >
      {/* Left: arrow link/button */}
      <Link 
        href={`/groups/${groupId}`}
        className='w-6 h-6 sm:w-10 sm:h-10'>
        <i className="fa-solid fa-chevron-left text-shadow-sm"></i>
      </Link>

      {/* Center: group name or textarea */}
      <div className="max-w-md w-full flex justify-center">
        {isEditing ? (
          <textarea
            value={groupName}
            rows={1}
            maxLength={30}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // stops newline insertion
              }
            }}
            placeholder="Enter group name"
            className="border-2 border-slate-700 rounded-sm px-2 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none overflow-hidden text-slate-900 font-bold text-center w-full max-w-md mx-4"
          />
        ) : (
          <div className="mx-2 flex-1 font-bold text-center truncate text-shadow-xs items-center justify-center">
            {groupName}
          </div>
        )}
      </div>

      {/* Right: GroupButtons */}
      <div className="flex items-center">
        <GroupButtons isEditing={isEditing} onEdit={onEdit} onDone={onDone} />
      </div>
    </div>

  )
}
