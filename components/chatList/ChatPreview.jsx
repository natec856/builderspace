import React from 'react'
import Link from 'next/link'

const ChatPreview = React.memo(function ChatPreview({
  chatId,
  chatName,
  lastMessage,
  lastMessageDate,
  avatar_url
}) {
  let lastDate = null

  if (lastMessageDate) {
    try {
      lastDate = new Date(lastMessageDate)
      if (isNaN(lastDate.getTime())) throw new Error('Invalid Date')
    } catch (e) {
      console.error('Invalid date format:', lastMessageDate)
    }
  }

  const now = new Date()
  let displayDate = ''
  if (lastDate) {
    const diff = now - lastDate
    const oneDay = 24 * 60 * 60 * 1000

    displayDate =
      diff < oneDay
        ? lastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : lastDate.toLocaleDateString()
  }

  return (
    <Link
      href={`/directChat/${chatId}`}
      className="flex items-center border-b border-slate-200 px-1 py-2 sm:py-3 hover:bg-slate-50 hover:cursor-pointer"
    >
{/* Chat avatar_url */}
      <div className='flex items-center justify-center shrink-0'>
        <div 
          className="aspect-square text-3xl font-bold text-slate-500 w-16 lg:w-20 xl:w-24 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm shadow-slate-400">
            {avatar_url ? (
              <img src={avatar_url} alt="profilePic" />
            ):(
              <i className='fa-solid fa-user'></i>
            )}
        </div>
      </div>
{/* Text content */}
      <div className="ml-3 flex-1 min-w-0">
{/* Row with chatName and displayDate aligned vertically centered */}
        <div className="flex justify-between items-center">
          <div className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl text-shadow-xs truncate">
            {chatName}
          </div>
          <div className="font-medium italic text-slate-700 text-right text-sm md:text-base lg:text-lg xl:text-xl ml-4">
            {displayDate}
          </div>
        </div>
{/* Last message below, max 2 lines */}
        <div className="text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 line-clamp-2 leading-tight min-h-[30px]">
          {lastMessage}
        </div>
      </div>

    </Link>
  )
})

export default ChatPreview
