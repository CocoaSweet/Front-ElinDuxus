import { styled } from "styled-components";

export const Form = styled.form`
  width: 70%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ::-webkit-scrollbar {
    width: 8px; /* Largura da barra de rolagem */
  }
`

export const FormButton = styled.button`
background-color: #e0952a;
border-radius: 8px;
padding: 12px 16px;
width: 20%;
color: var(--branco);
border: none;
margin: 10px;
font-weight: 700;
line-height: 19px;
textAlign: 'center';
text-decoration: none;
display: inline-block;
color: Ivory;
`