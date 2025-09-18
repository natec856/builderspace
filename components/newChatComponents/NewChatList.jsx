'use client'
import React, { useState, useMemo } from 'react'
import NewChatPreview from './NewChatPreview'
import NewChatSearchBar from './NewChatSearchBar'

export default function NewChatList({ connections, currentUserUsername, currentUserId, currentUserName, currentUserAvatarUrl, onChatSelected }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredConnections = useMemo(() => {
    if (!connections) return []

    const filtered = connections.filter((connection) => {
      const name = connection.other?.name || ''
      return name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return filtered.sort((a, b) => {
      const nameA = a.other?.name?.toLowerCase() || ''
      const nameB = b.other?.name?.toLowerCase() || ''
      return nameA.localeCompare(nameB)
    })
  }, [connections, searchTerm])

  return (
    <div className="flex flex-col items-left w-full mt-2 md:mt-3 lg:mt-4">
        <NewChatSearchBar onSearch={setSearchTerm} />
        <ul className="h-[calc(100vh-300px)] overflow-y-scroll scrollbar-hide">
          {filteredConnections.length === 0 && (
            <li className="mt-2 text-base font-semibold text-slate-400">
              No connections found
            </li>
          )}
          {filteredConnections.map((connection) => (
            <li key={connection.id}>
              <NewChatPreview
                connectionUser_id={connection.other.id}
                connectionUsername={connection.other.username}
                connectionName={connection.other.name}
                connectionAvatarUrl={connection.other.avatar_url}
                currentUserUsername={currentUserUsername}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                currentUserAvatarUrl={currentUserAvatarUrl}
                onChatSelected={onChatSelected}
              />
            </li>
          ))}
        </ul>
      </div>
  )
}
