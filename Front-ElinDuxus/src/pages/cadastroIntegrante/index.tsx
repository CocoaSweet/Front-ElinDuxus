import { useState } from "react";
import { Form, FormButton } from "../../components/form/styledComponents";
import Input from "../../components/input";
import Titulo from "../../components/titulo";
import Integrante from "../../types/Integrante";
import UsePost from "../../usePost";

export default function CadastroIntegrante() {
    const [franquia, setFranquia] = useState('')
    const [nome, setNome] = useState('')
    const [funcao, setFuncao] = useState ('')
    const { mutate } = UsePost()


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const integrante: Integrante ={
            franquia: franquia,
            nome: nome,
            funcao: funcao
        }

        mutate(
            {
                endpoint: "criar-integrante",
                data: integrante
            }
        )
    }
    return(
        <>
        <Titulo>Digite os integrantes</Titulo>
                    <Form onSubmit={handleSubmit}>
                        <Input type="text" value={nome} placeholder="Digite o nome" label="Nome" onChange={setNome} />
                        <Input type="text" value={funcao} placeholder="Função do integrante" label="Função" onChange={setFuncao} />
                        <Input type="text" value={franquia} placeholder="Franquia do integrante" label="Franquia" onChange={setFranquia} />
                        <FormButton type="submit">Cadastrar</FormButton>
                    </Form>
        </>
    )
    
}