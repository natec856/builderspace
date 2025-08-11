'use client'

import React, { useState, useEffect } from 'react'
import GroupHeader from './GroupHeader'
import GroupMemberPreview from './GroupMemberPreview'
import { createClient } from '@/utils/supabase/client'

export default function GroupFocus({ groupId }) {
  const [members, setMembers] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
  
    const supabase = createClient() // Initialize Supabase client to interact with your backend

    useEffect(() => {
      // If no groupId is provided, clear members and loading state and exit early
      if (!groupId) {
        setMembers([])       // Clear members list
        setIsLoading(false)  // Indicate loading finished
        return               // Exit useEffect early
      }

      // Define an async function to fetch group members and group name
      async function fetchGroupMembers() {
        setIsLoading(true)   // Start loading state
        setError(null)       // Clear any previous errors

        try {
          // Query 'groups' table to select the group's name and nested users in user_groups
          const { data, error } = await supabase
            .from('groups')
            .select('name, user_groups(users(id, username, name))')
            .eq('id', groupId)  // Filter by the given groupId
            .single()           // Expect only one result (single row)

          console.log(data)     // Debug log the returned data

          if (error) throw error  // If error returned, throw it to catch block

          setGroupName(data.name) // Set the group name state to the fetched group's name

          // Extract the nested users from the user_groups array, filter out any nulls
          const users = data.user_groups.map(ug => ug.users).filter(Boolean)

          setMembers(users)      // Update members state with the user list
        } catch (err) {
          console.error('Error fetching group members:', err) // Log errors to console
          setError(err.message)     // Store error message in state for UI display or logic
          setMembers([])            // Clear members if error occurs
          setGroupName('')          // Clear group name on error
        } finally {
          setIsLoading(false)       // End loading state regardless of success or failure
        }
      }

      fetchGroupMembers() // Call the async fetch function defined above

      // Dependency array triggers this effect when groupId or supabase client changes
    }, [groupId, supabase])

    const handleChange = async (newName) => {
      const previousName = groupName; // save previous name to revert on error
      setGroupName(newName);

      const { data, error } = await supabase
        .from('groups')
        .update({ name: newName })
        .eq('id', groupId)  // IMPORTANT: specify which group to update
        .select()
        .single();

      if (error) {
        console.error('Error updating group name:', error);
        setGroupName(previousName); // revert to previous on error
        return;
      }
    };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading group members...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading group members: {error}</p>
  }

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-fit max-w-full mx-2 mt-4 px-4 py-6 mb-35 flex-1">
      <GroupHeader
        groupId={groupId}
        isEditing={isEditing}
        groupName={groupName}
        onChange={handleChange}
        onEdit={() => setIsEditing(true)}
        onDone={() => setIsEditing(false)}
      />

      {/* Render list of members */}
      <ul className="mt-4 space-y-2">
        {members.length === 0 ? (
          <li className="text-center text-gray-500">No members found</li>
        ) : (
          members.map(user => (
            <li key={user.id}>
              <GroupMemberPreview
                username={user.username}
                name={user.name}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}