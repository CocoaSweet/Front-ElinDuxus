import axios, {AxiosPromise} from "axios"
import { useQuery } from "@tanstack/react-query"
import Integrante from "./types/Integrante"

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<Integrante[]> => {
    const response = axios.get(API_URL + '/resgatar-integrantes')
    return response
}

export function useIntegranteData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['integrante-data'],
        retry: 2
    })

    return{
        ...query,
        data: query.data?.data
    }
}