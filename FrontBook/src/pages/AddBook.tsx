import { useLocation, useNavigate } from "react-router-dom";
import Book from "../types/Book";
import {
  Image,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MyReading } from "../types/MyReading";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/apis";
import { colors } from "../colors";
import MyButton from "../components/MyButton";

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
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <Grid
        templateColumns="repeat(10,1fr)"
        columnGap={"10px"}
        rowGap={"1rem"}
        bg={"whiteAlpha.100"}
        borderRadius={"1rem"}
        p={{ base: "0 0 1rem 0", sm: "1rem", md: "3rem" }}
        boxShadow={"lg"}
      >
        <GridItem
          colSpan={{ base: 10, sm: 6, md: 4 }}
          colStart={{ base: 1, sm: 3, md: 1 }}
          bg={colors.background.dark}
          h={"100%"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Image src={book.imgLink} alt="" h={"75%"} boxShadow={"2xl"} />
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 10, md: 6 }} px={"2rem"}>
          <form onSubmit={handleSend}>
            <Grid
              templateColumns="repeat(6,1fr)"
              columnGap={"10px"}
              rowGap={"1rem"}
            >
              <GridItem colSpan={6}>
                <Flex
                  bg={colors.brand.primary_active}
                  borderRadius={"2xl"}
                  justifyContent={"center"}
                  color={colors.brand.primary_hover}
                  fontSize={"md"}
                  px={"1rem"}
                  w={"fit-content"}
                >
                  {book.category}
                </Flex>
              </GridItem>
              <GridItem colSpan={6}>
                <Text fontSize={"3xl"} fontWeight={"semibold"}>
                  {book.title}
                </Text>
                <Text fontSize={"2xl"} fontWeight={"light"}>
                  {book.author}
                </Text>
              </GridItem>
              <GridItem colSpan={{ base: 3, sm: 3, md: 3 }}>
                <Flex flexDir={"column"}>
                  <Text fontSize={"lg"} fontWeight={"light"}>
                    Tipo
                  </Text>
                  <Select
                    defaultValue={"fisico"}
                    ref={bookTypeRef}
                    bg={"white"}
                  >
                    <option value="fisico">Fisico</option>
                    <option value="digital">Digital</option>
                    <option value="audio">Audio</option>
                  </Select>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 3, sm: 3, md: 3 }}>
                <Flex flexDir={"column"}>
                  <Text fontSize={"lg"} fontWeight={"light"}>
                    Estado
                  </Text>
                  <Select
                    defaultValue={"pendiente"}
                    ref={stateRef}
                    bg={"white"}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="leyendo">Leyendo</option>
                    <option value="finalizado">Finalizado</option>
                    <option value="abandonado">Abandonado</option>
                  </Select>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 3, sm: 3, md: 3 }}>
                <Flex flexDir={"column"}>
                  <Text fontSize={"lg"} fontWeight={"light"}>
                    Páginas
                  </Text>
                  <Input
                    bg={"white"}
                    defaultValue={book.pages}
                    ref={myPagesRef}
                    type="number"
                  ></Input>
                </Flex>
              </GridItem>
              <GridItem colSpan={2} colStart={1}>
                <MyButton color="tertiary" onClick={() => navigate(-1)}>
                  Atrás
                </MyButton>
              </GridItem>
              <GridItem colSpan={2}>
                <MyButton color="primary" type="submit">
                  Guardar
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
      {/* <Spinner
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
      </MyAlertDialog> */}
    </>
  );
}

export default AddBook;
