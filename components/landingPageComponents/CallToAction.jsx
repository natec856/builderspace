import Link from 'next/link'
import React from 'react'
import Button from './Button'

export default function CallToAction() {
  return (
    <div className='grid grid-rows-2 gap-4 w-full max-w-[600px] mx-auto'>
        <Link href="/dashboard">
          <Button text="Sign Up" full dark />
        </Link>
        <p className='text-sm sm:text-base text-center'>Already have an account? <Link className='text-blue-600 text-sm sm:text-base underline sm:no-underline sm:hover:underline' href="/dashboard">Login</Link></p>
    </div>
  )
}
