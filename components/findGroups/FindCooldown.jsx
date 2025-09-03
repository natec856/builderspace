import React from 'react'
import Link from 'next/link'

export default function FindCooldown() {
  return (
    <div className="flex flex-col items-center text-center">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900">Join the Conversation First</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-600 mt-4 mb-6 px-8">
        Before requesting a new group, please send at least one message in your current group. You may only submit one request every week, and can't submit more than one request at a time.
        </p>
        <Link
            href={'/groups'}
            className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-blue-600 text-white py-2 px-4 lg:py-4 lg:px-8 rounded-full font-semibold w-full max-w-[300px] cursor-pointer'>
            My Groups
        </Link>
    </div>
  )
}
