import React from 'react'

const DesktopGroupPreview = React.memo(function DesktopGroupPreview({
  groupName,
  lastMessage,
  lastMessageDate,
  onClick
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
    <div
      onClick={onClick}
      className="flex items-start border-b border-slate-200 py-2 sm:py-3 hover:bg-slate-50 hover:cursor-pointer"
    >
      {/* Avatar/Icon */}
      <div className='flex items-center'>
        <div 
          className="aspect-square w-16 xl:w-20 rounded-xl bg-slate-200 overflow-hidden flex items-center justify-center relative">
        </div>
      </div>
      {/* Text content */}
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex flex-col-2 justify-between">
          <div className="font-bold text-sm md:text-base lg:text-lg xl:text-xl truncate">{groupName}</div>
          <div className="font-medium italic text-slate-700 text-right text-xs md:text-sm lg:text-base xl:text-lg">
            {displayDate}
          </div>
        </div>
        <div className="text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 line-clamp-2 leading-tight">{lastMessage}</div>
      </div>
    </div>
  )
})

export default DesktopGroupPreview