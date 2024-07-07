import { FC, useEffect, useRef, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { UserCard } from "../UserCard/UserCard";
import { User } from "../../pages/types";
import { Button } from "../Button/Button";
import { CardContainer, Container, Controls, Header } from "./styles";

export const UserSlideShow: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialUsers = useSelector((store: RootState) => store.users.usersInitiallyFetched as User[]);

  useEffect(() => {
    if (isRunning && initialUsers) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % initialUsers.length);
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, initialUsers]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  if (initialUsers?.length === 0) {
    return <p>No users to display.</p>;
  }

  return (
    <Container>
      <Header> Know your users</Header>
      <CardContainer >
      {initialUsers && (
        <UserCard
          imageUrl={initialUsers[currentIndex].picture.large}
          name={initialUsers[currentIndex].name}
        />
      )}
      </CardContainer>
      <Controls>
     <Button children="Start" onClick={handleStart} ariaLabel="start" variant="primary"/>
        <Button children="Stop" onClick={handleStop} ariaLabel="stop" variant="primary"/>
       </Controls>
    </Container>
  );
};

