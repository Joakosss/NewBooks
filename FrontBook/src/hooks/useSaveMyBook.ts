import axios from "axios";
import Book from "../types/Book";
import {useMutation } from "@tanstack/react-query";


export function useSaveMyBook(){
  return useMutation({
    mutationFn:(book:Book)=>
      axios.post<Book>("http://127.0.0.1:8000/add-my-reading/",book)
      .then((response)=>response.data)
  })
}

