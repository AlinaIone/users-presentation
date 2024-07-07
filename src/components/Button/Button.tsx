import { FC, ReactNode } from "react";
import { StyledButton } from "./styles";
import { ButtonVariants } from "./types";

interface Props {
  children?: ReactNode;
  ariaLabel: string;
  variant?: ButtonVariants;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<Props> = ({ children, ariaLabel, variant, onClick }) => (
  <StyledButton aria-label={ariaLabel} variant={variant} onClick={onClick}>
    {children}
  </StyledButton>
);
