'use client'
import React, { useState, useMemo } from 'react'
import GroupPreview from '@/components/groupList/GroupPreview'
import GroupSearchBar from './GroupSearchBar'

export default function GroupListPage({ groups }) {
  const dummyGroups = [
    { groupId: 'abc123', groupName: 'Frat Buddies', lastMessage: "Don't forget the meeting! It's really important everyone shows up, we'll be voting.", 
    lastMessageDate: '2025-07-21T12:12:00Z' },
    { groupId: 'tyz789', groupName: 'Marketing Team', lastMessage: 'New campaign is live.', lastMessageDate: '2025-07-15T13:45:00Z' },
    { groupId: 'agc123', groupName: 'Study Group', lastMessage: 'Don’t forget the meeting!', lastMessageDate: '2025-07-21T12:12:00Z' },
    { groupId: 'x1z789', groupName: 'Finance Team', lastMessage: 'New campaign is live.', lastMessageDate: '2025-07-15T13:45:00Z' },
    { groupId: 'bbc123', groupName: 'Drinking Buddies', lastMessage: "Don't forget the meeting!", 
    lastMessageDate: '2025-07-21T12:12:00Z' },
    { groupId: 'xyy789', groupName: 'Dev Team', lastMessage: 'New campaign is live.', lastMessageDate: '2025-07-15T13:45:00Z' },
  ]

  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = useMemo(() => {
    return dummyGroups.filter(group =>
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, dummyGroups]);

  return (
    <div className="bg-white shadow-md shadow-slate-400 rounded-md h-full max-h-[400px] md:max-h-[450px] xl:max-h-[500px] 2xl:max-h-[1000px] overflow-y-scroll max-w-full mx-2 mt-4 px-4 py-6 mb-5 flex-1">
      <h1 className="text-2xl sm:text-3xl font-bold">My Groups</h1>
      <GroupSearchBar onSearch={setSearchTerm} />
      <ul>
        {filteredGroups.map(group => (
          <li key={group.groupId}>
            <GroupPreview
              groupId={group.groupId}
              groupName={group.groupName}
              lastMessage={group.lastMessage}
              lastMessageDate={group.lastMessageDate}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
