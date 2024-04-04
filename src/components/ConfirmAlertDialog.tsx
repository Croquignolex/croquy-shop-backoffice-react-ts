import React, { FC, ReactElement, useRef, MutableRefObject, ReactNode } from "react";
import {FiThumbsUp, FiThumbsDown} from "react-icons/fi";
import {
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, Stack,
    AlertDialogFooter, AlertDialogBody, AlertDialogCloseButton, Button, ButtonGroup
} from "@chakra-ui/react";

import Loader from "./Loader";
import DisplayAlert from "./DisplayAlert";
import {ErrorAlertType} from "../helpers/globalTypesHelper";

const ConfirmAlertDialog: FC<ConfirmAlertDialogProps> = ({ isOpen, isLoading, onClose, colorScheme = "red", title = "Supression",
                                                             handleConfirm, alertData, children }): ReactElement => {
    const cancelRef: MutableRefObject<any> = useRef<any>()

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>{title}</AlertDialogHeader>

                    <AlertDialogCloseButton />

                    <Stack mx={2}><DisplayAlert data={alertData} /></Stack>

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        {isLoading ? <Loader isLoading={isLoading} /> : (
                            <ButtonGroup>
                                <Button ref={cancelRef} onClick={onClose} size={"sm"} leftIcon={<FiThumbsDown />}>
                                    Non
                                </Button>
                                <Button colorScheme={colorScheme} onClick={handleConfirm} size={"sm"} leftIcon={<FiThumbsUp />}>
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

interface ConfirmAlertDialogProps {
    isOpen: boolean;
    colorScheme?: string;
    isLoading: boolean;
    onClose: () => void;
    handleConfirm: () => void,
    children: ReactNode,
    alertData: ErrorAlertType,
    title?: string,
}

export default ConfirmAlertDialog;