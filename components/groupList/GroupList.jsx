'use client'
import React, { useState, useMemo } from 'react'
import GroupPreview from '@/components/groupList/GroupPreview'
import GroupSearchBar from './GroupSearchBar'

export default function GroupList({groups}) {

  const [searchTerm, setSearchTerm] = useState('')
  
    const filteredGroups = useMemo(() => {
      if (!groups) return []
  
      // Create a copy and sort by last_message_date descending
      const sortedGroups = [...groups].sort((a, b) => {
        const dateA = a.last_message_date ? new Date(a.last_message_date).getTime() : 0
        const dateB = b.last_message_date ? new Date(b.last_message_date).getTime() : 0
        return dateB - dateA
      })
  
      // Then filter by search term
      return sortedGroups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [searchTerm, groups])

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md w-full mx-2 mt-4 px-4 py-4 mb-5 flex-1">
      <h1 className="text-2xl sm:text-3xl font-bold">My Groups</h1>
      <GroupSearchBar onSearch={setSearchTerm} />
      <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
        {filteredGroups.length === 0 && <li>No groups found</li>}
        {filteredGroups.map((group) => (
          <li key={group.id}>
            <GroupPreview
              groupId={group.id}
              groupName={group.name}
              lastMessage={group.last_message || ''}
              lastMessageDate={group.last_message_date || ''}
              color={group.color} />
          </li>
        ))}
      </ul>
    </div>
  )
}