'use client'
import React from "react"
import Link from "next/link"
import MainAuth from "@/components/MainAuth"

export default function ErrorPage() {
  return (
    <MainAuth>
      <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex flex-col items-center gap-4">
        <h1 className="text-lg font-semibold text-center">Sorry, something went wrong</h1>
        <Link
          href={'/auth/login'}
          className="text-white bg-blue-600 rounded-full py-2 px-4 font-semibold text-base">
          Login
        </Link>
      </div>
    </MainAuth>
  )
}