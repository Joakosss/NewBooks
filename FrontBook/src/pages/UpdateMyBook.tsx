import { useLocation, useNavigate } from "react-router-dom";
import { MyReading } from "../types/MyReading";
import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { patchRequestToken, deleteRequestToken } from "../api/apis";
import { colors } from "../colors";
import MyButton from "../components/MyButton";
import React from "react";
import MyAlertDialog from "../components/AlertDialog";
import MyCalification from "../components/MyCalification";

//falta añadir evaluacion, fecha inicio fecha fin,

function UpdateMyBook() {
  const navigate = useNavigate();

  //useref imputs
  const pagesRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const location = useLocation();
  const MyReading: MyReading = location.state;
  const MyReadingWithoutBook = MyReading;

  //modificando
  const [modificationState, setModificationState] = useState<boolean>(false);

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
    alert("hola");
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

  //eliminar libro

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    mutateDelete();
    navigate("/myBooks");
  };

  return (
    <>
      <Grid
        templateColumns="repeat(10,1fr)"
        columnGap={"10px"}
        bg={"white"}
        borderRadius={"1rem"}
        p={{ base: "0 0 1rem 0", sm: "1rem", md: "3rem" }}
        boxShadow={"lg"}
      >
        <GridItem
          colSpan={{ base: 10, sm: 6, md: 4 }}
          colStart={{ base: 1, sm: 3, md: 1 }}
          bg={colors.background.light}
          h={"100%"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Image
              src={MyReading.book?.imgLink}
              alt=""
              h={"75%"}
              boxShadow={"2xl"}
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 10, md: 6 }} px={"2rem"}>
          <Grid
            templateColumns="repeat(6,1fr)"
            columnGap={"10px"}
            rowGap={"2rem"}
          >
            <GridItem colSpan={6}>
              <Text fontSize={"3xl"} fontWeight={"semibold"}>
                {MyReading.book?.title}
              </Text>
              <Text fontSize={"2xl"} fontWeight={"light"}>
                {MyReading.book?.author}
              </Text>
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 3 }}>
              <Text fontSize={"lg"} fontWeight={"light"}>
                Evaluación
              </Text>
              <Flex gap="0.5rem">
                <MyCalification
                  idMyReading={MyReading.id!}
                  calification={MyReading.calification}
                />
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 3, md: 3 }}>
              <Flex flexDir={"column"}>
                <Text fontSize={"lg"} fontWeight={"light"}>
                  Tipo
                </Text>
                <Text
                  display={!modificationState ? "block" : "none"}
                  fontSize={"lg"}
                  fontWeight={"normal"}
                >
                  {MyReading.bookType}
                </Text>
                <Input
                  display={modificationState ? "block" : "none"}
                  value={MyReading.bookType}
                ></Input>
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 3, md: 2 }}>
              <Flex flexDir={"column"}>
                <Text fontSize={"lg"} fontWeight={"light"}>
                  Género
                </Text>
                <Text fontSize={"lg"} fontWeight={"normal"}>
                  {MyReading.book?.category}
                </Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 3, md: 2 }}>
              <Flex flexDir={"column"}>
                <Text fontSize={"lg"} fontWeight={"light"}>
                  páginas
                </Text>
                <Text
                  display={!modificationState ? "block" : "none"}
                  fontSize={"lg"}
                  fontWeight={"normal"}
                >
                  {MyReading.currentPage}
                </Text>
                <Input
                  display={modificationState ? "block" : "none"}
                  value={MyReading.currentPage}
                ></Input>
              </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 2, md: 2 }}>
              <Flex flexDir={"column"}>
                <Text fontSize={"lg"} fontWeight={"light"}>
                  Publicación
                </Text>
                <Text fontSize={"lg"} fontWeight={"normal"}>
                  S/F
                </Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <MyButton color="tertiary" onClick={() => navigate(-1)}>
                Atrás
              </MyButton>
            </GridItem>
            <GridItem colSpan={2}>
              <MyButton color="secondary" onClick={onOpen}>
                Eliminar
              </MyButton>
            </GridItem>
            <GridItem colSpan={2}>
              <MyButton
                display={!modificationState ? "block" : "none"}
                color="primary"
                type="button"
                onClick={() => setModificationState(!modificationState)}
              >
                Modificar
              </MyButton>
              <MyButton
                display={modificationState ? "block" : "none"}
                color="primary"
                type="button"
                onClick={() => handleSend}
              >
                Confirmar
              </MyButton>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Grid
        templateColumns="repeat(10,1fr)"
        columnGap={"10px"}
        bg={"white"}
        borderRadius={"1rem"}
        p={"3rem"}
        boxShadow={"lg"}
      >
        <GridItem>
          <Text>Comentarios</Text>
        </GridItem>
      </Grid>
      <Spinner
        display={"none"}
        /* display={isPending ? "block" : "none"} */
        position={"absolute"}
        size="xl"
      />
      <MyAlertDialog
        handleActive={handleDelete}
        title="¿Estas seguro?"
        type="negative"
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      >
        Estas eliminando este libro "{MyReading.book?.title}"
      </MyAlertDialog>
    </>
  );
}

export default UpdateMyBook;
