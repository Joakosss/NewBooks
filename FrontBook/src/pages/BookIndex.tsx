import { useQuery } from "@tanstack/react-query";
import Book from "../types/Book";
import BookCard from "../components/BookCard";
import { SimpleGrid } from "@chakra-ui/react";
import { fetchIndexBook } from "../api/FnFetchIndexParams";

function BookIndex() {
  const { isLoading, isError, data } = useQuery<Book[]>({
    queryKey: ["IndexBooks"],
    queryFn: fetchIndexBook,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <>
      {isLoading && <strong>Cargando</strong>}
      {isError && <strong>Error</strong>}
      <h1>Más Populares</h1>
      {!isLoading && (data ?? []).length > 1 && (
        <SimpleGrid minChildWidth="150px" gap={10} width="100%">
          {data?.map((book: Book) => (
            <BookCard key={book.id} book={book} handleNavigate={() => {}} />
          ))}
        </SimpleGrid>
      )}
      {isError && (data ?? []).length === 0 && <strong>No hay libros</strong>}
    </>
  );
}

export default BookIndex;
