import axios from "axios";

export const fetchRegister = (username:string,password:string) => {
    return axios
      .post("http://127.0.0.1:8000/register/", {
          username:username,
          password:password
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw new Error (error.response?.data.error)
        }
        
        throw new Error("Error inesperado")
      });
  };