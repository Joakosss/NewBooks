import axios from "axios";
import Book from "../types/Book";
import {useMutation } from "@tanstack/react-query";
import { refreshToken } from "./refreshToken";


export function useSaveMyBook(){
  const url = "http://127.0.0.1:8000/add-my-reading/"
  const tokensString = window.localStorage.getItem("tokens")
  const tokens = tokensString ? JSON.parse(tokensString): null
  let header = {"Authorization":`Bearer ${tokens.access}` }

  return useMutation({
    mutationFn:(book:Book)=>
      axios.post<Book>(url,book,{headers:header})
    .then((response)=>{
        return response.data})
      .catch((error)=>{
        if (error.response && error.response.status === 401) {
          console.log("revalidando token")
          return refreshToken().then(
              (newAccessToken)=>{
                  header = {"Authorization":`Bearer ${newAccessToken}` }
                  return axios.post<Book>(url,book,{headers:header})
              }
          )
        }
        throw error()})
  })
}

