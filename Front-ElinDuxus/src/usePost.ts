import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const API_URL = 'http://localhost:8080/'

const postData = async (endpoint: string, data: any): Promise<any> => {
    const response = await axios.post(`${API_URL}${endpoint}`, data)

    return response
}

export default function UsePost() {
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: async ({endpoint, data}: {endpoint: string, data: any}) => postData(endpoint, data),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: []})
        }
    })
    return mutate
}