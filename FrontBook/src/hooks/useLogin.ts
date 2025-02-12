import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const queryLogin=(email:string,pass:string)=>{
    const url = `http://127.0.0.1:8000/login/`
    return axios.post(url,{username:email,password:pass})
    .then((response) => {
        /* Guardamos los tokens en memoria */
        window.localStorage.setItem("tokens", JSON.stringify(response.data))
        return response.data
    })
    .catch((error)=>{throw new error()})
}

export function useLogin(){
    return useMutation({
        mutationFn: ({ email, pass }: { email: string; pass: string }) => queryLogin(email, pass)
    })
}