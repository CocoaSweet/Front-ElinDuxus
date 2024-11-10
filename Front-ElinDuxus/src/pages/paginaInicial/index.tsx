import { useState } from "react";
import Titulo from "../../components/titulo";
import Data from "../../types/Data";
import UsePost from "../../usePost";
import { Form, FormButton } from "../../components/form/styledComponents";
import Input from "../../components/input";
import useFetchData from "../../useFetch";
import { styled } from "styled-components";
import BotaoRota from "../../components/botaoRota";


const Container = styled.div`
    overflow-y: auto;
    height: calc(100vh - 60px);
    padding: 16px;
    justify-content: center;

`;

export default function PaginaInicial() {
    const [dataInicial, setDataInicial] = useState(new Date())
    const [dataFinal, setDataFinal] = useState(new Date())
    const { mutate } = UsePost()
    const [endpoint, setEndpoint] = useState('')
    const [response, setResponse] = useState<any>(null)
    const [dataRequest, setData] = useState(new Date())


    const { data: fetchData, refetch } = useFetchData({
        endpoint: `${endpoint}?data=${dataRequest}`,
        enabled: false
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (endpoint === "time-da-data") {
            refetch().then((result) => {
                setResponse(result.data);
            })

        } else {

            const datas: Data = {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }

            mutate(
                {
                    endpoint,
                    data: datas
                },
                {
                    onSuccess: (response: { data: any }) => {
                        setResponse(response.data);
                    }
                }
            )
        }
    }

    return (
        <>
            <Titulo>Faça sua Consulta</Titulo>
            <h2>ou</h2>
            <BotaoRota href="/cadastrarComposicao" title="Cadastrar composição"/>
            {response && (
                <div>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            <Container>

                {endpoint === "time-da-data" ? (

                    <>
                        <h2>Selecione a data</h2>
                        <Form onSubmit={handleSubmit}>
                            <Input type="date" value={dataRequest} placeholder="Data do time" label="Data" onChange={setData} />
                            <FormButton type="submit">Pesquisar</FormButton>
                        </Form>
                    </>

                ) :
                    (
                        <>
                            <h2>Selecione as datas</h2>
                            <Form onSubmit={handleSubmit}>
                                <Input type="date" value={dataInicial} placeholder="Data inicial" label="Data inicial" onChange={setDataInicial} />
                                <Input type="date" value={dataFinal} placeholder="Data final" label="Data final" onChange={setDataFinal} />
                                <FormButton type="submit">Pesquisar</FormButton>
                            </Form>
                        </>)
                }

                <FormButton onClick={() => setEndpoint("time-da-data")}>Time da Data</FormButton>
                <FormButton onClick={() => setEndpoint("integrante-mais-usado")}>Integrante mais usado</FormButton>
                <FormButton onClick={() => setEndpoint("time-mais-comum")}>Time mais comum</FormButton>
                <FormButton onClick={() => setEndpoint("funcao-mais-comum")}>Função mais comum</FormButton>
                <FormButton onClick={() => setEndpoint("franquia-mais-famosa")}>Franquia mais famosa</FormButton>
                <FormButton onClick={() => setEndpoint("contagem-por-franquia")}>Contagem por franquia</FormButton>
                <FormButton onClick={() => setEndpoint("contagem-por-funcao")}>Contagem por função</FormButton>
            </Container>
        </>
    )
}