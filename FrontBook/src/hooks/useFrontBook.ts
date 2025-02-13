import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Book from "../types/Book";
import TransformResponceToBookType from "../helpers/TransformResponceToBookType";


function fetchSearchBook(searchTerms: string):Promise<Book[]>{
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const params = {
    q: encodeURIComponent(searchTerms.trim()),
    maxResults: 10,
    langRestrict: 'es',
    printType: "books",
  };
  return axios.get(url, { params })
    .then((response) => {
    return TransformResponceToBookType(response.data)
    })
    .catch (()=>{
      return []
    });
}


export function useSearchBook() {
  return useMutation({
    mutationFn:fetchSearchBook
  });
}