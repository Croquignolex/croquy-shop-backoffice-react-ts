import React, { FC, ReactElement, useRef, MutableRefObject } from "react";
import {
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
    AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button, ButtonGroup
} from "@chakra-ui/react";
import Loader from "./Loader";

const DeleteAlertDialog: FC<StatusBadgeProps> = ({ isOpen, isLoading, onClose, handleDelete, children }): ReactElement => {
    const cancelRef: MutableRefObject<any> = useRef<any>()

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Suppression</AlertDialogHeader>

                    <AlertDialogCloseButton />

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        {isLoading ? <Loader isLoading={isLoading} /> : (
                            <ButtonGroup>
                                <Button ref={cancelRef} onClick={onClose} size={"sm"}>
                                    Non
                                </Button>
                                <Button colorScheme='red' onClick={handleDelete} size={"sm"}>
                                    Oui
                                </Button>
                            </ButtonGroup>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
};

interface StatusBadgeProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    handleDelete: () => void,
    children: React.ReactNode,
}

export default DeleteAlertDialog;