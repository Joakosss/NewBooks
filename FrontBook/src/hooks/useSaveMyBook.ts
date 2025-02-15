import axios from "axios";
import Book from "../types/Book";
import {useMutation } from "@tanstack/react-query";
import { refreshToken } from "./refreshToken";
import useAuthToken from "../store/storeAuthZustand";
import { MyReading } from "../types/MyReading";


export function useSaveMyBook(){
  const url = "http://127.0.0.1:8000/my-readings/"
  let header = {"Authorization":`Bearer ${useAuthToken.getState().tokens?.access}` }

  return useMutation({
    mutationFn:(data:{ myReading: MyReading, book: Book })=>
      axios.post(url, data, {headers:header})
    .then((response)=>{
        return response.data})
      .catch((error)=>{
        if (error.response && error.response.status === 401) {
          return refreshToken().then(
              (newAccessToken)=>{
                  header = {"Authorization":`Bearer ${newAccessToken}` }
                  return axios.post(url, data, {headers:header})
              }
          )
        }
        throw new Error(error)})
  })
}

