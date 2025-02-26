import { useLocation, useNavigate } from "react-router-dom";
import { MyReading } from "../types/MyReading";
import { useEffect, useRef } from "react";
import { Button, Flex, Input, Select, Spinner, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRequestToken, deleteRequestToken } from "../api/apis";

function UpdateMyBook() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //useref imputs
  const pagesRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const location = useLocation();
  const MyReading: MyReading = location.state;
  const { book, ...MyReadingWithoutBook } = MyReading;

  //mutate modificacion de libro
  const {
    mutate: mutatePatch,
    isError: errorPatch,
    isPending: pendingPatch,
  } = useMutation({
    mutationFn: (myReadingProp: object) =>
      patchRequestToken(
        "http://127.0.0.1:8000/my-readings/",
        myReadingProp,
        MyReading.id!
      ),
  });

  //mutate Delete libro
  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteRequestToken(String(MyReading.id)),
  });

  //redirecciona en caso de no tener un libro vinculado a la pagina de mis libros
  useEffect(() => {
    console.log(MyReading);
    if (!MyReading) {
      navigate("/myBooks");
    }
  }, []);

  //funcion de enviar
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    MyReadingWithoutBook["currentPage"] = pagesRef.current
      ? Number(pagesRef.current.value)
      : 0;
    MyReadingWithoutBook["state"] = stateRef.current
      ? (stateRef.current.value as
          | "pendiente"
          | "leyendo"
          | "finalizado"
          | "abandonado")
      : "pendiente";
    MyReadingWithoutBook["bookType"] = typeRef.current
      ? (typeRef.current.value as "fisico" | "digital" | "audio")
      : "fisico";
    mutatePatch(MyReadingWithoutBook);
    navigate("/myBooks");
  };

  const handleDelete = () => {
    mutateDelete();
    navigate("/myBooks");
  };

  return (
    <form onSubmit={handleSend}>
      <img src={MyReading.book?.imgLink} alt="" />
      <div>
        <label htmlFor="pages">Paginas</label>
        <Input
          id="pages"
          type="number"
          defaultValue={MyReading.book?.pages}
          ref={pagesRef}
        />
      </div>
      <div>
        <h2>Titulo</h2>
        <Text>{MyReading.book?.title}</Text>
      </div>
      <div>
        <h2>Descripción</h2>
        <Text>{MyReading.book?.description}</Text>
      </div>
      <div>
        <label htmlFor="state">Estado</label>
        <Select
          name="state"
          id="state"
          ref={stateRef}
          defaultValue={MyReading.state}
        >
          <option value="pendiente">Pendiente</option>
          <option value="leyendo">Leyendo</option>
          <option value="finalizado">Finalizado</option>
          <option value="abandonado">Abandonado</option>
        </Select>
      </div>
      <div>
        <label htmlFor="tipo">Tipo</label>
        <Select
          name="tipo"
          id="tipo"
          ref={typeRef}
          defaultValue={MyReading.bookType}
        >
          <option value="fisico">Fisico</option>
          <option value="digital">Digital</option>
          <option value="audio">Audio</option>
        </Select>
      </div>
      <Flex gap={"3"}>
        <Button type="button" onClick={() => navigate(-1)}>
          Atras
        </Button>
        <Button type="button" onClick={() => handleDelete()}>
          Eliminar
        </Button>
        <Button type="submit">Modificar</Button>
      </Flex>
      <Spinner
        /* display={isPending ? "block" : "none"} */
        position={"absolute"}
        size="xl"
      />
    </form>
  );
}

export default UpdateMyBook;
