'use server'

import { createClient } from '@/utils/supabase/server'

export async function signup(email, password, username) {
  const supabase = await createClient()

  // Validate username characters
  const usernameRegex = /^[a-zA-Z0-9._]+$/
  if (!usernameRegex.test(username)) {
    return { error: 'Username can only contain letters, numbers, periods, and underscores.' }
  }

  // Check if username is taken
  const { data: usernameData, error: usernameError } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single()

  if (usernameData) {
    return { error: 'Username is already taken.' }
  }
  if (usernameError && usernameError.code !== 'PGRST116') {
    return { error: 'Error checking username availability.' }
  }

  // Sign up the user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
      return { error: 'Email is already in use.' }
    }
    return { error: signUpError.message }
  }

  const user = signUpData?.user
  if (!user || !user.id) {
    return { error: 'Failed to retrieve signed up user.' }
  }

  // Insert user into the `users` table
  const { error: insertError } = await supabase
    .from('users')
    .insert([{ id: user.id, email: user.email, username }])

  if (insertError) {
    console.error('Insert Error:', insertError)
    return { error: 'Database error saving new user: ' + insertError.message }
  }

  // ✅ Return username for redirecting to /[username]
  return { error: null, username }
}