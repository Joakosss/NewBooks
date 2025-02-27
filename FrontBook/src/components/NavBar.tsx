import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { LuBookCopy } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import useAuthToken from "../store/storeAuthZustand";
import { ReactNode, useRef } from "react";
import { colors } from "../colors";
import SearchInput from "./SearchInput";
function Navbar() {
  const { isAuthenticate } = useAuthToken();
  const { logout } = useAuthToken();
  const navigate = useNavigate();

  const btnRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };
  return (
    <>
      <Grid templateColumns="repeat(10,1fr)" columnGap={"20px"}>
        <NavbarPart colSpan={2} justifyContent="center">
          <LogoBook />
          <Link to="/">LogoBooks</Link>
        </NavbarPart>
        <NavbarPart colSpan={8} justifyContent="end">
          {isAuthenticate() ? (
            <Flex
              justifyContent={"end"}
              alignItems={"center"}
              gap={"1rem"}
              mx={"1rem"}
            >
              <Link to="/myBooks"> Mis Libros</Link>
              <Link to="/" handleClick={logout}>
                Logout
              </Link>
              <SearchInput />
            </Flex>
          ) : (
            <Flex
              justifyContent={"end"}
              alignItems={"center"}
              gap={"1rem"}
              mx={"1rem"}
            >
              <Link to={"/login"}>Login</Link>
              <Link to={"/registro"}>Registro</Link>
            </Flex>
          )}
        </NavbarPart>
        <NavbarPart
          colSpan={10}
          justifyContent="space-between"
          display="mobile"
        >
          <Flex>
            <LogoBook />
            <Link to="/">LogoBooks</Link>
          </Flex>
          <Box
            boxSize={{ base: "30px", md: "23px" }}
            cursor="pointer"
            role="button"
            as={RxHamburgerMenu}
            aria-label="ir al inicio"
            onClick={onOpen}
            ref={btnRef}
          />
        </NavbarPart>
      </Grid>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={colors.background.light}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex>
              <LogoBook navigates={false} />
              LogoBook
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            {isAuthenticate() ? (
              <Flex flexDir={"column"} alignItems={"center"} gap={"1rem"}>
                <SearchInput />
                <Link to="/myBooks" handleClick={onClose}>
                  {" "}
                  Mis Libros
                </Link>
                <Link to="" handleClick={handleLogout}>
                  Logout
                </Link>
              </Flex>
            ) : (
              <Flex flexDir={"column"} alignItems={"center"} gap={"1rem"}>
                <Link to={"/login"}>Login</Link>
                <Link to={"/registro"}>Registro</Link>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;

type LinkProps = {
  children: ReactNode;
  to: string;
  handleClick?: () => void;
};

function Link({ children, to, handleClick }: LinkProps) {
  return (
    <ChakraLink
      fontWeight={"bold"}
      onClick={handleClick}
      as={ReactRouterLink}
      to={to}
    >
      {children}
    </ChakraLink>
  );
}

type NavbarPartType = {
  colSpan: number;
  children: ReactNode;
  display?: "desktop" | "always" | "mobile";
  justifyContent: "center" | "end" | "space-between";
};

function NavbarPart({
  colSpan,
  children,
  justifyContent,
  display = "desktop",
}: NavbarPartType) {
  const displayBreakpoint = {
    desktop: { base: "none", md: "flex" },
    always: "flex",
    mobile: { base: "flex", md: "none" },
  };

  return (
    <GridItem
      colSpan={colSpan}
      display={displayBreakpoint[display]}
      background={colors.brand.primary}
      borderRadius={{ base: "0 0 10px 10px", sm: "10px" }}
      alignItems={"center"}
      height={"60px"}
      boxShadow={"lg"}
      px={"3%"}
      justifyContent={justifyContent}
    >
      {children}
    </GridItem>
  );
}

type LogoBookType = {
  navigates?: boolean;
};

function LogoBook({ navigates = true }: LogoBookType) {
  const navigate = useNavigate();
  return (
    <Box
      boxSize={{ base: "35px", md: "23px" }}
      as={LuBookCopy}
      onClick={navigates ? () => navigate("/") : () => {}}
      cursor={navigates ? "pointer" : "auto"}
      role="button"
      aria-label="ir al inicio"
    />
  );
}
