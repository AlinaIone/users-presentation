import { FC, useState } from "react";
import { StyledInput, WarningMessage } from "./styles";

interface Props {
  verifyValue: (value: string) => boolean;
  inputValue: string;
  placeholder?: string;
  errMessage: string;
}

export const Input: FC<Props> = ({ verifyValue, inputValue, placeholder, errMessage }) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkValidation = verifyValue(e.target.value);
    setIsValid(checkValidation);
  };

  return (
    <div style={{position: "relative"}}>
      <StyledInput
        id="inputField"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {!isValid && <WarningMessage> {errMessage} </WarningMessage>}
    </div>
  );
};
