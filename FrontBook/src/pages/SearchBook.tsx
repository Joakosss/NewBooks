import { useEffect, useState } from "react";
import { useSearchBook } from "../hooks/useFrontBook";
import {
  Button,
  Center,
  Input,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Book from "../types/Book";
import { GiArchiveResearch } from "react-icons/gi";
import BookCard from "../components/BookCard";

function SearchBook() {
  const [searchBook, setSearchBook] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  const { mutate, data } = useSearchBook();

  /* UseEfect para pasar del input al terms la busqueda */
  useEffect(() => {
    const waitingTerms = setTimeout(() => {
      if (searchBook.trim() !== "") {
        setSearchTerms(searchBook);
      }
    }, 500);
    return () => clearTimeout(waitingTerms);
  }, [searchBook]);

  /* UseEffect llama el mutatio con los libros */
  useEffect(() => {
    if (searchTerms.trim() !== "") {
      mutate(searchTerms, {
        onError: (error) => {},
      });
    }
  }, [searchTerms, mutate]);

  /* navegacion de los card al hacerles click */
  const navigate = useNavigate();
  const handleNavigate = (book: Book) => {
    navigate(`/addBook`, { state: { book } });
  };

  /* Botón buscar funcional */
  const HandleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchBook.trim() !== searchTerms.trim()) {
      setSearchTerms(searchBook);
    }
  };

  return (
    <Grid
      templateColumns="repeat(10,1fr)"
      templateRows="repeat(2,auto)"
      columnGap={"20px"}
      rowGap={"20px"}
    >
      <GridItem colStart={3} colEnd={9} rowSpan={1}>
        <form onSubmit={HandleSend} style={styles.formBuscar}>
          <Input
            boxShadow={"lg"}
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            type="text"
          />
          <Button
            type="submit"
            w={"100px"}
            bg={"yellow.200"}
            _hover={{ bg: "yellow.100" }}
            boxShadow={"lg"}
          >
            Buscar
          </Button>
        </form>
      </GridItem>
      <GridItem rowSpan={2} colSpan={10}>
        {!data || searchBook === "" ? (
          <Center flexDirection={"column"}>
            <GiArchiveResearch size={"200px"} />
            <Text mt={"-30px"} fontSize={"5xl"}>
              Buscamos libros
            </Text>
          </Center>
        ) : (
          <SimpleGrid minChildWidth="150px" gap={10} width="100%">
            {data.map((book: Book) => (
              <BookCard
                handleNavigate={handleNavigate}
                key={book.id}
                book={book}
              ></BookCard>
            ))}
          </SimpleGrid>
        )}
      </GridItem>
    </Grid>
  );
}

export default SearchBook;

const styles = {
  formBuscar: {
    display: "flex",
    gap: "20px",
  },
};
