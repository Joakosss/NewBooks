import axios from "axios";
import useAuthToken from "../store/storeAuthZustand";



export async function refreshToken(){
    const refresh = useAuthToken.getState().tokens?.refresh || ''
    const response = await axios.post("http://127.0.0.1:8000/token/refresh/",{refresh:refresh})
    const newTokens = {
        access: response.data.access,
        refresh: refresh,
    }
    useAuthToken.getState().setAuth(newTokens)
    return newTokens.access;
}
