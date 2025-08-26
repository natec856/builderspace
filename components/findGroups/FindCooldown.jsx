import React from 'react'
import Link from 'next/link'

export default function FindCooldown() {
  return (
    <div className="flex flex-col items-center text-center">
        <h1 className="font-bold text-xl text-slate-900">Join the Conversation First</h1>
        <p className="text-sm text-slate-600 mt-4 mb-6 px-8">
        Before requesting a new group, please send at least one message in your current group. You may only submit one request every week, and can't submit more than one request at a time.
        </p>
        <Link
            href={'/groups'}
            className='bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-base w-full max-w-[250px]'>
            My Groups
        </Link>
    </div>
  )
}
