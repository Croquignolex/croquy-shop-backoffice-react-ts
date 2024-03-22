import React, { FC, ReactElement, useRef, MutableRefObject } from "react";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogCloseButton,
    Button,
    ButtonGroup
} from "@chakra-ui/react";

const DeleteAlertDialog: FC<StatusBadgeProps> = ({ isOpen, onClose, handleDelete, children }): ReactElement => {
    const cancelRef: MutableRefObject<any> = useRef<any>()

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Suppression</AlertDialogHeader>

                    <AlertDialogCloseButton />

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        <ButtonGroup>
                            <Button ref={cancelRef} onClick={onClose} size={"sm"}>
                                Non
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} size={"sm"}>
                                Oui
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
};

interface StatusBadgeProps {
    isOpen: boolean;
    onClose: () => void;
    handleDelete: () => void,
    children: React.ReactNode,
}

export default DeleteAlertDialog;