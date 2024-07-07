import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 2rem;
border-radius: 2rem;
margin: 1rem;
background: linear-gradient(180deg, rgba(53 61 65) 0%, rgba(0,255,106,0.1) 100%);
`;

export const Header = styled.h2`
font-size: ${({ theme }) => theme.typography.fontSizes.extraLarge};
color: #29b9aa;
text-align: center;
margin-bottom: 40px;
`;

export const CardContainer = styled.div`
display: flex;
justify-content: center;
gap: 20px;
flex-wrap: wrap;
border-radius: 15px;
box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24)
`;

export const Controls = styled.div`
  margin-top: 20px;
  display:flex;
  justify-content: center;
  gap: 20px
`;


