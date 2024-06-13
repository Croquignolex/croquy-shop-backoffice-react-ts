import React, { FC, ReactElement, useRef, MutableRefObject, ReactNode } from "react";
import {FiThumbsUp, FiThumbsDown} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    Stack,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogCloseButton,
    Button,
    ButtonGroup
} from "@chakra-ui/react";

import CustomAlert from "./alert/CustomAlert";
import {ErrorAlertType} from "../helpers/globalTypesHelper";

const ConfirmAlertDialog: FC<ConfirmAlertDialogProps> = (
    {
        isOpen,
        isLoading,
        onClose,
        title = "delete",
        handleConfirm,
        alertData,
        children,
        danger
    }): ReactElement => {

    const {t} = useTranslation();
    const cancelRef: MutableRefObject<any> = useRef<any>();

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered closeOnOverlayClick={false}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize={"md"} color={`${danger ? "red.500" : "purple.500"}`}>
                        {t(title)}
                    </AlertDialogHeader>

                    <AlertDialogCloseButton _hover={{bg: `${danger ? "red.100" : "purple.100"}`, color: `${danger ? "red.500" : "purple.500"}`}} />

                    <Stack mx={2}><CustomAlert data={alertData} /></Stack>

                    <AlertDialogBody fontSize={"sm"}>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        <ButtonGroup>
                            <Button
                                onClick={onClose}
                                size={"sm"}
                                colorScheme={"gray"}
                                leftIcon={<FiThumbsDown />}
                                isDisabled={isLoading}
                                ref={cancelRef}
                            >
                                {t("no")}
                            </Button>
                            <Button
                                colorScheme={`${danger ? "red" : "purple"}`}
                                onClick={handleConfirm}
                                size={"sm"}
                                leftIcon={<FiThumbsUp />}
                                isLoading={isLoading}
                            >
                                {t("yes")}
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

interface ConfirmAlertDialogProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    handleConfirm: () => void,
    children: ReactNode,
    alertData: ErrorAlertType,
    title?: string,
    danger?: boolean,
}

export default ConfirmAlertDialog;