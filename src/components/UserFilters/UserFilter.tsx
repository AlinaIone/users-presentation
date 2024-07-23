import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input/Input";
import { fetchUsers } from "../../store/slices";
import { AppDispatch, storeActions, RootState } from "../../store/store";
import { Button } from "../Button/Button";


export const UserFilter = () => {
  const [searchBy, setSearchBy] = useState<string>("Number of users");
  const [usersNumberValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatchUsers = useDispatch<AppDispatch>();
  const numberOfUsers = useSelector((store: RootState) => store.users.numberOfUsers);
  const users = useSelector((store: RootState) => store.users.usersInitiallyFetched);
  const usersList = useSelector((store: RootState) => store.users.users);

  const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(e.target.value);
    setInputValue("")
    setSearchValue("")
  };

  const verifyUsersNumberValue = (value: string) => {
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setInputValue(value);
      return true;
    } else return false;
  };

  const verifySearchValue = (value: string) => {
    if (value === "" || /^[A-Za-z]+$/.test(value)) {
      setSearchValue(value);
      return true;
    } else return false;
  };

  const handleFetchOnClick = useCallback(() => {
    if (usersNumberValue) {
      // Handling sync state update via normal reducers
      dispatchUsers(
        storeActions.users.setUsersNumber(Number(usersNumberValue))
      );
      const requestArg = { usersNr: Number(usersNumberValue) };

      // Handling async state update via thunk function (and extraReducers)
      dispatchUsers(fetchUsers(requestArg));
    }
  }, [usersNumberValue, dispatchUsers]);

  useEffect(() => {
    if (usersList && usersList.length > 0) {
      window.scrollTo(0, 508);
    }
  }, [usersList]);

  useEffect(() => {
    if (searchValue) {
      const requestArg = { usersNr: numberOfUsers, word: searchValue };
      dispatchUsers(fetchUsers(requestArg));
    }
  }, [searchValue, dispatchUsers, numberOfUsers]);

  const clearInputs = useCallback(() => {
    setSearchValue("");
    dispatchUsers(storeActions.users.setUsersList(users));
  }, [dispatchUsers, users]);

  return (
    <div style={{display: "flex", justifyContent: "space-evenly", padding: "16px 24px"}}>
      <div style={{ display: "flex" }}>

        <select id="searchBy" value={searchBy} onChange={handleSearch}>
          <option> Number of users</option>
          <option> Find a user</option>
        </select>

        {searchBy === "Number of users" ? (
          <div style={{ display: "flex" }}>
            <Input
              verifyValue={verifyUsersNumberValue}
              inputValue={usersNumberValue}
              errMessage=" Only numeric values greater than 0 are allowed."
              handleFetchUsers={handleFetchOnClick}
            />
            <Button
              ariaLabel="apply-number"
              variant="secondary"
              children="Apply"
              onClick={handleFetchOnClick}
            />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <Input
              verifyValue={verifySearchValue}
              inputValue={searchValue}
              errMessage="Please enter only letters."
            />
            <Button
              ariaLabel="clear"
              variant="secondary"
              children="Clear"
              onClick={clearInputs}
            />
          </div>
        )}
      </div>
    </div>
  );
};
