import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { forwardRef, useRef, HTMLInputTypeAttribute } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { colors } from "../colors";

function Login() {
  const correoRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const { mutate, error, isPending } = useLogin();
  const navigate = useNavigate();
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!correoRef.current?.value || !passRef.current?.value) return;
    mutate(
      { email: correoRef.current?.value, pass: passRef.current?.value },
      {
        onError: () => {
          alert("login erroneo");
          /* handleNavigate("/searchBook"); */
        },
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <Center h={"100vh"}>
      <form onSubmit={handleSend} style={styles.form}>
        {error && <label>Correo o contraseña invalidos</label>}
        <MyInput
          Label="Usuario"
          placeholder="Ingrese usuario"
          type="text"
          ref={correoRef}
          isPending={isPending}
        />
        <MyInput
          Label="Contraseña"
          placeholder="Ingrese nombre de usuario"
          type="password"
          ref={passRef}
          isPending={isPending}
        />
        <Flex gap={"1rem"} mt={"1rem"} justifyContent={"center"}>
          <Button
            isDisabled={isPending ? true : false}
            variant="link"
            color={colors.text.primary}
          >
            <Link to={"/registro"}>Registrarse</Link>
          </Button>
          <Button
            isDisabled={isPending ? true : false}
            colorScheme="yellow"
            type="submit"
          >
            Conectarse
          </Button>
        </Flex>
      </form>
      <Spinner
        display={isPending ? "block" : "none"}
        position={"absolute"}
        size="xl"
      />
    </Center>
  );
}

export default Login;

type MyInputProps = {
  Label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  isPending: boolean;
};

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  ({ Label, placeholder, type, isPending }, ref) => {
    return (
      <FormControl w={"25rem"}>
        <FormLabel htmlFor={Label}>{Label}</FormLabel>
        <Input
          isDisabled={isPending ? true : false}
          id={Label}
          type={type}
          placeholder={placeholder}
          ref={ref}
          bg={"white"}
        />
      </FormControl>
    );
  }
);

const styles = {
  form: {
    background: colors.brand.primary,
    padding: "3rem",
    borderRadius: "1rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
};
