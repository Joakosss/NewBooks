import { useMyBooks } from "../hooks/useMyBooks";
import { MyReading } from "../types/MyReading";

export default function GetMyBooks() {
  /* Aqui hay que cambiar el usuario y ponerlo como parametro abajo */
  const { data: misLibros, error, isLoading } = useMyBooks("juako@juako.com");

  console.log(misLibros);

  return (
    <>
      {misLibros?.map((libro: MyReading) => (
        <div>
          <img src={libro.book.imgLink} alt="" />
          <div>{libro.book.title}</div>
        </div>
      ))}
    </>
  );
}
