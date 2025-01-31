import { useQuery } from "@tanstack/react-query"
import Book from "../types/Book"
import axios from "axios"

const queryFrontBooks = (query:string):Promise<Book[]>=>{
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`
    return axios.get(url).then((response)=>{
        console.log(response.data.items)
        return response.data.items.map((item:any)=>({
            id : item.id,
            title : item.volumeInfo.title,
            description : item.volumeInfo.description, 
            pages : item.volumeInfo.pageCount,
            authors : item.volumeInfo.authors,
            categories : item.volumeInfo.categories,
            imgLink : item.volumeInfo.imageLinks.thumbnail
        }))})
}

export function useFrontBook(query:string){
    return useQuery({
        queryKey: ["book", query],
        queryFn: () => query ? queryFrontBooks(query) : Promise.resolve([] as Book[])
    })
}
