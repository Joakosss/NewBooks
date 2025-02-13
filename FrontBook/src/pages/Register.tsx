import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchRegister } from "../api/FnFetchRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
type FormType = {
  username: string;
  password: string;
  rePassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();
  const password = watch("password");
  const navigate = useNavigate();
  const { mutate, error } = useMutation({
    mutationFn: (data: FormType) => fetchRegister(data.username, data.password),
    onSuccess: () => {
      alert("registro con éxito");
      navigate("/login");
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    mutate(data);
  };
  return (
    <Center h={"100vh"}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <FormControl w={"25rem"}>
          <FormLabel htmlFor={"user"}>Nombre de usuario</FormLabel>
          <Input
            placeholder="Ingrese nombre de usuario"
            bg={"white"}
            {...register("username", {
              required: "El nombre de usuario es requerido",
            })}
          ></Input>
          {error && <small>{error.message}</small>}
          {errors.username && <small>{errors.username.message}</small>}
        </FormControl>
        <FormControl w={"25rem"}>
          <FormLabel htmlFor={"pass"}>Contraseña</FormLabel>
          <Input
            id="pass"
            bg={"white"}
            mb={"1rem"}
            placeholder="Ingrese su contraseña"
            {...register("password", {
              required: "Las contraseñas son requeridas",
            })}
            type="password"
          ></Input>
          <Input
            id="rePassword"
            placeholder="Confirmar contraseña"
            bg={"white"}
            {...register("rePassword", {
              required: "Las contraseñas son requeridas",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            type="password"
          ></Input>
          {errors.rePassword && <small>{errors.rePassword.message}</small>}
        </FormControl>

        <Flex mt={"1rem"} justifyContent="flex-end">
          <Button type="submit">Registrar</Button>
        </Flex>
      </form>
    </Center>
  );
}

export default Register;

const styles = {
  form: {
    background: "#FAF089",
    padding: "3rem",
    borderRadius: "1rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
};
