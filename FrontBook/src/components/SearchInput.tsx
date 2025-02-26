import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getRequestGoogleApi } from "../api/apis";
import Book from "../types/Book";
type Props = {
  width?: string;
};

function SearchInput({ width = "10rem" }: Props) {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<string>("");
  //mutate que busca los libros deseados en la api de google
  const { mutate, data, reset } = useMutation({
    mutationFn: ({
      searchData,
      maxResults,
    }: {
      searchData: string;
      maxResults: number;
    }) =>
      getRequestGoogleApi(
        "https://www.googleapis.com/books/v1/volumes",
        searchData,
        maxResults
      ),
  });

  useEffect(() => {
    //Conectar con api mutation
    const waitingTime = setTimeout(() => {
      if (searchData !== "") {
        mutate({ searchData, maxResults: 5 });
      }
    }, 500);
    return () => {
      clearTimeout(waitingTime);
    };
  }, [searchData]);

  const handleNavigate = (book: Book) => {
    navigate(`/addBook`, { state: { book } });
  };

  return (
    <Flex flexDirection={"column"} position={"relative"}>
      <InputGroup>
        <Input
          w={width}
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          backgroundColor="#FFF5F5"
          onBlur={() => {
            setTimeout(() => {
              setSearchData("");
              reset();
            }, 200);
          }}
        ></Input>
        <InputRightElement>
          <IconButton
            size={"sm"}
            isRound={true}
            variant="solid"
            colorScheme="red"
            aria-label="Buscar"
            fontSize="20px"
            icon={<IoSearch />}
            onClick={() => {
              //le pasamos los datos de los libros buscados y del imput de busqueda para mandarlo a la pagina de buscar
              navigate("/searchBook", {
                state: { busqueda: searchData },
              });
            }}
          />
        </InputRightElement>
      </InputGroup>
      <Box
        position="absolute"
        top="100%"
        left="0"
        zIndex="1"
        w={width}
        display={searchData ? "block" : "none"}
        border={"1px solid #CBD5E0"}
        borderRadius={"0.5rem"}
        backgroundColor="white"
      >
        <List w={width} border={"1px solid #CBD5E0"} borderRadius={"0.5rem"}>
          {data?.map((libro) => (
            <ListItem
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              m={"5px"}
              _hover={{ background: "#FFF5F5" }}
              key={libro.id}
              p={"0.2rem"}
              borderRadius={"0.2rem"}
              cursor={"pointer"}
              onClick={() => handleNavigate(libro)}
            >
              {libro.title}
            </ListItem>
          ))}
        </List>
      </Box>
    </Flex>
  );
}

export default SearchInput;
