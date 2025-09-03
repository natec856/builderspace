import React from 'react'
import Link from 'next/link'

export default function FindComplete({username}) {
  return (
    <div className='flex flex-col items-center text-center'>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900'>
          All done!
        </h1>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-600 mt-4 mb-6 px-8'>
          You'll be able to access your new group from the "Groups" tab above once you've been matched. In the meantime, make sure your profile is complete!
        </p>
        <Link
          href={`/${username}`}
          className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-blue-600 text-white py-2 px-4 lg:py-4 lg:px-8 rounded-full font-semibold w-full max-w-[300px] cursor-pointer'>
          My Profile
        </Link>
    </div>
  )
}
