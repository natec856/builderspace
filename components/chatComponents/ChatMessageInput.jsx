import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ChatMessageInput({ chatId, currentUserId, setMessages }) {
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const textareaRef = useRef(null)
  const supabase = createClient()

  const handleSend = async () => {
    if (!input.trim() || sending) return
    setSending(true)

    try {
      // Insert message into Supabase (realtime listener will handle UI update)
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          user_id: currentUserId,
          content: input.trim(),
          created_at: new Date().toISOString(),
        })

      if (messageError) {
        console.error('Error sending message:', messageError)
        setSending(false)
        return
      }

      // Update last message in direct_chats table
      const { error: chatError } = await supabase
        .from('direct_chats')
        .update({
          last_message: input.trim(),
          last_message_date: new Date().toISOString(),
        })
        .eq('id', chatId)

      if (chatError) {
        console.error('Error updating chat last message:', chatError)
      }

      // Clear input & reset state
      setInput('')
      setSending(false)
      if (textareaRef.current) textareaRef.current.style.height = 'auto'

    } catch (err) {
      console.error('Unexpected error sending message:', err)
      setSending(false)
    }
  }


  return (
    <div className="bg-slate-100 rounded-md flex gap-2 mt-4 mb-10 mx-4 items-end">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)

          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto' // reset height
            textareaRef.current.style.height =
              Math.min(textareaRef.current.scrollHeight, 250) + 'px' // grow until 250px
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder="Type a message..."
        className="flex-1 pl-4 py-2 lg:py-4 outline-none text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl resize-none overflow-y-auto"
        rows={1}
        style={{
          maxHeight: '250px',
          minHeight: '40px',
        }}
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