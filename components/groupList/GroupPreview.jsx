import React from 'react'
import Link from 'next/link'

const GroupPreview = React.memo(function GroupPreview({
  groupId,
  groupName,
  lastMessage,
  lastMessageDate,
  color
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
      href={`/groups/${groupId}`}
      className="flex items-center border-b border-slate-200 py-2 sm:py-3 hover:bg-slate-50 hover:cursor-pointer"
    >
{/* Group color */}
      <div className='flex items-center justify-center shrink-0'>
        <div 
          className="aspect-square text-3xl font-bold text-slate-700 w-14 xl:w-20 rounded-xl bg-slate-200 overflow-hidden flex items-center justify-center shrink-0 text-shadow-sm"
          style={{backgroundColor: color}}>
            {groupName[0].toUpperCase()}
        </div>
      </div>
{/* Text content */}
      <div className="ml-3 flex-1 min-w-0">
{/* Row with groupName and displayDate aligned vertically centered */}
        <div className="flex justify-between items-center">
          <div className="font-bold text-sm md:text-base lg:text-lg xl:text-xl truncate">
            {groupName}
          </div>
          <div className="font-medium italic text-slate-700 text-right text-xs md:text-sm lg:text-base xl:text-lg ml-4">
            {displayDate}
          </div>
        </div>
{/* Last message below, max 2 lines */}
        <div className="text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 line-clamp-2 leading-tight">
          {lastMessage}
        </div>
      </div>

    </Link>
  )
})

export default GroupPreview
