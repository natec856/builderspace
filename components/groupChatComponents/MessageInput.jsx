import { useState, useRef } from 'react'

export default function MessageInput({ setMessages }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null);
    
  const handleSend = () => {
    if (!input.trim()) return
    
     const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'You', // Can change to dynamic user
      timestamp: new Date().toISOString(),
    }
    
    setMessages(prev => [...prev, newMessage])
    setInput('')
    
    // Reset textarea height
    if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
    }
  }

  return (
    <div className="bg-slate-100 rounded-md flex gap-2 mt-4 mb-10 mx-4">
    <textarea
      ref={textareaRef}
      value={input}
      onChange={(e) => {
          setInput(e.target.value);
          if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
          }
      }}
      onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // prevent newline on Enter
          handleSend();
          }
      }}
      placeholder="Type a message..."
      className="flex-1 pl-4 py-2 lg:py-4 outline-none text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl resize-none overflow-hidden"
      rows={1}
      />
      <div className="bg-blue-600 rounded-md w-7 h-7  lg:w-11 lg:h-11 m-1 md:m-2 flex items-center justify-center lg:text-xl">
          <i
              className="fa-solid fa-arrow-up text-white cursor-pointer"
              onClick={handleSend}
          ></i>
      </div>
    </div>
  )
}