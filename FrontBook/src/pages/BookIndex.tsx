import { useQuery } from "@tanstack/react-query";
import Book from "../types/Book";
import BookCard from "../components/BookCard";
import { Box, SimpleGrid, Text, Skeleton, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchIndexBook } from "../api/FnFetchIndexParams";
import { colors } from "../colors";
function BookIndex() {
  const { isLoading, isError, data } = useQuery<Book[]>({
    queryKey: ["IndexBooks"],
    queryFn: fetchIndexBook,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const navigate = useNavigate();
  const handleNavigate = (book: Book) => {
    navigate(`/addBook`, { state: { book } });
  };

  return (
    <>
      {isError && <strong>Error</strong>}
      <Box
        bg={colors.brand.tertiary}
        p="0rem 1rem 2rem 1rem"
        borderRadius={"10px"}
        boxShadow={"lg"}
      >
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Más Populares
        </Text>
        <SimpleGrid gap={{ base: 3, md: 10 }} templateColumns="repeat(4, 1fr)">
          {isLoading && (
            <>
              <Skeleton maxW={"300px"} w={"100"} aspectRatio="2/3"></Skeleton>
              <Skeleton maxW={"300px"} w={"100"} aspectRatio="2/3"></Skeleton>
              <Skeleton maxW={"300px"} w={"100"} aspectRatio="2/3"></Skeleton>
              <Skeleton maxW={"300px"} w={"100"} aspectRatio="2/3"></Skeleton>
            </>
          )}

          {!isLoading &&
            (data ?? []).length > 1 &&
            data?.map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                handleNavigate={() => handleNavigate(book)}
              />
            ))}
        </SimpleGrid>
      </Box>

      <Box
        bg={colors.brand.tertiary}
        p="1rem 1rem 2rem 1rem"
        borderRadius={"10px"}
        boxShadow={"lg"}
      >
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Mis lecturas
        </Text>
        {!isLoading && (data ?? []).length > 1 && (
          <SimpleGrid
            gap={{ base: 3, md: 10 }}
            templateColumns="repeat(4, 1fr)"
          ></SimpleGrid>
        )}
      </Box>
      {isError && (data ?? []).length === 0 && <strong>No hay libros</strong>}
    </>
  );
}

export default BookIndex;
