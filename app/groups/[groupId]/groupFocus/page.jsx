import React from 'react'
import GroupFocus from '@/components/groupChatComponents/GroupFocus';
import Main from '@/components/Main';


export default async function GroupFocusPage({params}) {
    
  const { groupId } = await params;
    
  return (
    <Main>
        <GroupFocus groupId = {groupId} />
    </Main>
  )
}
