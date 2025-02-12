import axios from "axios";



export async function refreshToken(){
    const stringToken = window.localStorage.getItem("tokens")
    const tokens = stringToken? JSON.parse(stringToken):null
    const response = await axios.post("http://127.0.0.1:8000/token/refresh/",{refresh:tokens.refresh})
    const newTokens = {
        access: response.data.access,
        refresh: tokens.refresh,
    }
    window.localStorage.setItem("tokens", JSON.stringify(newTokens))
    return newTokens.access;
}
