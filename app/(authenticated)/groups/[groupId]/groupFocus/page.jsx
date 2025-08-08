import React from 'react'
import GroupFocus from '@/components/groupChatComponents/GroupFocus';
import Main from '@/components/MainPublic';
import MainAuth from '@/components/MainAuth';


export default async function GroupFocusPage({params}) {
    
  const { groupId } = await params;
    
  return (
    <MainAuth>
        <GroupFocus groupId = {groupId} />
    </MainAuth>
  )
}
