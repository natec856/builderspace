'use client'
import React, { useRef, useState } from 'react'

export default function DirectMessageInput({
  setChatMessages,
  isNewChat,
  onStartChat
}) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    // If it's a new chat, trigger the parent to mark it as no longer new
    if (isNewChat && onStartChat) {
      onStartChat()
    }

    const newChatMessage = {
      id: Date.now(),
      text: trimmed,
      sender: 'You', // Replace with dynamic user if needed
      timestamp: new Date().toISOString(),
    }

    setChatMessages(prev => [...prev, newChatMessage])
    setInput('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  return (
    <div className="bg-slate-100 rounded-md flex gap-2 m-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder="Type a message..."
        className="flex-1 pl-4 py-2 outline-none text-sm resize-none overflow-hidden"
        rows={1}
      />
      <div className="bg-blue-600 rounded-md w-7 h-7 m-1 flex items-center justify-center">
        <i
          className="fa-solid fa-arrow-up text-white text-lg cursor-pointer"
          onClick={handleSend}
        ></i>
      </div>
    </div>
  )
}
