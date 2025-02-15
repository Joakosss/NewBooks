import axios from "axios";
import { refreshToken } from "../hooks/refreshToken";
import useAuthToken from "../store/storeAuthZustand";


export function getRequest(url:string){
    let header = {"Authorization":`Bearer ${useAuthToken.getState().tokens?.access}`}
    return axios.get(url,{headers:header})
    .then((response)=>{
        return response.data
    }).catch((error)=>{
        if (error.response && error.response.status === 401){
            return refreshToken()
            .then((newAccessToken)=>{
                header = {"Authorization":`Bearer ${newAccessToken}`}
                return axios.get(url,{headers:header})
                .then((response)=>{
                    return response.data
                })
            })
        }
    })
}