import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { forwardRef, useRef, HTMLInputTypeAttribute } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const correoRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending, error } = useLogin();
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
          alert("login exitoso");

          /* handleNavigate("/"); */
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSend}>
        {error && <label>Correo o contraseña invalidos</label>}
        <MyInput
          Label="Correo"
          placeholder="Ingrese correo electronico"
          type="text"
          ref={correoRef}
        />
        <MyInput
          Label="Contraseña"
          placeholder="Ingrese contraseña"
          type="password"
          ref={passRef}
        />
        <div>
          <Button>
            <Link to={"/registro"}>Registrarse</Link>
          </Button>
          <Button type="submit">Conectarse</Button>
        </div>
      </form>
    </>
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
      <FormControl>
        <FormLabel htmlFor={Label}>{Label}</FormLabel>
        <Input id={Label} type={type} placeholder={placeholder} ref={ref} />
      </FormControl>
    );
  }
);
