'use client'
import React, { useEffect, useRef, useState } from 'react'
import InvitesPreview from './InvitesPreview'

export default function InvitesList({ invites, currentUserUsername, currentUserId }) {
  const [showInvites, setShowInvites] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  const handleShow = () => setShowInvites((prev) => !prev)
  
    // Animate height when showInvites changes
    useEffect(() => {
      if (contentRef.current) {
        setHeight(showInvites ? contentRef.current.scrollHeight : 0)
      }
    }, [showInvites])
  
  return (
    <div className="flex flex-col items-left w-full">
      <div
        onClick={handleShow}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className='flex gap-3 items-center'>
          <h1 className="text-2xl sm:text-3xl font-bold pb-1">
            Pending Invites
          </h1>
          {invites.length > 0 && (
            <p className='border-3 border-yellow-500 rounded-sm text-yellow-500 font-semibold px-2 text-base md:text-lg '>New</p>
          )}
        </div>
        
        <svg
          className={`ml-2 h-5 w-5 lg:h-8 lg:w-8 transition-transform duration-300 ${
            showInvites ? 'rotate-180' : ''
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
          opacity: showInvites ? 1 : 0,
        }}
      >
        <div 
          ref={contentRef}
          className='border-t border-slate-200 mt-2'>
          <ul className="max-h-[calc(100vh-300px)] overflow-y-scroll">
            {invites.length === 0 ? (
              <p className='text-base font-semibold text-slate-400'>No invites found</p>
              ):(
                invites.map((invite) => (
                  <li key={invite.id}>
                    <InvitesPreview
                      invite_id={invite.id}
                      username={invite.user_id.username}
                      name={invite.user_id.name}
                      avatar_url={invite.user_id.avatar_url}
                      currentUserUsername={currentUserUsername}
                      currentUserId={currentUserId}
                    />
                  </li>
                ))
              )}
          </ul>
        </div>
      </div>
    </div>
  )
}