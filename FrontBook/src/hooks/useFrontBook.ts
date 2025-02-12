import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Book from "../types/Book";

type GoogleBookItem = {
    id: string;
    volumeInfo: {
      title?: string;
      description?: string;
      pageCount?: number;
      authors?: string[];
      categories?: string[];
      imageLinks?: {
        thumbnail?: string;
      };
    };
  };


export function useSearchBook() {
  const url = 'https://www.googleapis.com/books/v1/volumes';
  return useMutation({
    mutationFn:(searchTerms: string):Promise<Book[]>=>{
        const params = {
          q: encodeURIComponent(searchTerms.trim()),
          maxResults: 10,
          langRestrict: 'es',
        };
        return axios.get(url, { params }).then((response) => {
            console.log(response.data)
          return response.data.items.map((item: GoogleBookItem) => ({
            id: item.id,
            title: item.volumeInfo.title || "Sin titulo",
            description: item.volumeInfo.description || "Sin descripcion",
            pages: item.volumeInfo.pageCount || "Sin páginas",
            author: item.volumeInfo.authors?.[0]|| "Autor desconocido",
            category: item.volumeInfo.categories?.[0] || "Sin categoria",
            imgLink: item.volumeInfo.imageLinks?.thumbnail || "",
          }));
        });
    }
  });
}