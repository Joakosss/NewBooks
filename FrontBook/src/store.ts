import { create } from "zustand";

type TokensType ={
    refresh: string;
    access: string
}

type authStoreType = {
    tokens:TokensType|null
    setAuth: (tokens:TokensType)=>void;
    logout: ()=>void;
    isAuthenticated: ()=>void;
}


const useAuthStore = create<authStoreType>((set)=>({
    tokens: null,
    setAuth: (tokens: TokensType) => {
        set({ tokens });
        localStorage.setItem("tokens", JSON.stringify(tokens));
    },

    logout: () => {
        set({ tokens: null });
        localStorage.removeItem("tokens");
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token'); // Opcional: verificar el token en localStorage
        return !!token;
    },
}));

export default useAuthStore