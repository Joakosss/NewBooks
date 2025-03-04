import { MyReading } from "../types/MyReading";
import { getRequestToken } from "../api/apis";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import { Text, Flex, Select, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function GetMyBooks() {
  const navigate = useNavigate();

  /* Aqui hay que cambiar el usuario y ponerlo como parametro abajo */
  const {
    data: myReadings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["misLecturas"],
    queryFn: () => getRequestToken("http://127.0.0.1:8000/my-readings"),
  });

  const handleClick = (myReading: MyReading) => {
    navigate("/updateMyBook", { state: myReading });
  };

  return (
    <>
      <Text fontSize={"2xl"} fontFamily={"monospace"}>
        Mis Libros
      </Text>
      <Flex gap={"1rem"}>
        <Select w={"10rem"} defaultValue={0}>
          <option value={0} disabled>
            Filtrar Tipo
          </option>
          <option value="Pendiente">Fisico</option>
          <option value="Leyendo">Digital</option>
          <option value="Finalizado">Audio</option>
        </Select>
        <Select w={"10rem"} defaultValue={0}>
          <option value={0} disabled>
            Filtrar Estado
          </option>
          <option value="Pendiente">Pendiente</option>
          <option value="Leyendo">Leyendo</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Abandonado">Abandonado</option>
        </Select>
      </Flex>
      <SimpleGrid minChildWidth="150px" gap={10}>
        {myReadings?.map((book: MyReading) => (
          <BookCard
            key={book.id}
            book={book.book}
            handleNavigate={() => handleClick(book)}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
