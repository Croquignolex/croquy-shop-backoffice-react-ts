import React, { FC, ReactElement, useRef, MutableRefObject } from "react";
import {FiThumbsUp, FiThumbsDown} from "react-icons/fi";
import {
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, Stack,
    AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button, ButtonGroup
} from "@chakra-ui/react";

import Loader from "./Loader";
import DisplayAlert from "./DisplayAlert";
import {ErrorAlertType} from "../helpers/globalTypesHelper";

const DeleteAlertDialog: FC<StatusBadgeProps> = ({ isOpen, isLoading, onClose, handleDelete, deleteAlertData, children }): ReactElement => {
    const cancelRef: MutableRefObject<any> = useRef<any>()

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Suppression</AlertDialogHeader>

                    <AlertDialogCloseButton />

                    <Stack mx={2}><DisplayAlert data={deleteAlertData} /></Stack>

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        {isLoading ? <Loader isLoading={isLoading} /> : (
                            <ButtonGroup>
                                <Button ref={cancelRef} onClick={onClose} size={"sm"} leftIcon={<FiThumbsDown />}>
                                    Non
                                </Button>
                                <Button colorScheme='red' onClick={handleDelete} size={"sm"} leftIcon={<FiThumbsUp />}>
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
    deleteAlertData: ErrorAlertType,
}

export default DeleteAlertDialog;