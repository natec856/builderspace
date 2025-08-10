'use client'

import React, { useState, useMemo } from 'react'
import DesktopGroupList from '@/components/groupList/DesktopGroupList'
import DesktopGroupMessagingContainer from '@/components/groupChatComponents/DesktopGroupMessagingContainer'
import DesktopGroupFocus from '@/components/groupChatComponents/DesktopGroupFocus'
import GroupList from '../groupList/GroupList'

export default function GroupView({ groups, currentUser }) {
  // Find group with most recent last_message_date on initial render
  const initialGroupId = useMemo(() => {
    if (!groups || groups.length === 0) return null

    // Filter groups that have last_message_date defined, parse to Date
    const groupsWithDates = groups
      .filter(g => g.last_message_date)
      .map(g => ({
        ...g,
        lastMessageDateObj: new Date(g.last_message_date),
      }))
    
    if (groupsWithDates.length === 0) return null

    // Sort descending by date and get first id
    groupsWithDates.sort(
      (a, b) => b.lastMessageDateObj - a.lastMessageDateObj
    )

    return groupsWithDates[0].id || groupsWithDates[0].groupId || null
  }, [groups])

  const [selectedGroupId, setSelectedGroupId] = useState(initialGroupId)
  const [isFocus, setIsFocus] = useState(false)

  // Accept the selected group id from child component
  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId)
    setIsFocus(false)
  }

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex w-full justify-center">
        <DesktopGroupList 
          groups={groups} 
          onSelectGroup={handleSelectGroup} 
        />

        {!isFocus && selectedGroupId ? (
          <DesktopGroupMessagingContainer
            groupId={selectedGroupId}
            onFocus={() => setIsFocus(true)}
            currentUser={currentUser}
          />
        ) : (
          <DesktopGroupFocus
            groupId={selectedGroupId}
            onMessage={() => setIsFocus(false)}
          />
        )}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden w-full">
        <GroupList
          groups={groups} />
      </div>
    </>
  )
}