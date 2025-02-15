import { Card, Heading, Image, Skeleton } from "@chakra-ui/react";
import Book from "../types/Book";

type BookCardProps = {
  book: Book;
  handleNavigate: (book: Book) => void;
};

function BookCard({ book, handleNavigate }: BookCardProps) {
  return (
    <Card
      maxW={"200px"}
      _hover={{ transform: "scale(1.03)", transition: "transform 0.3s" }}
      w={"100"}
      onClick={() => handleNavigate(book)}
      cursor={"pointer"}
      boxShadow={"lg"}
    >
      {book.imgLink ? (
        <Image
          w={"100%"}
          src={book.imgLink}
          alt={`Portada de ${book.title}`}
          borderTopRadius="lg"
          aspectRatio="2/3" // Relación de aspecto (ancho/alto) de 2:3
          objectFit="cover"
        />
      ) : (
        <Skeleton height="100%" borderTopRadius="lg" />
      )}
      <Heading
        padding={"1px"}
        size="s"
        m={2}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {book.title}
      </Heading>
    </Card>
  );
}

export default BookCard;
