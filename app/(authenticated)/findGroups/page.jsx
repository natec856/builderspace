import MainAuth from "@/components/MainAuth";
import FindGroupsContainer from "@/components/findGroups/FindGroupsContainer";
import Header from "@/components/generalComponents/Header";
import MobileNav from "@/components/generalComponents/MobileNav";

export const metadata = {
    title: "BuilderSpace",
  };

export default function FindGroupsPage() {

  return (
    <MainAuth>
      <Header />
      <MobileNav />
      <FindGroupsContainer />
    </MainAuth>
  )
}
