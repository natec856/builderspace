'use client'

import React, { useState } from 'react'
import Button from '../landingPageComponents/Button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const username = "NateC32"
  const [menuOpen, setMenuOpen] = useState(false)
  const loggedIn = true

  return (
    <header className="w-full px-3 lg:px-6 text-white bg-slate-900">
      <div className="flex justify-between items-center py-3 lg:py-4">
        <Link
          href="/"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold"
        >
          BuilderSpace
        </Link>

        {/* Navbar */}
        <nav className="hidden sm:flex w-fit gap-10 justify-around items-center">
          <Link href="/findGroups" className="flex flex-col items-center text-white">
            <i className="fa-solid fa-search sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"></i>
            <span className="text-sm mt-1">Find Groups</span>
          </Link>
          <Link href="/groups" className="flex flex-col items-center text-white">
            <i className="fa-solid fa-users sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"></i>
            <span className="text-sm mt-1">My Groups</span>
          </Link>
          <Link href={`/${username}`} className="flex flex-col items-center text-white">
            <i className="fa-solid fa-user aspect-square text-center border-3 px-4 py-4 rounded-full sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"></i>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown wrapper with smooth open/close */}
      <div
        className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ willChange: 'max-height, opacity' }}
      >
        <div className="flex flex-col space-y-3 px-3 py-4">
          <div className="w-full">
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
              <Button text="Login" full header />
            </Link>
          </div>
          <div className="w-full">
            <Link href="/auth/signup" onClick={() => setMenuOpen(false)}>
              <Button text="Sign Up" dark full header />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
