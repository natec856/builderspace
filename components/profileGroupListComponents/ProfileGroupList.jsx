'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import ProfileGroupPreview from './ProfileGroupPreview'
import ProfileGroupSearchBar from './ProfileGroupSearch'

export default function ProfileGroupList({ groups }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showGroups, setShowGroups] = useState(true)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  const filteredGroups = useMemo(() => {
    if (!groups) return []
    const sorted = [...groups].sort((a, b) => {
      const dateA = a.last_message_date ? new Date(a.last_message_date).getTime() : 0
      const dateB = b.last_message_date ? new Date(b.last_message_date).getTime() : 0
      return dateB - dateA
    })
    return sorted.filter((g) =>
      (g.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, groups])

  const handleShow = () => setShowGroups((prev) => !prev)

  // On mount, close groups if on mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {  // Tailwind's md breakpoint
        setShowGroups(false)
      }
    }
  }, [])

  // Recalculate height when open/closed or when the number of items changes
  useEffect(() => {
    if (!contentRef.current) return
    // Use rAF to ensure layout is flushed before measuring
    const id = requestAnimationFrame(() => {
      const next = showGroups ? contentRef.current.scrollHeight : 0
      setHeight(next)
    })
    return () => cancelAnimationFrame(id)
  }, [showGroups, filteredGroups.length])

  return (
    <div className="flex flex-col w-full">
      <div
        onClick={handleShow}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <h1 className="text-2xl sm:text-3xl font-bold pb-1">My Groups</h1>
        <svg
          className={`ml-2 h-5 w-5 lg:h-8 lg:w-8 transition-transform duration-300 ${
            showGroups ? 'rotate-180' : ''
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
          opacity: showGroups ? 1 : 0,
          willChange: 'max-height, opacity',
        }}
        aria-hidden={!showGroups}
      >
        <div ref={contentRef}>
          <ProfileGroupSearchBar onSearch={setSearchTerm} />
          <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll scrollbar-hide">
            {filteredGroups.length === 0 && (
              <li className="mt-2 text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-slate-400">
                No groups found
              </li>
            )}
            {filteredGroups.map((group) => (
              <li key={group.id}>
                <ProfileGroupPreview
                  groupId={group.id}
                  groupName={group.name}
                  lastMessage={group.last_message || ''}
                  lastMessageDate={group.last_message_date || ''}
                  color={group.color}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
