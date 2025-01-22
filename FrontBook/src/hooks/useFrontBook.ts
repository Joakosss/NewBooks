import { queryFrontBooks } from "../api/getBooks"
import { useQuery } from "@tanstack/react-query"


export function useFrontBook(query:string){
    return useQuery({
        queryKey:["book", query],
        queryFn: () => queryFrontBooks(query)
    })
}
