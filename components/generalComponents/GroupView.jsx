'use client'

import React, { useState } from 'react'
import DesktopGroupList from '@/components/groupList/DesktopGroupList'
import DesktopGroupMessagingContainer from '@/components/groupChatComponents/DesktopGroupMessagingContainer'
import DesktopGroupFocus from '@/components/groupChatComponents/DesktopGroupFocus'
import GroupList from '../groupList/GroupList'

export default function GroupView() {
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [isFocus, setIsFocus] = useState(false)

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId)
    setIsFocus(false)
  }

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex w-full">
        <DesktopGroupList onSelectGroup={handleSelectGroup} />
        {!isFocus ? (
          <DesktopGroupMessagingContainer
            groupId={selectedGroupId}
            onFocus={() => setIsFocus(true)}
          />
        ) : (
          <DesktopGroupFocus
            onMessage={() => setIsFocus(false)}
            groupId={selectedGroupId}
          />
        )}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden w-full">
        <GroupList />
      </div>
    </>
  )
}