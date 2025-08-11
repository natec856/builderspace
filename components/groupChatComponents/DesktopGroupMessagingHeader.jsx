import React from 'react'

export default function DesktopMessagingHeader({ groupName, color, onFocus}) {

  return (
    <div 
      className="flex items-center w-full py-4 px-4 text-xl md:text-xl lg:text-2xl xl:text-3xl text-slate-900 sticky top-0 z-10 slateBottomShadow rounded-t-md"
      style={{backgroundColor: color}}>
      <span className="mx-2 py-2 flex-1 font-bold text-center truncate text-shadow-xs">
        {groupName}
      </span>
      <button
        onClick={onFocus}
        className="bg-slate-900 rounded-md w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:cursor-pointer shadow-sm">
        <i className="fa-solid fa-arrow-right text-white"></i>
      </button>
    </div>
  )
}