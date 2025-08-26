import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key so we can insert groups
)

export async function matchUsers(groupSize = 5) {
  // 1. Get users waiting in staging_pool
  const { data: waitingUsers, error: fetchError } = await supabase
    .from('staging_pool')
    .select('id, user_id')
    .eq('status', 'waiting')
    .order('created_at', { ascending: true })
    .limit(groupSize)

  if (fetchError) throw fetchError
  if (!waitingUsers || waitingUsers.length < groupSize) {
    return { message: 'Not enough users yet' }
  }

  const userIds = waitingUsers.map(u => u.user_id)

  // 2. Create new group
  const { data: newGroup, error: groupError } = await supabase
    .from('groups')
    .insert({}) // add metadata if needed (name, type, etc.)
    .select()
    .single()

  if (groupError) throw groupError

  // 3. Link users to the group
  const { error: linkError } = await supabase
    .from('user_groups')
    .insert(
      userIds.map(user_id => ({
        user_id,
        group_id: newGroup.id
      }))
    )

  if (linkError) throw linkError

  // 4. Mark users as matched in staging_pool
  const { error: updateError } = await supabase
    .from('staging_pool')
    .update({ status: 'matched' })
    .in('id', waitingUsers.map(u => u.id))

  if (updateError) throw updateError

  return { message: 'Group created', group: newGroup, members: userIds }
}