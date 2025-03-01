import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.MutableRefObject<HTMLButtonElement | null>;
  title: string;
  children: ReactNode;
  handleActive: () => void;
  type: "positive" | "negative";
};

function MyAlertDialog({
  isOpen,
  onClose,
  cancelRef,
  title,
  children,
  handleActive,
  type,
}: Props) {
  const handleAction = () => {
    handleActive();
    onClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme={type == "negative" ? "red" : "green"}
                onClick={handleAction}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default MyAlertDialog;
