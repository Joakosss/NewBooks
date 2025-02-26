import { useLocation, useNavigate } from "react-router-dom";
import Book from "../types/Book";
import { Button, Flex, Input, Select, Spinner, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { MyReading } from "../types/MyReading";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/apis";

function AddBook() {
  const location = useLocation();
  const book: Book = location.state?.book;

  const myPagesRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const bookTypeRef = useRef<HTMLSelectElement>(null);

  /* navegaciones */
  const navigate = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: { myReading: MyReading; book: Book }) =>
      postRequest("http://127.0.0.1:8000/my-readings/", data),
  });

  /* const { mutate } = useSaveMyBook(); */
  const handleSend = (e) => {
    e.preventDefault();
    const myReading: MyReading = {
      state:
        (stateRef.current?.value as
          | "pendiente"
          | "leyendo"
          | "finalizado"
          | "abandonado") || "pendiente",
      currentPage: parseInt(myPagesRef.current?.value || "1"),
      calification: null,
      comments: null,
      startReading: null,
      finishReading: null,
      bookType:
        (bookTypeRef.current?.value as "fisico" | "digital" | "audio") ||
        "fisico",
    };

    mutate(
      { myReading, book },
      {
        onError: () => {
          alert("Libro ya registrado o error en el proceso");
          handleNavigate("/searchBook");
        },
        onSuccess: () => {
          alert("libro registrado con éxito");
          handleNavigate("/");
        },
      }
    );
  };
  return (
    <form onSubmit={handleSend} method="Post">
      <img src={book.imgLink} alt="" />
      <div>
        <label htmlFor="pages">Paginas</label>
        <Input
          id="pages"
          type="number"
          defaultValue={book.pages}
          ref={myPagesRef}
        />
      </div>
      <div>
        <h2>Titulo</h2>
        <Text>{book.title}</Text>
      </div>
      <div>
        <h2>Descripción</h2>
        <Text>{book.description}</Text>
      </div>
      <div>
        <label htmlFor="state">Estado</label>
        <Select
          name="state"
          id="state"
          ref={stateRef}
          defaultValue={"Pendiente"}
        >
          <option value="pendiente">Pendiente</option>
          <option value="leyendo">Leyendo</option>
          <option value="finalizado">Finalizado</option>
          <option value="abandonado">Abandonado</option>
        </Select>
      </div>
      <div>
        <label htmlFor="tipo">Tipo</label>
        <Select name="tipo" id="tipo" ref={bookTypeRef} defaultValue={"fisico"}>
          <option value="fisico">Fisico</option>
          <option value="digital">Digital</option>
          <option value="audio">Audio</option>
        </Select>
      </div>
      <Flex gap={"3"}>
        <Button type="button" onClick={() => navigate(-1)}>
          Atras
        </Button>
        <Button type="submit">Guardar</Button>
      </Flex>
      <Spinner
        display={isPending ? "block" : "none"}
        position={"absolute"}
        size="xl"
      />
    </form>
  );
}

export default AddBook;
