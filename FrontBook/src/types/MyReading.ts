import Book from "./Book";
export type MyReading = {
    id: string,
    book?:Book,
    state: "pendiente"|"leyendo"|"finalizado"|"abandonado" ,
    currentPage: number,
    calification: 1|2|3|4|5|null,
    comments: string|null,
    startReading: Date|null,
    finishReading: Date|null,
    bookType: "fisico" | "digital" | "audio" ,
}; 

