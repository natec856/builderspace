import React from 'react'
import Link from 'next/link'

export default function DirectMessagingHeader({chatName}) {
  // username for testing
  const username = 'Alex5'

  return (
    <div
        className="flex items-center w-full py-2 px-4 border-b border-slate-300 text-base text-slate-900 bg-white sticky top-0 z-10">
        <Link
          href={`/directMessages`}
          className='bg-slate-900 rounded-md w-6 h-6 flex items-center justify-center'>
            <i className='fa-solid fa-arrow-left text-white text-base'></i>
        </Link>
        <Link 
          href={`/${username}`}
          className='mx-2 flex-1 font-bold text-center truncate'>
          {chatName}
        </Link>
    </div>
  )
}
