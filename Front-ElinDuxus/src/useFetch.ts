import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080/'

interface Props {
    endpoint: string,
    enabled: boolean
}
const fetchData = async (endpoint : string) => {
    const response = await axios.get(`${API_URL}${endpoint}`)
    return response.data
}

export default function useFetchData({ endpoint, enabled }: Props) {
    const query = useQuery({

        queryFn: () => fetchData(endpoint),
        enabled: enabled,
        queryKey: ['allData'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}