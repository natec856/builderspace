import React from 'react'

export default function MainPublic(props) {
  const { children } = props
  return (
    <main className="bg-slate-50 flex flex-col items-center w-full min-h-screen py-10 px-4">
      <div className="w-full">{children}</div>
    </main>
  )
}