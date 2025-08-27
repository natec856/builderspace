'use client'
import React, { useState, useMemo } from 'react'
import ProfileGroupPreview from './ProfileGroupPreview'
import ProfileGroupSearchBar from './ProfileGroupSearch'

export default function ProfileGroupList({groups}) {

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
        (group.name).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [searchTerm, groups])

  return (
    <div className="flex flex-col items-left w-full">
      <h1 className="text-2xl sm:text-3xl font-bold">My Groups</h1>
      <ProfileGroupSearchBar onSearch={setSearchTerm} />
      <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
        {filteredGroups.length === 0 && <li>No groups found</li>}
        {filteredGroups.map((group) => (
          <li key={group.id}>
            <ProfileGroupPreview
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