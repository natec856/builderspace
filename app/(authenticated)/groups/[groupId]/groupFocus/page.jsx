import React from 'react'
import GroupFocus from '@/components/groupChatComponents/GroupFocus';
import MainAuth from '@/components/MainAuth';
import Header from '@/components/generalComponents/Header';
import MobileNav from '@/components/generalComponents/MobileNav';


export default async function GroupFocusPage({params}) {
    
  const { groupId } = await params;
    
  return (
    <MainAuth>
      <Header username={userRecord.username}/>
      <MobileNav username={userRecord.username}/>
      <GroupFocus groupId = {groupId} />
    </MainAuth>
  )
}
