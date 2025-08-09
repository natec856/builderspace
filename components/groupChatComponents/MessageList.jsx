import { useRef, useEffect } from 'react'

export default function MessageList({ messages }) {
  const bottomRef = useRef(null)
  const containerRef = useRef(null)

  // Scroll to bottom on mount and whenever messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const shouldShowTimestamp = (current, previous) => {
    if (!previous) return true
    const currTime = new Date(current.timestamp).getTime()
    const prevTime = new Date(previous.timestamp).getTime()
    return currTime - prevTime > 15 * 60 * 1000 // 15 minutes
  }

  const formatTimestamp = (iso) => {
    const date = new Date(iso)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const oneDay = 24 * 60 * 60 * 1000

    if (diff < oneDay && date.getDate() === now.getDate()) {
      return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }

    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }

    const daysDiff = (diff / oneDay) | 0
    if (daysDiff < 7) {
      return `${date.toLocaleDateString(undefined, { weekday: 'long' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }

    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 h-full overflow-y-auto p-4 space-y-2 bg-white"
    >
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1]
        const showTimestamp = shouldShowTimestamp(msg, prevMsg)

        return (
          <div key={msg.id}>
            {showTimestamp && (
              <span className="block mt-2 text-xs md:text-base lg:text-lg text-slate-400 text-center">
                {formatTimestamp(msg.timestamp)}
              </span>
            )}

            <span
              className={`text-xs md:text-base lg:text-lg text-slate-400 ml-2 ${
                msg.sender === 'You' ? 'hidden' : ''
              }`}
            >
              {msg.sender}
            </span>

            <div
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg text-sm md:text-base lg:text-lg xl:text-xl font-medium w-fit max-w-3/4 break-words ${
                msg.sender === 'You'
                  ? 'ml-auto bg-blue-600 text-white rounded-br-none'
                  : 'mr-auto bg-slate-200 text-slate-700 rounded-bl-none'
              }`}
            >
              <p className="break-words">{msg.text}</p>
            </div>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}