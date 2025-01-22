import { ReactNode, useRef, useState, useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuBookCopy } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <Box bg={"blackAlpha.400"}>
        <Breadcrumb separator={" "}>
          <Flex alignItems={"center"}>
            <LuBookCopy size={23} />
            <LinkNav to="/">LogoBooks</LinkNav>
          </Flex>
          <Flex>
            <LinkNav to="/login">Login</LinkNav>
            <LinkNav to="/registro">Registro</LinkNav>
          </Flex>
          <Box display={"none"}>
            <RxHamburgerMenu size={23} />
          </Box>
          <SearchBook />
        </Breadcrumb>
      </Box>
    </>
  );
}

export default Navbar;

type LinkNavProp = {
  children: ReactNode;
  to: string;
};

function LinkNav({ children, to }: LinkNavProp) {
  return (
    <BreadcrumbItem mx={"1"}>
      <BreadcrumbLink as={Link} to={to}>
        {children}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

function SearchBook() {
  const bookInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <FormControl display={"flex"}>
      <InputGroup w={"20rem"}>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          ref={bookInput}
          bg={"white"}
          type="text"
          placeholder="Buscar libros"
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputGroup>
      <Button>Buscar</Button>
    </FormControl>
  );
}
