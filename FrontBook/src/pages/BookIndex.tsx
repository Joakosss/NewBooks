import { useBooks } from "../hooks/useBooks";

function BookIndex() {
  const { data, error, isLoading } = useBooks();
  console.log(data);
  return (
    <>
      <h1>BookIndex</h1>
      {data?.map((book) => (
        <article key={book.id}>
          <img src={book.imgLink} alt="" />
        </article>
      ))}
    </>
  );
}

export default BookIndex;
