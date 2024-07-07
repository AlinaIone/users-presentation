import { FC } from "react";
import { CardContainer, Image, Content, Name } from "./styles";

interface UserCardProps {
  imageUrl: string;
  name: {
    first: string;
    last: string;
  };
}

export const UserCard: FC<UserCardProps> = ({ imageUrl, name }) => {
  const { first: firstName, last: lastName } = name;
  return (
    <CardContainer >
      <Image src={imageUrl} alt={"title"} />
      <Content>
        <Name>  {firstName} {lastName} </Name>
      </Content>
    </CardContainer>
  );
};
