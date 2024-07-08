import { UserSlideShow } from "../components/SlideShow/UserSlideShow";
import UserList from "../components/UserList/UserList";
import { UserFilters } from "../components/UserFilters/UserFilters";
import { PageWrapper } from "./styles";

export const Home = () => {
  return (
    <PageWrapper>
      <UserSlideShow/>
      <UserFilters/>
      <UserList/>
    </PageWrapper>
  );
};
