import styled from "styled-components";

const Pressable = styled.a`
background-color: #165371;
border-radius: 8px;
padding: 12px 16px;
width: 20%;
color: var(--branco);
border: none;
font-weight: 700;
line-height: 19px;
textAlign: 'center';
text-decoration: none;
display: inline-block;
color: Ivory;
`
interface Props{
    href?: string,
    title: string;

}

export default function BotaoRota({title, href, }: Props){
    return(
        <Pressable href={href}>{title}</Pressable>
    )
}