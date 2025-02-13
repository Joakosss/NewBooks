import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { forwardRef, useRef, HTMLInputTypeAttribute } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const correoRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const { mutate, error } = useLogin();
  /* useAuthStore.getState.setAuth(response.data) */

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
        onSuccess: (data) => {
          /* useAuthStore.setAuth(data); */
          alert("login exitoso");

          /* handleNavigate("/"); */
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
        />
        <MyInput
          Label="Contraseña"
          placeholder="Ingrese nombre de usuario"
          type="password"
          ref={passRef}
        />
        <Flex gap={"1rem"} mt={"1rem"} justifyContent={"center"}>
          <Button>
            <Link to={"/registro"}>Registrarse</Link>
          </Button>
          <Button type="submit">Conectarse</Button>
        </Flex>
      </form>
    </Center>
  );
}

export default Login;

type MyInputProps = {
  Label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
};

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  ({ Label, placeholder, type }, ref) => {
    return (
      <FormControl w={"25rem"}>
        <FormLabel htmlFor={Label}>{Label}</FormLabel>
        <Input
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
    background: "#FAF089",
    padding: "3rem",
    borderRadius: "1rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
};
