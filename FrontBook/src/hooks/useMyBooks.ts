import axios from "axios";
import { MyReading } from "../types/MyReading";
import { useQuery } from "@tanstack/react-query";
import { refreshToken } from "./refreshToken";



const queryMyBooks = async ():Promise<MyReading[]> => {
    const url = "http://127.0.0.1:8000/read-my-readings";
    const tokensString = window.localStorage.getItem("tokens")
    const tokens = tokensString ? JSON.parse(tokensString): null
    let header = {"Authorization":`Bearer ${tokens.access}` }

    return axios.get(url, {headers: header })
    .then((response)=>response.data)
    .catch((error)=>{
        if (error.response && error.response.status === 401) {
            refreshToken().then(
                (newAccessToken)=>{
                    header = {"Authorization":`Bearer ${newAccessToken}` }
                    return axios.get(url, {headers: header})
                }
            )
          }
          throw error()})
}

export function useMyBooks() {
    return useQuery({
        queryKey:["mis libros"],
        queryFn: () => queryMyBooks()
    })
}