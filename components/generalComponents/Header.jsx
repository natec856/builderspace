'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header({ username, avatar_url }) {
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    setIsAuthenticated(false)
    if (error) {
      console.error('Error logging out:', error.message)
    } else {
      router.push('/')
    }
  }, [router, supabase])

  useEffect(() => {
    setIsAuthenticated(!!username)
  }, [username])

  return (
  <header className="w-full px-3 lg:px-6 text-white bg-slate-900">
    <div className="flex items-center justify-between w-full py-3 md:py-2">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center font-bold transition-transform duration-200 hover:scale-[1.05]"
      >
        <Image
          src="/Web.png"
          alt="Skocoh Logo"
          width={300} // maximum width
          height={150} // maximum height
          priority
          sizes="(max-width: 640px) 150px,
                (max-width: 768px) 250px,
                (max-width: 1024px) 250px,
                (max-width: 1280px) 300px,
                350px"
          className="h-auto w-auto"
        />
      </Link>
{/* Desktop Authenticated Nav */}
      {isAuthenticated ? (
        <div className="hidden sm:flex items-center justify-between w-full gap-4">
          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-15 xl:gap-20 flex-1">
            <Link href="/findGroups" className="flex flex-col items-center justify-center text-white sm:text-xl md:text-2xl lg:text-3xl">
              <i className='fa-solid fa-search'></i>
              <span className='text-sm md:text-base lg:text-lg cursor-pointer hover:underline'>Find Groups</span>
            </Link>
            <Link href="/groups" className="flex flex-col items-center justify-center text-white sm:text-xl md:text-2xl lg:text-3xl">
              <i className='fa-solid fa-users'></i>
              <span className='text-sm md:text-base lg:text-lg cursor-pointer hover:underline'>My Groups</span>
            </Link>
            <Link href={`/directChat`} className="flex flex-col items-center justify-center text-white sm:text-xl md:text-2xl lg:text-3xl">
              <i className='fa-solid fa-message'></i>
              <span className='text-sm md:text-base lg:text-lg cursor-pointer hover:underline'>Direct Chats</span>
            </Link>
          </div>

          {/* Logout button and profile on far right */}
          <div className='flex gap-5 lg:gap-10 items-center justify-between'>
            <Link href={`/${username}`} className="flex flex-col items-center justify-center text-white sm:text-xl md:text-2xl lg:text-3xl">
                {avatar_url ? (
                  <div className='w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden relative'>
                    <Image
                      src={avatar_url}
                      alt="Profile"
                      fill
                      sizes="(max-width: 640px) 32px,
                            (max-width: 1024px) 40px,
                            (max-width: 1280px) 64px,
                            (max-width: 1536px) 80px,
                            80px"
                      className="object-cover"
                    />
                  </div>
                ):(
                  <div className='flex flex-col items-center justify-center border-3 rounded-full p-4 aspect-square'>
                    <i className='fa-solid fa-user'></i>
                  </div>
                )}          
              </Link>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center text-white bg-transparent border-2 font-semibold hover:text-slate-900 hover:bg-white hover:border-2 hover:border-white cursor-pointer rounded-xl px-2 py-1 md:px-3 md:py-2 sm:text-sm md:text-lg lg:text-xl"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (

        // Desktop unauthenticated buttons
        <div className="hidden sm:flex gap-4 ml-auto text-base lg:text-xl font-semibold">
          <Link
            href="/auth/login"
            className="bg-white text-blue-600 text-center px-4 py-4 font-semibold rounded-md"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="bg-blue-600 text-white text-center px-4 py-4 font-semibold rounded-md"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Mobile right-side button (Logout or Menu) */}
      <div className="sm:hidden ml-auto">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white text-slate-900 font-semibold rounded-md px-3 py-1 text-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>
    </div>

    {/* Mobile dropdown menu (for unauthenticated users) */}
    {(menuOpen || !isAuthenticated) && (
      <div
        className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ willChange: 'max-height, opacity' }}
      >
        {!isAuthenticated ? (
          <div className="flex flex-col items-center space-y-3 px-3 py-4">
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-white text-blue-600 text-center py-2 font-semibold rounded-md text-base w-full max-w-[300px]"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-600 text-white text-center py-2 font-semibold rounded-md text-base w-full max-w-[300px]"
            >
              Sign Up
            </Link>
          </div>
        ) : null}
      </div>
    )}
  </header>
)}