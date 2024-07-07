import styled from "styled-components";
import { Theme } from "../../theme/types";
import { ButtonVariants } from "./types";

const getButtonStyles = (theme: Theme, variant?: ButtonVariants) => {
  switch (variant) {
    case "primary":
      return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
    case "secondary":
      return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.dark};
          border: 1px solid transparent;
        `;
    default:
      return "";
  }
};

export const StyledButton = styled.button<{ variant?: ButtonVariants }>`
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.typography.fontSizes.medium};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 120px;
  // width: 15%;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme, variant }) => getButtonStyles(theme as Theme, variant)}
`;
