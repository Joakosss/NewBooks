import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import useAuthStore from "../store"

const queryLogin=(email:string,pass:string)=>{
    const url = `http://127.0.0.1:8000/login/`
    return axios.post(url,{username:email,password:pass})
    .then((response) => {
        /* llamamos el store de zustance con las credenciales */
        useAuthStore.getState().setAuth(response.data)

        /* Guardamos los tokens en memoria */
        /* window.localStorage.setItem("tokens", JSON.stringify(response.data)) */
        return response.data
    })
    .catch((error)=>{
        throw new error(error)})
}

export function useLogin(){
    return useMutation({
        mutationFn: ({ email, pass }: { email: string; pass: string }) => queryLogin(email, pass)
    })
}