'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function GroupFocusButtons({ user_id }) {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [invited, setInvited] = useState(false)
  const [pendingFromOther, setPendingFromOther] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const [userRecord, setUserRecord] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  // Fetch authenticated user and target user record
  useEffect(() => {
    async function fetchUsers() {
      const { data: userData } = await supabase.auth.getUser()
      const current = userData?.user
      setCurrentUser(current)

      if (!current) return

      const { data, error } = await supabase
        .from('users')
        .select('id, username, name, avatar_url')
        .eq('id', user_id)
        .single()

      if (error) return console.error(error)
      setUserRecord(data)
    }

    fetchUsers()
  }, [user_id, supabase])

  // Check connection status
  useEffect(() => {
    if (!currentUser || !userRecord) return

    async function checkConnection() {
      const { data: connectionData } = await supabase
        .from('user_connections')
        .select('id,user_id,connection_id,status')
        .or(
          `and(user_id.eq.${currentUser.id},connection_id.eq.${userRecord.id}),and(user_id.eq.${userRecord.id},connection_id.eq.${currentUser.id})`
        )
        .limit(1)
        .maybeSingle()

      if (!connectionData) {
        setIsConnected(false)
        setInvited(false)
        setPendingFromOther(false)
        return
      }

      if (connectionData.status === 'accepted') {
        setIsConnected(true)
        setInvited(false)
        setPendingFromOther(false)
      } else if (connectionData.status === 'pending') {
        if (connectionData.connection_id === currentUser.id) {
          setPendingFromOther(true)
          setInvited(false)
        } else {
          setPendingFromOther(false)
          setInvited(true)
        }
        setIsConnected(false)
      }
    }

    checkConnection()
  }, [currentUser, userRecord, supabase])

  // Invite
  async function handleInvite() {
    if (!currentUser) return alert('Must be logged in.')

    setLoading(true)
    const { error } = await supabase.from('user_connections').insert([
      { user_id: currentUser.id, connection_id: user_id, status: 'pending' }
    ])

    if (error) alert('Failed to send request.')
    else setInvited(true)

    setLoading(false)
  }

  // Accept
  async function handleAccept() {
    if (!currentUser || !userRecord) return
    setLoading(true)

    const { error } = await supabase
      .from('user_connections')
      .update({ status: 'accepted' })
      .eq('connection_id', currentUser.id)
      .eq('user_id', userRecord.id)

    if (error) alert('Failed to accept connection.')
    else {
      setIsConnected(true)
      setPendingFromOther(false)
    }

    setLoading(false)
  }

  // Message
  const handleMessageClick = async () => {
    if (!currentUser || !userRecord) return
    setLoading(true)

    try {
      // 1) Find or create chat
      const { data: chats } = await supabase
        .from('user_chats')
        .select('chat_id')
        .in('user_id', [currentUser.id, userRecord.id])

      const counts = {}
      for (const c of (chats ?? [])) counts[c.chat_id] = (counts[c.chat_id] || 0) + 1
      let chatId = Object.keys(counts).find(id => counts[id] === 2)

      if (!chatId) {
        const { data: newChat } = await supabase
          .from('direct_chats')
          .insert({ last_message: '', last_message_date: new Date().toISOString(), created_by: currentUser.id })
          .select('id')
          .single()

        await supabase.from('user_chats').insert([
          { chat_id: newChat.id, user_id: currentUser.id, name: currentUser.name, username: currentUser.username, avatar_url: currentUser.avatar_url },
          { chat_id: newChat.id, user_id: userRecord.id, name: userRecord.name, username: userRecord.username, avatar_url: userRecord.avatar_url }
        ])

        chatId = newChat.id
      }

      if (window.innerWidth < 768) router.push(`/directChat/${chatId}`)
      else router.push(`/directChat?providedChatId=${chatId}`)
    } catch (err) {
      console.error('start message error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full items-center justify-center text-center text-sm sm:text-lg lg:text-xl">
      {isConnected ? (
        <button onClick={handleMessageClick} disabled={loading} className="bg-blue-600 text-white rounded-md py-2 px-4 w-full font-semibold">
          {loading ? 'Loading...' : 'Message'}
        </button>
      ) : pendingFromOther ? (
        <button onClick={handleAccept} disabled={loading} className="bg-blue-600 text-white rounded-md py-2 px-4 w-full font-semibold">
          {loading ? 'Accepting...' : 'Accept'}
        </button>
      ) : invited ? (
        <button disabled className="bg-slate-200 text-slate-900 rounded-md py-2 px-4 w-full font-semibold cursor-not-allowed">
          Requested
        </button>
      ) : (
        <button onClick={handleInvite} disabled={loading} className="bg-blue-600 text-white rounded-md py-2 px-4 w-full font-semibold">
          {loading ? 'Sending...' : 'Connect'}
        </button>
      )}
    </div>
  )
}