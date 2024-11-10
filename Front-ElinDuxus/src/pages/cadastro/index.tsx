import { useState, useEffect } from "react";
import UsePost from "../../usePost";
import styled from "styled-components";
import { useIntegranteData } from "../../IntegrantesData";
import { Form, FormButton } from "../../components/form/styledComponents";
import ComposicaoTime from "../../types/ComposicaoTime";

const Container = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Cadastro() {
    const [dataTime, setDataTime] = useState(new Date())
    const [criarTime, setCriarTime] = useState('')
    const [idTime, setIdTime] = useState(0)
    const [idIntegrante, setIdIntegrante] = useState(0)
    const [selectedIntegrantes, setSelectedIntegrantes] = useState([])
    const [integrantes, setIntegrantes] = useState<number[]>([])
    const [response, setResponse] = useState('')
    const { mutate } = UsePost();

    const { data } = useIntegranteData()
    
    //setCriarTime(dataTime.toDateString())

    function CriarTime(datacriacao){

        mutate ( 
            {
                endpoint: "criar-time",
                data: datacriacao
            },
            {
                onSuccess: (response: { data: any }) => {
                    setIdTime(response.data); 
                }
            }
        )
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        CriarTime(dataTime)

        const compTime: ComposicaoTime = {
            idTime: idTime,
            idIntegrante: integrantes
        }

        mutate({
            endpoint: "compor-time",
            data: compTime
        },
        {
            onSuccess: (response: { data: any }) => {
                setResponse(response.data);
            }
        })

    }
    function AdicionarItem(novoItem: number) {
        setIntegrantes((prevItens) => [...prevItens, novoItem]);
    }


    return (
        <>
            <Form onSubmit={handleSubmit}>

                <Form>
                    <select value={selectedIntegrantes} onChange={(event) => setIdIntegrante(Number(event.target.value))} >
                        {data?.map((e) => <option value={e.id} key={e.id}>{e.nome}</option>)}
                    </select>
                    <FormButton type="button" onClick={() => AdicionarItem(idIntegrante)} >Adicionar</FormButton>
                </Form>

                <FormButton type="submit">Compor time</FormButton>
            </Form>

            <pre>{response}</pre>


        </>
    )
}
