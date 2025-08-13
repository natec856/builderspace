'use client'
import React, { useState, useMemo } from 'react'
import DesktopGroupPreview from '@/components/groupList/DesktopGroupPreview'
import GroupSearchBar from './GroupSearchBar'

export default function DesktopGroupList({ onSelectGroup, groups }) {
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
    <div className="bg-white shadow-md shadow-slate-400 rounded-md w-full min-w-[350px] max-w-[500px] mx-2 mt-4 px-4 py-6 mb-35 flex-1 h-fit">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">My Groups</h1>
      <GroupSearchBar onSearch={setSearchTerm} />

      <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
        {filteredGroups.length === 0 && <li>No groups found</li>}
        {filteredGroups.map((group) => (
          <li key={group.id}>
            <DesktopGroupPreview
              groupId={group.id}
              groupName={group.name}
              lastMessage={group.last_message || ''}
              lastMessageDate={group.last_message_date || ''}
              color={group.color}
              onClick={() => onSelectGroup(group.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}