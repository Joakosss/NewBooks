import { MyReading } from "../types/MyReading";
import { getRequestToken } from "../api/apis";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import { Text, Flex, Select, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GetMyBooks() {
  const {
    data: myReadings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["misLecturas"],
    queryFn: () => getRequestToken("http://127.0.0.1:8000/my-readings"),
  });
  const navigate = useNavigate();
  const [filtrarTipo, setFiltrarTipo] = useState("");
  const [filtrarEstado, setFiltrarEstado] = useState("");
  const [listMyReadings, setListMyReadings] = useState<MyReading[]>([]);
  const handleClick = (myReading: MyReading) => {
    navigate("/updateMyBook", { state: myReading });
  };

  useEffect(() => {
    if (myReadings) {
      console.log(filtrarTipo);
      const librosfiltrados = myReadings.filter((book: MyReading) => {
        const filtrarPorTipo = filtrarTipo
          ? book.bookType === filtrarTipo
          : true;
        const filtrarPorEstado = filtrarEstado
          ? book.state === filtrarEstado
          : true;
        return filtrarPorTipo && filtrarPorEstado;
      });
      setListMyReadings(librosfiltrados);
    }
  }, [myReadings, filtrarEstado, filtrarTipo]);

  return (
    <>
      <Text fontSize={"2xl"} fontFamily={"monospace"}>
        Mis Libros
      </Text>
      <Flex gap={"1rem"}>
        <Select
          w={"10rem"}
          value={filtrarTipo}
          onChange={(e) => setFiltrarTipo(e.target.value)}
        >
          <option value={""}>Filtrar Tipo</option>
          <option value="fisico">Fisico</option>
          <option value="digital">Digital</option>
          <option value="audio">Audio</option>
        </Select>
        <Select
          w={"10rem"}
          value={filtrarEstado}
          onChange={(e) => setFiltrarEstado(e.target.value)}
        >
          <option value={""}>Filtrar Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="leyendo">Leyendo</option>
          <option value="finalizado">Finalizado</option>
          <option value="abandonado">Abandonado</option>
        </Select>
      </Flex>
      <SimpleGrid
        minChildWidth={"150px"}
        gap={10}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
      >
        {listMyReadings?.map((book: MyReading) => (
          <BookCard
            key={book.id}
            book={book.book!}
            handleNavigate={() => handleClick(book)}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
