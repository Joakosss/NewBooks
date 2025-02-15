import { MyReading } from "../types/MyReading";
import { getRequest } from "../api/apis";
import { useQuery } from "@tanstack/react-query";
import BookCard from "../components/BookCard";
import { SimpleGrid } from "@chakra-ui/react";

export default function GetMyBooks() {
  /* Aqui hay que cambiar el usuario y ponerlo como parametro abajo */
  const {
    data: myReadings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["misLecturas"],
    queryFn: () => getRequest("http://127.0.0.1:8000/my-readings"),
  });

  const handleClick = (myReading: MyReading) => {
    alert(myReading.book?.title);
  };

  return (
    <SimpleGrid minChildWidth="150px" gap={10}>
      {myReadings?.map((book: MyReading) => (
        <BookCard
          key={book.id}
          book={book.book}
          handleNavigate={() => handleClick(book)}
        />
      ))}
    </SimpleGrid>
  );
}
