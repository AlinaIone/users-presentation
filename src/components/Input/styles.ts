import styled from "styled-components";

export const StyledInput = styled.input`
  flex: 1; 
  padding: 10px;
  font-size: ${({ theme }) => theme.typography.fontSizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  outline: none;
  margin: 0 15px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const WarningMessage = styled.span`
  color:red;
  font-size: 0.9rem;
  margin-top: 5px;
  position: absolute;
  display:block;
`