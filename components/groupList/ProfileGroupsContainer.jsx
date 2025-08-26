'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import ProfileGroupList from './ProfileGroupList'

export default function ProfileGroupsContainer({ user_id }) {
  const supabase = createClient()
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function fetchGroups() {
      const { data: userGroups, error: groupsError } = await supabase
        .from("user_groups")
        .select(`
          joined_at,
          groups ( 
            id,
            name,
            description,
            last_message,
            last_message_date,
            color
          )
        `)
        .eq("user_id", user_id);

      if (groupsError) {
        console.error("Error fetching groups:", groupsError);
        return;
      }

      setGroups(userGroups);
    }

    if (user_id) fetchGroups();
  }, [supabase, user_id]);

  return (
    <div className="flex flex-col items-center bg-white shadow-md shadow-slate-400 rounded-md h-fit px-4 py-6">
      <ProfileGroupList groups={groups} />
    </div>
  )
}