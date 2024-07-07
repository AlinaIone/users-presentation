import styled from "styled-components";

export const CardContainer = styled.div<{ isActive?: boolean }>`
display: flex;
flex-direction: column;
overflow: hidden;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
max-width: 300px;
background-color: #fff;
border-radius: 15px;
padding: 20px;
text-align: center;
transition: all 0.3s ease;
`;

export const Image = styled.img`
width: 100%;
height: 200px;
object-fit: cover;
`;

export const Content = styled.div`
padding: 10px;
`;

export const Name = styled.h3`
margin: 0;
font-size: 1rem;
color: #333;
`;