import { useEffect, useRef } from "react";
import { UserCard } from "../UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, storeActions } from "../../store/store";
import { fetchUsers } from "../../store/slices";

const UserList: React.FC = () => {
  const dispatchUsers = useDispatch<AppDispatch>();
  const users = useSelector((store: RootState) => store.users.users);
  const usersInitiallyFetched = useSelector((store: RootState) => store.users.usersInitiallyFetched)
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) return;
    // first fetch to the API and handle state/error via fetchUsers thunk
    if (status === "idle" && !users) {
      dispatchUsers(fetchUsers({}));
      hasFetchedData.current = true;
    }

  }, [dispatchUsers, status, users, usersInitiallyFetched]);


  useEffect(()=>{
    // store the first API response only if the status of the async function was succeeded
    if(status === 'succeeded' && !usersInitiallyFetched) {
      dispatchUsers(storeActions.users.setFirstUsersList(users))
   }
  },[dispatchUsers, usersInitiallyFetched, status, users])

  let content;

  if (status === "loading") {
    content = <div style={{margin:"auto", fontSize:'2rem'}}>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <div
        style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" , padding:'40px 0'}}
      >
        {users?.map((user: any) => (
          <UserCard
            key={user.cell}
            imageUrl={user.picture.large}
            name={user.name}
          />
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = <div style={{margin:"auto", fontSize:'2rem', color:'red'}}>{error}</div>;
  }

  return (   
    <>{content}</>
  );
};

export default UserList;
