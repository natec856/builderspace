'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  const { error, data: authData } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error || !authData?.user) {
    redirect('/error')
  }

  // Important: only now the cookie has the session
  // so we can query the DB using .from()
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('username')
    .eq('id', authData.user.id)
    .single()

  if (userError || !userData?.username) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect(`/${userData.username}`)
}