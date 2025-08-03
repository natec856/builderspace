import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full min-h-25 flex justify-center items-center text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white bg-slate-900">
      <div className='mt-10'>&copy; {new Date().getFullYear()} Builderspace. All rights reserved.</div>
    </footer>
  )
}
