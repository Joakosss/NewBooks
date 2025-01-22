import axios from "axios"
import Book from "../types/Book"



export const queryBooks = ():Promise<Book[]>=>{
    const url = 'http://127.0.0.1:8000/api/v1/books/'
    return axios.get<Book[]>(url).then((response)=>response.data)
}

export const queryFrontBooks = (query:string):Promise<Book>=>{
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
    return axios.get<Book>(url).then((response)=>response.data)
}
