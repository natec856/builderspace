import { notFound } from 'next/navigation'
import mockData from '@/public/mockData.json'
import GroupMessaging from '@/components/groupChatComponents/GroupMessagingContainer';

export default async function GroupPage({ params }) {
  const { groupId } = await params;
  const group = mockData.find(group => group.groupId === groupId);
  
  if (!group) {
    return notFound();
  }

  return (
    <div className="h-screen">
      <GroupMessaging groupId={groupId} />
    </div>
  )
}