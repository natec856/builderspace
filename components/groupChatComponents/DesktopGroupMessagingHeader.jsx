import React from 'react'

export default function DesktopMessagingHeader({ groupName, color, onFocus}) {

  return (
    <div 
      className="flex items-center w-full py-4 px-4 text-xl md:text-xl lg:text-2xl xl:text-3xl text-slate-900 sticky top-0 z-10 slateBottomShadow rounded-t-md"
      style={{backgroundColor: color}}>
      <span className="mx-2 py-2 flex-1 font-bold text-center truncate text-shadow-xs">
        {groupName}
      </span>
      <button onClick={onFocus}>
        <i className="fa-solid fa-chevron-right text-shadow-sm cursor-pointer"></i>
      </button>
    </div>
  )
}