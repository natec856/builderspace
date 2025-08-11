import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function MessageInput({ groupId, currentUser, messages, setMessages }) {
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const textareaRef = useRef(null)
  const supabase = createClient()

  const handleSend = async () => {
    if (!input.trim() || sending) return

    setSending(true)

    const content = input.trim()

    // Insert message into Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert({
        group_id: groupId,
        user_id: currentUser,
        content,
        created_at: new Date().toISOString(), // Add current timestamp to message in supabase
      })
      .select()
      .single()

    if (error) {
      console.error('Error sending message:', error)
      setSending(false)
      return
    }

    // Optimistically update UI with new message
    setMessages((prev) => [
      ...prev,
      {
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        user_id: data.user_id,
        user: { id: data.user_id, name: 'You' }, // You can customize this if you have user info handy
      },
    ])

    setInput('')
    setSending(false)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  return (
    <div className="bg-slate-100 rounded-md flex gap-2 mt-4 mb-10 mx-4">
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
            e.preventDefault() // prevent newline on Enter
            handleSend()
          }
        }}
        placeholder="Type a message..."
        className="flex-1 pl-4 py-2 lg:py-4 outline-none text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl resize-none overflow-hidden"
        rows={1}
        disabled={sending}
      />
      <div
        className={`bg-blue-600 rounded-md w-7 h-7 lg:w-11 lg:h-11 m-1 md:m-2 flex items-center justify-center lg:text-xl cursor-pointer ${
          sending ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleSend}
      >
        <i className="fa-solid fa-arrow-up text-white"></i>
      </div>
    </div>
  )
}