import MainAuth from "@/components/MainAuth";
import FindGroupsContainer from "@/components/findGroups/FindGroupsContainer";

export const metadata = {
    title: "BuilderSpace",
  };

export default function FindGroupsPage() {

  return (
    <MainAuth>
      <FindGroupsContainer />
    </MainAuth>
  )
}
