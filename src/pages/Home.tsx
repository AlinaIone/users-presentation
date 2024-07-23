import { UserSlideShow } from "../components/SlideShow/UserSlideShow";
import UserList from "../components/UserList/UserList";
import { PageWrapper } from "./styles";
import { UserFilter } from "../components/UserFilters/UserFilter";

export const Home = () => {
  return (
    <PageWrapper>
      <UserSlideShow/>
      <UserFilter/>
      <UserList/>
    </PageWrapper>
  );
};
