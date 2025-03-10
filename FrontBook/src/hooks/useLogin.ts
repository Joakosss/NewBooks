import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import useAuthToken from "../store/storeAuthZustand"


const queryLogin=(email:string,pass:string)=>{
    const url = `http://127.0.0.1:8000/login/`
    return axios.post(url,{username:email,password:pass})
    .then((response) => {
        /* llamamos el store de zustance con las credenciales */
        useAuthToken.getState().setAuth(response.data)
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