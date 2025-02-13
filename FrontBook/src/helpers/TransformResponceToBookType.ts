/* eslint-disable @typescript-eslint/no-explicit-any */
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


function TransformResponceToBookType(res: any): Book[] {
    console.log(res)
    return res.items.map((book: GoogleBookItem) => ({
      id: book.id,
      title: book.volumeInfo.title || "Sin titulo",
      description: book.volumeInfo.description || "Sin descripcion",
      pages: book.volumeInfo.pageCount || "Sin páginas",
      author: book.volumeInfo.authors?.[0] || "Autor desconocido",
      category: book.volumeInfo.categories?.[0] || "Sin categoria",
      imgLink: book.volumeInfo.imageLinks?.thumbnail || "",
    }));
  }

export default TransformResponceToBookType