import { Button } from "@chakra-ui/react";
import { colors } from "../colors";
import { ReactNode } from "react";

type MyButtonProp = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  color: "primary" | "secondary" | "tertiary";
  display?: "block" | "none";
};

function MyButton({
  children,
  onClick,
  type = "button",
  color,
  display = "block",
}: MyButtonProp) {
  const displayColors = {
    primary: {
      bg: colors.brand.primary,
      color: colors.text.primary,
      _hover: { bg: colors.brand.primary_hover },
    },
    secondary: {
      bg: colors.brand.secondary,
      color: colors.text.primary,
      _hover: { bg: colors.brand.secondary_hover },
    },
    tertiary: { variant: "ghost" },
  };

  return (
    <Button
      display={display}
      w={"100%"}
      color={colors.text.secondary}
      {...displayColors[color]}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default MyButton;
