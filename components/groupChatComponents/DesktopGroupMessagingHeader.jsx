import React from 'react'

export default function DesktopMessagingHeader({ groupName, onFocus}) {

  return (
    <div className="flex items-center w-full py-2 px-4 border-b border-slate-300 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-900 bg-white sticky top-0 z-10">
      <span className="mx-2 py-2 flex-1 font-bold text-center truncate">
        {groupName}
      </span>
      <button
        onClick={onFocus}
        className="bg-slate-900 rounded-md w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:cursor-pointer">
        <i className="fa-solid fa-arrow-right text-white"></i>
      </button>
    </div>
  )
}