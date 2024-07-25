import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, storeActions, RootState } from "../../store/store";
import { fetchUsers } from "../../store/slices";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import debounce from "lodash.debounce";

export const UserFilters = () => {
  const [usersNumberValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const didMountRef = useRef(false);

  const dispatchUsers = useDispatch<AppDispatch>();
  const numberOfUsers = useSelector((store: RootState) => store.users.numberOfUsers);
  const users = useSelector((store: RootState) => store.users.usersInitiallyFetched);
  const usersList = useSelector((store: RootState) => store.users.users);

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

  useEffect(() => {
    if (didMountRef.current) {
      if (!isFirstFetch && usersList && usersList.length > 0) {
        window.scrollTo(0, 500);
      }
    } else {
      didMountRef.current = true;
    }
  }, [usersList, isFirstFetch]);

  const debouncedFetchUsers = useMemo(() =>
      debounce((value: string) => {
        let requestArg: { usersNr?: number; word?: string } = {};

        if (!isNaN(Number(value))) {
          requestArg.usersNr = Number(value);
        } else {
          requestArg.word = value;
          requestArg.usersNr = Number(usersNumberValue) || numberOfUsers;
        }

        dispatchUsers(fetchUsers(requestArg));
        setIsFirstFetch(false);
      }, 300),
    [dispatchUsers, numberOfUsers, usersNumberValue]
  );

  useEffect(() => {
    if (usersNumberValue) {
      debouncedFetchUsers(usersNumberValue);
    }
  }, [usersNumberValue, debouncedFetchUsers]);

  useEffect(() => {
    if (searchValue) {
      debouncedFetchUsers(searchValue);
    }
  }, [searchValue, debouncedFetchUsers]);

  const clearInputs = useCallback(() => {
    setInputValue("");
    setSearchValue("");
    dispatchUsers(storeActions.users.setUsersList(users));
  }, [dispatchUsers, users]);

  return (
    <div style={{display: "flex", justifyContent: "space-evenly", padding: "16px 24px"}}>
      <Input
        verifyValue={verifyUsersNumberValue}
        inputValue={usersNumberValue}
        placeholder={"Number of users"}
        errMessage=" Only numeric values greater than 0 are allowed."
      />
      <Input
        placeholder="Search user"
        verifyValue={verifySearchValue}
        inputValue={searchValue}
        errMessage="Please enter only letters."
      />
      <Button
        ariaLabel="clear"
        variant="secondary"
        children="Clear inputs"
        onClick={clearInputs}
      />
    </div>
  );
};
