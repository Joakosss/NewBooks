import { useLocation } from "react-router-dom";
import Book from "../types/Book";

function AddBook() {
  const location = useLocation();
  const book: Book = location.state?.book;

  return (
    <>
      <img src={book.imgLink} alt="" />
      <div>{book.pages}</div>
      <div>{book.title}</div>
      <div>{book.description}</div>
    </>
  );
}

export default AddBook;
