import React from 'react'

export default function MainAuth(props) {
  const { children } = props
  return (
    <main className="bg-slate-50 flex flex-col items-center w-full min-h-screen">
      <div className="w-full">{children}</div>
    </main>
  )
}