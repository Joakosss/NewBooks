import axios from "axios"
import { MyReading } from "../types/MyReading"
import useAuthToken from "../store/storeAuthZustand"
import { refreshToken } from "../hooks/refreshToken"
// Espera token acces y {myReadingId, myReading:{myReadingData}}


function usePatchMyReading(myReading:MyReading){
    const url = "http://127.0.0.1:8000/my-readings/"
    let header = {"Authorization":`Bearer ${useAuthToken.getState().tokens?.access}`}
    return axios.delete(url, { params: { myReadingId: myReading.id }, headers: header })
    .then((response)=>{
        return response.data
    }).catch((error)=>{
        if (error.response && error.response.status === 401){
            return refreshToken()
            .then((newAccessToken)=>{
                header = {"Authorization":`Bearer ${newAccessToken}`}
                return axios.patch(url,{myReadingId:myReading.id, myReading:myReading},{headers:header})
            })
        }
    })

}
export default usePatchMyReading