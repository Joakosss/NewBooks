import axios from "axios";
import { refreshToken } from "../hooks/refreshToken";
import useAuthToken from "../store/storeAuthZustand";
import TransformResponceToBookType from "../helpers/TransformResponceToBookType";


export function getRequestToken(url:string){
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
            .catch(()=>{
                useAuthToken.getState().logout()
                throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
            })
        }
        throw new Error(error)
    })
}

export function postRequest(url:string,data:object){
    let header = {"Authorization":`Bearer ${useAuthToken.getState().tokens?.access}`}
    return axios.post(url, data, {headers:header})
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
            .catch(()=>{
                useAuthToken.getState().logout()
                throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
            })
        }
        throw new Error(error)
    })
}
export function patchRequestToken(url:string, data:object, myReadingId:string){

    let header = {"Authorization":`Bearer ${useAuthToken.getState().tokens?.access}`}
    return axios.patch(url,{myReadingId:myReadingId, myReading:data},{headers:header})
    .then((response)=>{
        return response.data
    }).catch((error)=>{
        if (error.response && error.response.status === 401){
            return refreshToken()
            .then((newAccessToken)=>{
                header = {"Authorization":`Bearer ${newAccessToken}`}
                return axios.patch(url,{myReadingId:myReadingId, myReading:data},{headers:header})
            })
            .catch(()=>{
                useAuthToken.getState().logout()
                throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
            })
        }else{
            console.error(error.response.data)
            throw error;
        }
    })
}

export function deleteRequestToken(myReadingId:string){
    const url = "http://127.0.0.1:8000/my-readings/"
    let header = {"Authorization":`Bearer ${useAuthToken.getState().tokens?.access}`}
    return axios.delete(url, { data: { myReadingId }, headers: header })
    .then((response)=>{
        return response.data
    }).catch((error)=>{
        if (error.response && error.response.status === 401){
            return refreshToken()
            .then((newAccessToken)=>{
                header = {"Authorization":`Bearer ${newAccessToken}`}
                return axios.delete(url, { params: { myReadingId }, headers: header })
            })
            .catch(()=>{
                useAuthToken.getState().logout()
                throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.")
            })
        }else{
            console.error(error.response.data)
            throw error;
        }
    })

}



export function getRequestGoogleApi(url:string, searchTerms:string,maxResults:number=10){
    const params = {
        q: encodeURIComponent(searchTerms.trim()),
        maxResults: maxResults,
        langRestrict: 'es',
        printType: "books",
    };
    return axios.get(url,{params})
    .then((response)=>{
        return TransformResponceToBookType(response.data)
    }).catch((error)=>{
        throw new Error(error)
    })
}