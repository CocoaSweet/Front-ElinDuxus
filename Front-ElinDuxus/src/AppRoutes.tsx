import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaBase from "./pages/paginaBase"
import PaginaInicial from "./pages/paginaInicial";
import Cadastro from "./pages/cadastro"
import CadastroIntegrante from "./pages/cadastroIntegrante";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaBase/>}>
                    <Route index element={<PaginaInicial/>}/>
                    <Route path="/cadastrarComposicao" element={<Cadastro/>}/>
                    <Route path="/cadastrarIntegrante" element={<CadastroIntegrante/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}