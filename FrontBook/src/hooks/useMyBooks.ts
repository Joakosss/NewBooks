import axios from "axios";
import { MyReading } from "../types/MyReading";
import { useQuery } from "@tanstack/react-query";



const queryMyBooks = (email:string):Promise<MyReading[]> => {
    const url = "http://127.0.0.1:8000/read-my-readings";
    return axios.get(url,{params:{email}})
    .then((response)=>response.data)
    .catch((error)=>{throw error()})
}

export function useMyBooks(email:string) {
    return useQuery({
        queryKey:["mis libros"],
        queryFn: () => queryMyBooks(email)
    })
}