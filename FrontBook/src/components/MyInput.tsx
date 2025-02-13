import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef, HTMLInputTypeAttribute } from "react";

type MyInputProps = {
  Label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  error?: string | null;
};

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  ({ Label, placeholder, type, error }, ref) => {
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
        {error && <FormErrorMessage>Email is required.</FormErrorMessage>}
      </FormControl>
    );
  }
);
