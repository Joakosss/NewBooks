import { useEffect, useState } from "react";
import { useFrontBook } from "../hooks/useFrontBook";
import { Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Book from "../types/Book";

function SearchBook() {
  const [searchBook, setSearchBook] = useState("");
  const [searchTerms, setSearchTerms] = useState("");
  const { data, isLoading, error } = useFrontBook(searchTerms);

  const navigate = useNavigate();
  const handleNavigate = (book: Book) => {
    navigate(`/addBook`, { state: { book } });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerms(searchBook);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchBook]);

  return (
    <>
      <Input
        value={searchBook}
        onChange={(e) => setSearchBook(e.target.value)}
        type="text"
      />

      {data && (
        <ul>
          {data.map((book, index) => (
            <li key={index} onClick={() => handleNavigate(book)}>
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchBook;
