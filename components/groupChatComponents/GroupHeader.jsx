import React from 'react'
import Link from 'next/link'
import GroupButtons from './GroupButtons'

export default function GroupHeader({groupId, groupName, isEditing, onChange, onEdit, onDone}) {

  return ( 
    <div>
      <Link
          href={`/groups/${groupId}`}
          className='bg-slate-900 rounded-md w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 flex items-center justify-center mr-auto'>
            <i className='fa-solid fa-arrow-left text-white text-base sm:text-lg'></i>
        </Link>
      <div>
        {isEditing ? (
          <div className='flex border-b border-slate-900 mx-2 text-slate-900 font-bold text-base h-fit py-2'>
            <textarea 
              value={groupName}
              rows={1}
              maxLength={22}
              onChange={(e) => onChange(e.target.value)}
              placeholder='Enter group name'
              className="w-full font-semibold border-3 border-slate-300 rounded-sm py-2 px-2 md:py-3 md:px-3 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none overflow-hidden"
              />
              <GroupButtons
                  isEditing={isEditing}
                  onEdit={onEdit}
                  onDone={onDone} />
          </div>
        ):(
          <div className="flex items-center w-full border-b border-slate-900 text-slate-900 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl h-fit py-2">
            <div className="mx-2 flex-1 text-center truncate">
              {groupName}
            </div>
            <GroupButtons
              isEditing={isEditing}
              onEdit={onEdit}
              onDone={onDone}
            />
          </div>
        )}
      </div>
    </div>
  )
}
