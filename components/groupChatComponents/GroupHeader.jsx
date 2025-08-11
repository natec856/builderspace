import React from 'react'
import Link from 'next/link'
import GroupButtons from './GroupButtons'

export default function GroupHeader({groupId, groupName, color, isEditing, onChange, onEdit, onDone}) {

  return ( 
    <div
      className="flex items-center justify-between px-3 py-4"
      style={{ backgroundColor: color }}>
{/* Left: arrow link/button */}
      <Link
          href={`/groups/${groupId}`}
          className='bg-slate-900 rounded-md w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 flex items-center justify-center mr-auto'>
            <i className='fa-solid fa-arrow-left text-white text-base sm:text-lg'></i>
        </Link>
{/* Center: group name or textarea */}
      <div className="flex-1 flex justify-center">
        {isEditing ? (
          <textarea 
            value={groupName}
            rows={1}
            maxLength={20}
            onChange={(e) => onChange(e.target.value)}
            placeholder='Enter group name'
            className="border-2 border-slate-700 rounded-sm py-1 px-2 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none overflow-hidden text-slate-900 font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl w-full max-w-md mx-4 my-2"
          />
        ):(
          <div className="truncate text-slate-900 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl py-3 text-shadow-sm">
            {groupName}
          </div>
        )}
      </div>
{/* Right: GroupButtons */}
      <div className="flex items-center">
        <GroupButtons 
          isEditing={isEditing} 
          onEdit={onEdit} 
          onDone={onDone} />
      </div>
    </div>
  )
}
