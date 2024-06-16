import React, { FC, ReactElement, ReactNode } from "react";
import {useTranslation} from "react-i18next";
import {
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Drawer,
} from "@chakra-ui/react";

import {SizeType} from "../helpers/globalTypesHelper";

const DrawerForm: FC<DrawerFormProps> = ({isOpen, onClose, title, children, size = SizeType.MEDIUM}): ReactElement => {
    const {t} = useTranslation();

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement={"right"} closeOnOverlayClick={false} size={size}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton _hover={{color: "purple.500", bg: "purple.100"}} />

                <DrawerHeader color={"purple.500"} fontSize={"md"}>
                    {t(title)}
                </DrawerHeader>

                <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

interface DrawerFormProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode,
    title: string,
    size?: SizeType
}

export default DrawerForm;