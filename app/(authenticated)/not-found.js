import Header from '@/components/generalComponents/Header'
import MobileNav from '@/components/generalComponents/MobileNav'
import MainAuth from '@/components/MainAuth'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <MainAuth>
        <Header />
        <MobileNav />
        <div className='flex flex-col items-center justify-center gap-5 lg:gap-10'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-slate-900'>404 Error: Page not found</h1>
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900'>Whoops! Whatever you&apos;re looking for doesn&apos;t exist</p>
            <Link href={"/"} className='bg-blue-600 text-white font-semibold rounded-full text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-10 py-5'>Go Home</Link>
        </div>
    </MainAuth>
  )
}
