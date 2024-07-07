import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, storeActions, RootState } from "../../store/store";
import { fetchUsers } from "../../store/slices";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const UserQuantitySelector = () => {
  const [usersNumberValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatchUsers = useDispatch<AppDispatch>();
  const numberOfUsers = useSelector((store: RootState) => store.users.numberOfUsers);
  const users = useSelector((store: RootState) => store.users.usersInitiallyFetched)


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
    if (searchValue) {
      const requestArg = { usersNr: numberOfUsers, word: searchValue };
      dispatchUsers(fetchUsers(requestArg));
    }
  }, [searchValue, dispatchUsers, numberOfUsers]);

 

  const handleFetchOnClick:() => void = useCallback(() => {

    if (usersNumberValue) {
      // Handling sync state update via normal reducers
      dispatchUsers(storeActions.users.setUsersNumber(Number(usersNumberValue)));
      const requestArg = { usersNr: Number(usersNumberValue) };

      // Handling async state update via thunk function (and extraReducers)
      dispatchUsers(fetchUsers(requestArg));
      
    }
  }, [usersNumberValue, dispatchUsers]);

  const clearInputs = useCallback(()=>{
    setInputValue("")
    setSearchValue("")
    dispatchUsers(storeActions.users.setUsersList(users))
  },[dispatchUsers, users])
  

  return (
    <div  style={{ display: "flex", justifyContent:'space-evenly', padding:'16px 24px' }}>
      <div style={{ display: "flex" }}>
        <Input
          verifyValue={verifyUsersNumberValue}
          inputValue={usersNumberValue}
          placeholder={"Number of users"}
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
      <Input
        placeholder="Search user"
        verifyValue={verifySearchValue}
        inputValue={searchValue}
        errMessage="Please enter only letters."
      />

      <Button ariaLabel='clear' variant='secondary' children='Clear inputs' onClick={clearInputs}/>



    </div>
  );
};
