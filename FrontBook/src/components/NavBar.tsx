import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuBookCopy } from "react-icons/lu";
import useAuthToken from "../store/storeAuthZustand";
function Navbar() {
  const { isAuthenticate } = useAuthToken();
  const { logout } = useAuthToken();

  return (
    <Grid templateColumns="repeat(10,1fr)" columnGap={"20px"}>
      <GridItem colSpan={8} style={styles.gridItem} boxShadow={"lg"}>
        {isAuthenticate() ? (
          <Flex justifyContent={"end"} alignItems={"center"}>
            <Link style={styles.link} to={"/myBooks"}>
              Mis Libros
            </Link>
            <Link style={styles.link} onClick={logout} to={"/"}>
              Logout
            </Link>

            <SearchInput />
          </Flex>
        ) : (
          <>
            <Link style={styles.link} to={"/login"}>
              Login
            </Link>
            <Link style={styles.link} to={"/registro"}>
              Registro
            </Link>
          </>
        )}
      </GridItem>
      <GridItem
        colSpan={2}
        style={styles.gridItem}
        boxShadow={"lg"}
        justifyContent={"center"}
      >
        <LuBookCopy size={23} />
        <Link style={styles.link} to={"/"}>
          LogoBooks
        </Link>
      </GridItem>
    </Grid>
  );
}

export default Navbar;

import { CSSProperties } from "react";
import SearchInput from "./SearchInput";
import { colors } from "../colors";
const styles: { [key: string]: CSSProperties } = {
  link: {
    width: "100px",
    textAlign: "center",
    fontWeight: "bold",
  },
  gridItem: {
    display: "flex",
    background: colors.brand.primary,
    borderRadius: "10px",
    alignItems: "center",
    height: "60px",
  },
};
