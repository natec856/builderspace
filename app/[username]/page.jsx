import Main from "@/components/Main";
import ProfileContainer from "@/components/profileComponents/ProfileContainer";
import mockData from '@/public/mockData.json';
import { notFound } from "next/navigation";

export const metadata = {
  title: "BuilderSpace",
};

export default async function ProfilePage({ params }) {

  const { username } = await params;

  // Search all groupMembers across all groups to find the user
  let user = null;
  for (const group of mockData) {
    const foundUser = group.groupMembers?.find((member) => member.username === username);
    if (foundUser) {
      user = foundUser;
      break;
    }
  }

  if (!user) {
    return notFound();
  }

  return (
    <Main>
      <ProfileContainer user={user} />
    </Main>
  );
}
