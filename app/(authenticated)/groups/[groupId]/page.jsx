import { notFound } from 'next/navigation'
import mockData from '@/public/mockData.json'
import GroupMessaging from '@/components/groupChatComponents/GroupMessagingContainer';
import MainAuth from '@/components/MainAuth';
import Header from '@/components/generalComponents/Header';
import MobileNav from '@/components/generalComponents/MobileNav';

export default async function GroupPage({ params }) {
  const { groupId } = await params;
  const group = mockData.find(group => group.groupId === groupId);
  
  if (!group) {
    return notFound();
  }

  return (
    <MainAuth>
      <Header username={userRecord.username}/>
      <MobileNav username={userRecord.username}/>
      <GroupMessaging groupId={groupId} />
    </MainAuth>
  )
}