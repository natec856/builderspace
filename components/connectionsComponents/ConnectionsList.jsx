'use client'
import React, { useState, useMemo } from 'react'
import ConnectionsPreview from '@/components/connectionsComponents/ConnectionsPreview'
import ConnectionsSearch from '@/components/connectionsComponents/ConnectionsSearch'

export default function ConnectionsList({ connections, currentUserUsername }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConnections = useMemo(() => {
    if (!connections) return []

    // Filter connections by search term only
    const filtered = connections.filter((connection) => {
      const name = connection.other?.name || ''
      return name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    // Sort alphabetically by name A-Z
    return filtered.sort((a, b) => {
      const nameA = a.other?.name?.toLowerCase() || ''
      const nameB = b.other?.name?.toLowerCase() || ''
      return nameA.localeCompare(nameB)
    })
  }, [connections, searchTerm])

  return (
    <div className='flex flex-col items-left w-full'>
      <h1 className="text-2xl sm:text-3xl font-bold">My Connections</h1>
      <ConnectionsSearch onSearch={setSearchTerm} />
      <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
        {filteredConnections.length === 0 && <li>No connections found</li>}
        {filteredConnections.map((connection) => (
          <li key={connection.id}>
            <ConnectionsPreview
              username={connection.other.username}
              name={connection.other.name}
              avatar_url={connection.other.avatar_url}
              currentUserUsername={currentUserUsername}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}