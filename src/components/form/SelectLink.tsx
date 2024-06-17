import React, { ReactElement, FC } from "react";
import {Text, Box} from "@chakra-ui/react";

const SelectLink: FC<SelectLinkProps> = ({onModalOpen, label}): ReactElement => {
    return (
        <Box textAlign="right">
            <Text as={"span"} fontSize="sm" className="link" onClick={onModalOpen}>
                {label}
            </Text>
        </Box>
    );
};

interface SelectLinkProps {
    onModalOpen: () => void;
    label: string,
}

export default SelectLink;