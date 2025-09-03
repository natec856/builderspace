'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProfileVisitorBtns({ user }) {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [invited, setInvited] = useState(false)
  const [pendingFromOther, setPendingFromOther] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function checkConnection() {
      const {
        data: { user: currentUser },
        error: userError
      } = await supabase.auth.getUser()

      if (userError || !currentUser) {
        setIsConnected(false)
        setInvited(false)
        setPendingFromOther(false)
        return
      }

      const { data: connectionData } = await supabase
        .from('user_connections')
        .select('id,user_id,connection_id,status')
        .or(
          `and(user_id.eq.${currentUser.id},connection_id.eq.${user.id}),and(user_id.eq.${user.id},connection_id.eq.${currentUser.id})`
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
          // current user is recipient - show "Accept"
          setPendingFromOther(true)
          setInvited(false)
        } else {
          // current user is sender - show "Requested"
          setPendingFromOther(false)
          setInvited(true)
        }
        setIsConnected(false)
      }
    }

    checkConnection()
  }, [supabase, user.id])

  async function handleInvite() {
    setLoading(true)
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !currentUser) {
      alert('You must be logged in to send a connection request.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('user_connections').insert([
      {
        user_id: currentUser.id,
        connection_id: user_id,
        status: 'pending',
      },
    ])

    if (insertError) {
      alert('Failed to send connection request. Please try again.')
      setLoading(false)
      return
    }

    setInvited(true)
    setLoading(false)
  }

  async function handleAccept() {
    setLoading(true)
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('user_connections')
      .update({ status: 'accepted' })
      .eq('connection_id', currentUser.id)
      .eq('user_id', user.id)

    if (error) {
      alert('Failed to accept connection. Please try again.')
      setLoading(false)
      return
    }

    setIsConnected(true)
    setPendingFromOther(false)
    setLoading(false)
  }

  const handleMessageClick = async () => {
      if (loading) return
      setLoading(true)
      // Get authenticated user
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();
      
        if (authError || !authUser) {
          console.error("Auth error:", authError);
          return notFound();
        }
      
        // Get user record from 'users' table
        const { data: userRecord, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
      
        if (userError || !userRecord) {
          console.error("User not found or error:", userError);
          return notFound();
        }
  
      try {
        // 1) find chat that contains BOTH users
        const { data: chats, error: chatsError } = await supabase
          .from('user_chats')
          .select('chat_id')
          .in('user_id', [userRecord.id, user.id])
  
        if (chatsError) throw chatsError
  
        const counts = {}
        for (const c of (chats ?? [])) counts[c.chat_id] = (counts[c.chat_id] || 0) + 1
        let chatId = Object.keys(counts).find(id => counts[id] === 2)
  
        // 2) create chat if missing
        if (!chatId) {
          const { data: newChat, error: createError } = await supabase
            .from('direct_chats')
            .insert({
              last_message: '',
              last_message_date: new Date().toISOString(),
              created_by: userRecord.id
            })
            .select('id')   // now allowed by the SELECT policy above
            .single()
  
          if (createError) throw createError
  
          const { error: linkErr } = await supabase
            .from('user_chats')
            .insert([
              { chat_id: newChat.id, user_id: userRecord.id, name: user.name, username: user.username, avatar_url: user.avatar_url },
              { chat_id: newChat.id, user_id: user.id, name: userRecord.name, username: userRecord.username, avatar_url: userRecord.avatar_url }
            ])
          if (linkErr) throw linkErr
  
          chatId = newChat.id
        }
  
        // 3) route
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
        <button
          onClick={handleMessageClick}
          disabled={loading}
          className="bg-slate-200 text-slate-900 rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold w-full cursor-pointer"
        >
          {loading ? 'Loading...' : 'Message'}
        </button>
      ) : pendingFromOther ? (
        <button
          onClick={handleAccept}
          disabled={loading}
          className="bg-blue-600 text-white rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold w-full cursor-pointer"
        >
          {loading ? 'Accepting...' : 'Accept'}
        </button>
      ) : invited ? (
        <button
          disabled
          className="bg-slate-200 text-slate-900 rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold cursor-not-allowed w-full"
        >
          Requested
        </button>
      ) : (
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-blue-600 text-white rounded-md py-1 px-2 md:py-2 md:px-4 font-semibold disabled:opacity-50 w-full cursor-pointer"
        >
          {loading ? 'Sending...' : 'Connect'}
        </button>
      )}
    </div>
  )
}
