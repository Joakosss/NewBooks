import { queryBooks } from "../api/getBooks"
import { useQuery } from "@tanstack/react-query"


export function useBooks(){
    return useQuery({
        queryKey:["books"],
        queryFn:queryBooks
    })
}


