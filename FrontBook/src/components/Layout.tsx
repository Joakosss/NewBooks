import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
type Props = {};

function Layout({}: Props) {
  return (
    <Grid templateColumns="repeat(12,1fr)" mt={"20px"} gap={"35px"}>
      <GridItem colStart={2} colEnd={12}>
        <Navbar />
      </GridItem>
      <GridItem colStart={2} colEnd={12} display="flex" flexDirection="column">
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default Layout;
