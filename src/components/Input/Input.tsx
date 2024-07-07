import { FC, useState } from "react";
import { StyledInput, WarningMessage } from "./styles";

interface Props {
  verifyValue: (value: string) => boolean;
  inputValue: string;
  placeholder?: string;
  errMessage: string;
  handleFetchUsers?: () => void;
}

export const Input: FC<Props> = ({
  verifyValue,
  inputValue,
  placeholder,
  errMessage,
  handleFetchUsers
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checkValidation = verifyValue(value);
    setIsValid(checkValidation);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
 if (e.key === 'Enter' && handleFetchUsers) {
      handleFetchUsers();
    }
  };

  return (
    <div style={{position: "relative"}}>
      <StyledInput
       id="inputField"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      {!isValid && <WarningMessage> {errMessage} </WarningMessage>}
    </div>
  );
};
