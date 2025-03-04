import { useLocation, useNavigate } from "react-router-dom";
import { MyReading } from "../types/MyReading";
import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Select,
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
  //accedo a los datos de myreading
  const location = useLocation();
  const MyReading: MyReading = location.state;

  //useref imputs
  const pagesRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLSelectElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const [localCalification, setLocalCalification] = useState(
    MyReading.calification
  );

  //switch de modificación
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
    if (!MyReading) {
      navigate("/myBooks");
    }
  }, []);

  //funcion de enviar
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myUpdateObject = {
      currentPage: pagesRef.current?.value,
      state: stateRef.current?.value,
      bookType: typeRef.current?.value,
      calification: localCalification,
    };
    mutatePatch(myUpdateObject);
    navigate("/myBooks");
  };

  //Alert confirmar delete
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  //function delete myreading
  const handleDelete = () => {
    mutateDelete();
    navigate("/myBooks");
  };

  return (
    <>
      <Grid
        templateColumns="repeat(10,1fr)"
        columnGap={"10px"}
        rowGap={"1rem"}
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
          <form onSubmit={handleSend}>
            <Grid
              templateColumns="repeat(6,1fr)"
              columnGap={"10px"}
              rowGap={"1rem"}
            >
              <Flex
                bg={colors.brand.primary_active}
                borderRadius={"2xl"}
                justifyContent={"center"}
                color={colors.brand.primary_hover}
              >
                {MyReading.book?.category}
              </Flex>
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
                    modificationState={modificationState}
                    localCalification={localCalification}
                    setLocalCalification={setLocalCalification}
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
                  <Select
                    display={modificationState ? "block" : "none"}
                    defaultValue={MyReading.bookType}
                    ref={typeRef}
                  >
                    <option value="fisico">Fisico</option>
                    <option value="digital">Digital</option>
                    <option value="audio">Audio</option>
                  </Select>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 3, sm: 3, md: 2 }}>
                <Flex flexDir={"column"}>
                  <Text fontSize={"lg"} fontWeight={"light"}>
                    Tipo
                  </Text>
                  <Text
                    display={!modificationState ? "block" : "none"}
                    fontSize={"lg"}
                    fontWeight={"normal"}
                  >
                    {MyReading.state}
                  </Text>
                  <Select
                    display={modificationState ? "block" : "none"}
                    defaultValue={MyReading.state}
                    ref={stateRef}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="leyendo">Leyendo</option>
                    <option value="finalizado">Finalizado</option>
                    <option value="abandonado">Abandonado</option>
                  </Select>
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
                    defaultValue={MyReading.currentPage}
                    ref={pagesRef}
                    type="number"
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
                  type="submit"
                >
                  Confirmar
                </MyButton>
              </GridItem>
            </Grid>
          </form>
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
        display={pendingPatch ? "block" : "none"}
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
