import { useMyBooks } from "../hooks/useMyBooks";
import { MyReading } from "../types/MyReading";

export default function GetMyBooks() {
  /* Aqui hay que cambiar el usuario y ponerlo como parametro abajo */
  const { data: misLibros, error, isLoading } = useMyBooks();

  if (!Array.isArray(misLibros)) {
    return <div>Error</div>;
  }

  return (
    <>
      {misLibros?.map((libro: MyReading) => (
        <div key={libro.id}>
          <img src={libro.book.imgLink} alt="" />
          <div>{libro.book.title}</div>
        </div>
      ))}
    </>
  );
}
