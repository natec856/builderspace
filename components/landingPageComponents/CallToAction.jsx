import Link from 'next/link'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col gap-6 w-full md:max-w-[500px] lg:max-w-[600px] mx-auto sm:px-4 py-6 sm:py-10 ">
      <Link 
        href="/auth/signup"
        className="bg-blue-600 text-white text-center py-3 sm:py-4 md:py-5 lg:py-6  font-semibold rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg transition transform hover:scale-[1.02]"
      >
        Join the Beta Now — It’s Free!
      </Link>

      <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-slate-900">
        Already have an account?{" "}
        <Link 
          href="/auth/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Log In
        </Link>
      </p>
    </div>
  )
}