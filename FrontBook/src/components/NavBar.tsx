import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuBookCopy } from "react-icons/lu";

function Navbar() {
  return (
    <>
      <Flex p={"2"} bg={"gold"}>
        <Flex mr={"1rem"}>
          <LuBookCopy size={23} />
          <Link to={"/"}>LogoBooks</Link>
        </Flex>
        <Flex gap={"1rem"}>
          <Link to={"/login"}>Login</Link>
          <Link to={"/registro"}>Registro</Link>
          <Link to={"/searchBook"}>Buscar</Link>
        </Flex>
      </Flex>
    </>
  );
}

export default Navbar;
