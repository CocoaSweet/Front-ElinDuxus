import { MainContainer, Container } from "./styledComponents"
import { Outlet } from "react-router-dom"

export default function PaginaBase(){
    return(
        <MainContainer>
            <Container>
                <Outlet/>
            </Container>
        </MainContainer>
    )
}