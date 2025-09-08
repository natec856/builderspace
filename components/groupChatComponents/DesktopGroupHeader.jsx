import React from 'react'
import GroupButtons from './GroupButtons'

export default function GroupHeader({ groupName, color, isEditing, onChange, onEdit, onDone, onMessage }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-8 rounded-t-md text-slate-900 mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl"
      style={{ backgroundColor: color }}
    >
{/* Left: arrow button */}
      <div onClick={onMessage} className='w-10 h-10'>
        <i className="fa-solid fa-chevron-left text-shadow-sm cursor-pointer"></i>
      </div>
{/* Center: group name or textarea */}
      <div className="w-full flex justify-center">
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
            className="border-4 border-slate-700 rounded-sm py-2 px-2 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none overflow-hidden text-slate-900 font-bold text-center  w-full max-w-md mx-4"
          />
        ) : (
          <div className="truncate text-slate-900 font-bold py-3 text-shadow-sm">
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