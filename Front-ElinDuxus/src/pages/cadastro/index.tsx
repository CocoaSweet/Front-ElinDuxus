import { useState } from "react";
import UsePost from "../../usePost";
import { useIntegranteData } from "../../integrantesData";
import { Form, FormButton } from "../../components/form/styledComponents";
import ComposicaoTime from "../../types/ComposicaoTime";

export default function Cadastro() {
    const [dataTime] = useState(new Date());
    const [idTime, setIdTime] = useState(0);
    const [idIntegrante, setIdIntegrante] = useState(0);
    const [integrantes, setIntegrantes] = useState<number[]>([]);
    const [response, setResponse] = useState('');
    const { mutate } = UsePost();
    const { data } = useIntegranteData();

    function CriarTime() {
        mutate(
            {
                endpoint: "criar-time",
                data: JSON.stringify({ dataTime})
            },
            {
                onSuccess: (response: { data: number}) => {
                    setIdTime(response.data); 
                }
            }
        );
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        CriarTime();

        const compTime: ComposicaoTime = {
            idTime: idTime,
            idIntegrante: integrantes
        };

        mutate(
            {
                endpoint: "compor-time",
                data: compTime
            },
            {
                onSuccess: (response: { data: any }) => {
                    setResponse(response.data);
                }
            }
        );
    };

    function AdicionarItem(novoItem: number) {
        if (!integrantes.includes(novoItem)) {
            setIntegrantes((prevItens) => [...prevItens, novoItem]);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <select value={idIntegrante} onChange={(event) => setIdIntegrante(Number(event.target.value))}>
                    {data?.map((e) => (
                        <option value={e.id} key={e.id}>{e.nome}</option>
                    ))}
                </select>
                <FormButton type="button" onClick={() => AdicionarItem(idIntegrante)}>Adicionar</FormButton>

                <FormButton type="submit">Compor time</FormButton>
            </Form>

            <pre>{response}</pre>
        </>
    );
}
