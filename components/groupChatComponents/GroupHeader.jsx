import React from 'react'
import Link from 'next/link'
import GroupButtons from './GroupButtons'

export default function GroupHeader({groupId, groupName, isEditing, onChange, onEdit, onDone}) {

  return ( 
    <div>
      <Link
          href={`/groups/${groupId}`}
          className='bg-slate-900 rounded-md w-6 h-6 flex items-center justify-center mr-auto'>
            <i className='fa-solid fa-arrow-left text-white text-base'></i>
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
              className="border-2 border-slate-300 rounded-md w-full text-slate-900 font-semibold text-md pl-1 resize-none overflow-hidden"
              />
              <GroupButtons
                  isEditing={isEditing}
                  onEdit={onEdit}
                  onDone={onDone} />
          </div>
        ):(
          <div className="flex items-center w-full border-b border-slate-900 text-slate-900 font-bold text-base h-fit py-2">
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
