'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header({ username }) {
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
    <div className="flex items-center justify-between w-full py-3 lg:py-6">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold transition-transform duration-200 hover:scale-[1.05]"
      >
        BuilderSpace
      </Link>

      {/* Desktop Authenticated Nav */}
      {isAuthenticated ? (
        <div className="hidden sm:flex items-center justify-between w-full relative">
          {/* Centered nav */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-5 lg:gap-10 items-center w-full justify-center">
            <Link href="/findGroups" className="flex flex-col items-center justify-center text-slate-900 bg-white border-3 hover:text-white hover:bg-transparent hover:border-white font-semibold rounded-xl px-4 py-2 sm:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl">
              Find Groups
            </Link>
            <Link href="/groups" className="flex flex-col items-center justify-center text-slate-900 bg-white border-3 hover:text-white hover:bg-transparent hover:border-white font-semibold rounded-xl px-4 py-2 sm:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl">
              My Groups
            </Link>
            <Link href={`/${username}`} className="flex flex-col items-center justify-center text-slate-900 bg-white border-3 hover:text-white hover:bg-transparent hover:border-white font-semibold rounded-xl px-4 py-2 sm:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl">
              My Profile
            </Link>
          </div>

          {/* Logout button on far right */}
          <button
            onClick={handleLogout}
            className="ml-auto flex flex-col items-center justify-center text-white border-3 font-semibold hover:text-slate-900 hover:bg-white hover:cursor-pointer rounded-xl px-4 py-2 sm:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl"
          >
            Logout
          </button>
        </div>
      ) : (
        // Desktop unauthenticated buttons
        <div className="hidden sm:flex gap-4 ml-auto text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
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