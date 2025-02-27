import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import { Grid, GridItem } from "@chakra-ui/react";

function Layout() {
  return (
    <Grid
      templateColumns="repeat(12,1fr)"
      mt={{ base: 0, sm: "20px" }}
      gap={"1.3rem"}
    >
      <GridItem colStart={{ base: 1, sm: 2 }} colEnd={{ base: 13, sm: 12 }}>
        <Navbar />
      </GridItem>
      <GridItem
        colStart={{ base: 1, sm: 2 }}
        colEnd={{ base: 13, sm: 12 }}
        display="flex"
        flexDirection="column"
        gap={"1rem"}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default Layout;
