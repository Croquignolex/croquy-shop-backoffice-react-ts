import React, { ReactElement, FC } from "react";
import {Text, Box} from "@chakra-ui/react";

const SelectLink: FC<CustomDateFieldProps> = ({onModalOpen, label}): ReactElement => {
    return (
        <Box textAlign="right">
            <Text as={"span"} fontSize="sm" className="link" onClick={onModalOpen}>
                {label}
            </Text>
        </Box>
    );
};

interface CustomDateFieldProps {
    onModalOpen: () => void;
    label: string,
}

export default SelectLink;