'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import ConnectionsPreview from '@/components/connectionsComponents/ConnectionsPreview'
import ConnectionsSearch from '@/components/connectionsComponents/ConnectionsSearch'

export default function ConnectionsList({ connections, currentUserUsername, currentUserId, currentUserName, currentUserAvatarUrl }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showConnections, setShowConnections] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

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

  const handleShow = () => setShowConnections((prev) => !prev)

  // Animate height when showConnections changes
  useEffect(() => {
    if (contentRef.current) {
      setHeight(showConnections ? contentRef.current.scrollHeight : 0)
    }
  }, [showConnections, filteredConnections])

  return (
    <div className="flex flex-col items-left w-full">
      <div
        onClick={handleShow}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <h1 className="text-2xl sm:text-3xl font-bold pb-1">
          My Connections
        </h1>
        <svg
          className={`ml-2 h-5 w-5 lg:h-8 lg:w-8 transition-transform duration-300 ${
            showConnections ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div
        style={{
          maxHeight: `${height}px`,
          transition: 'max-height 0.4s ease, opacity 0.4s ease',
          overflow: 'hidden',
          opacity: showConnections ? 1 : 0,
        }}
      >
        <div ref={contentRef}>
          <ConnectionsSearch onSearch={setSearchTerm} />
          <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
            {filteredConnections.length === 0 && (
              <li className="mt-2 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-400">No connections found</li>
            )}
            {filteredConnections.map((connection) => (
              <li key={connection.id}>
                <ConnectionsPreview
                  connectionUser_id={connection.other.id}
                  connectionUsername={connection.other.username}
                  connectionName={connection.other.name}
                  connectionAvatar_url={connection.other.avatar_url}
                  currentUserUsername={currentUserUsername}
                  currentUserId={currentUserId}
                  currentUserName={currentUserName}
                  currentUserAvatarUrl={currentUserAvatarUrl}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
