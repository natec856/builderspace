'use client'

import React, { useState, useMemo } from 'react'
import GroupPreview from '@/components/groupList/GroupPreview'
import GroupSearchBar from './GroupSearchBar'

export default function GroupList({groups}) {

  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredGroups = useMemo(() => {
    if (!groups) return []
    return groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, groups])

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-full max-h-[400px] md:max-h-[450px] xl:max-h-[500px] 2xl:max-h-[1000px] overflow-y-scroll max-w-full mx-2 mt-4 px-4 py-6 mb-5 flex-1">
      <h1 className="text-2xl sm:text-3xl font-bold">My Groups</h1>
      <GroupSearchBar onSearch={setSearchTerm} />
      <ul>
        {filteredGroups.map((group) => (
          <li key={group.id}>
            <GroupPreview
              groupId={group.id}
              groupName={group.name}
              lastMessage={group.last_message || ''}
              lastMessageDate={group.last_message_date || ''} />
          </li>
        ))}
      </ul>
    </div>
  )
}