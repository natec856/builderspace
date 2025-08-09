'use client'

import React, { useState, useEffect } from 'react'
import mockData from '@/public/mockData.json'
import DesktopGroupHeader from './DesktopGroupHeader'
import GroupMemberPreview from './GroupMemberPreview'

export default function GroupFocus({ groupId, onMessage }) {
  const [group, setGroup] = useState(null)
  const [groupPageName, setGroupPageName] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const foundGroup = mockData.find(g => g.groupId === groupId)
    if (foundGroup) {
      setGroup(foundGroup)
      setGroupPageName(foundGroup.groupName || '')
    }
  }, [groupId])

  if (!group) {
    return <p className="text-center text-gray-500">Group not found</p>
  }

  const handleChange = (newName) => {
    setGroupPageName(newName)
  }

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md max-h-[calc(100vh-200px)] h-fit max-w-screen-md mx-2 mt-4 px-6 py-6 mb-35 flex-1">
      <DesktopGroupHeader
        groupId={groupId}
        isEditing={isEditing}
        groupName={groupPageName}
        onChange={handleChange}
        onEdit={() => setIsEditing(true)}
        onDone={() => setIsEditing(false)}
        onMessage={onMessage}
      />

      {/* Render list of members */}
      <ul className="mt-4 space-y-2">
        {group.groupMembers.map((member) => (
          <li key={member.userId}>
            <GroupMemberPreview
              userId={member.userId}
              username={member.username}
              name={member.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
