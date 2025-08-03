import React from 'react'
import Link from 'next/link'

export default function FindComplete({onDone}) {
//test username 
  const username="NateC32"

  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='font-bold text-xl text-center'>All done!</h1>
        <p className='text-sm mt-4 px-8 text-center'>You'll be able to access your new group from the "Groups" tab above once you've been matched. In the meantime, make sure your profile is complete!</p>
        <Link
            href={`/${username}`}
            className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px] mt-6 text-center'>My Profile</Link>
    </div>
  )
}
