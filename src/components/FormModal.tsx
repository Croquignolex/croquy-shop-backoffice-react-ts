import React, { FC, ReactElement, ReactNode } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
} from "@chakra-ui/react";

const FormModal: FC<FormModalProps> = ({ isOpen, onClose, title, children}): ReactElement => {
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode,
    title: string,
}

export default FormModal;