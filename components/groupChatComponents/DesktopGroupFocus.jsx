'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import DesktopGroupHeader from './DesktopGroupHeader'
import GroupMemberPreview from './GroupMemberPreview'

export default function DesktopGroupFocus({ groupId, onMessage, currentUserUsername }) {
  const [members, setMembers] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [color, setColor] = useState('')
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
          .select('name, color, user_groups(users(id, username, name, avatar_url))')
          .eq('id', groupId)  // Filter by the given groupId
          .single()           // Expect only one result (single row)

        if (error) throw error  // If error returned, throw it to catch block

        setGroupName(data.name) // Set the group name state to the fetched group's name

        setColor(data.color)

        // Extract the nested users from the user_groups array, filter out any nulls
        const users = data.user_groups.map(ug => ug.users).filter(Boolean)

        setMembers(users)      // Update members state with the user list
      } catch (err) {
        console.error('Error fetching group members:', err) // Log errors to console
        setError(err.message)     // Store error message in state for UI display or logic
        setMembers([])            // Clear members if error occurs
        setGroupName('')          // Clear group name on error

        setColor('')              // Clear group color on error
      } finally {
        setIsLoading(false)       // End loading state regardless of success or failure
      }
    }

    fetchGroupMembers() // Call the async fetch function defined above

    // Dependency array triggers this effect when groupId or supabase client changes
  }, [groupId, supabase])


  const handleLocalChange = (newName) => {
      setGroupName(newName); // just update local state
    };

    const handleSave = async () => {
      const previousName = groupName;

      const { error } = await supabase
        .from('groups')
        .update({ name: groupName })
        .eq('id', groupId);

      if (error) {
        console.error('Error updating group name:', error);
        setGroupName(previousName); // revert if fail
      }
    };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading group members...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading group members: {error}</p>
  }

  return (
    <div className="bg-white rounded-md h-fit w-full max-w-screen-md mx-2 mt-4 mb-35 flex flex-col shadow-md shadow-slate-400">
      <DesktopGroupHeader
        groupId={groupId}
        isEditing={isEditing}
        groupName={groupName}
        color={color}
        onChange={handleLocalChange}
        onEdit={() => setIsEditing(true)}
        onDone={() => {
          setIsEditing(false);
          handleSave();
        }}
        onMessage={onMessage}
      />
{/* Render list of group members */}
      <ul>
        {members.length === 0 ? (
          <li className="text-center text-gray-500">No members found</li>
        ) : (
          members
            .slice()
            .sort((a, b) => (a.name.localeCompare(b.name)))
            .map(user => (
            <li key={user.id}>
              <GroupMemberPreview
                currentUserUsername={currentUserUsername}
                username={user.username}
                user_id={user.id}
                name={user.name}
                avatar_url={user.avatar_url}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}