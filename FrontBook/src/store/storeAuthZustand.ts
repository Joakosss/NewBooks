import {create} from "zustand"
import {persist} from "zustand/middleware"

type TokensType = {
    refresh: string
    access: string
}

type StoreAuthType={
    tokens : TokensType | null
    setAuth: (tokens:TokensType)=>void 
    logout:()=>void
    isAuthenticate: ()=>boolean  
}

const useAuthToken = create<StoreAuthType>()(persist( 
    (set)=>({
        tokens:null,
        setAuth:(tokens)=>{
            set({tokens})
        },
        logout:()=>{
            set({tokens:null})
            useAuthToken.persist.clearStorage()
        },
        isAuthenticate:()=>{
            const token = localStorage.getItem("tokens")
            return !!token //doble !! para transformar el resultado en boolean
        }
    }),{
        name:"tokens"
    }
))


export default useAuthToken