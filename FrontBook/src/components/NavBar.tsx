import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Box bg={"blackAlpha.400"}>
        <Breadcrumb separator={" "}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              LogoBooks
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/login">
              Login
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/registro">
              Registro
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
    </>
  );
}

export default Navbar;
