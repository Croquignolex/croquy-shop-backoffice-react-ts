import React, {FC, MouseEventHandler, ReactElement} from "react";
import {FiPlus} from "react-icons/fi";
import { Box, HStack, Button, Spacer } from "@chakra-ui/react";

import SearchField from "./form/SearchField";

const ListHeader: FC<ListHeaderProps> = ({ handleAddItem, label, handleSearch }): ReactElement => {
    return (
        <HStack>
            <Button
                colorScheme='orange'
                fontWeight="none"
                size={"md"}
                leftIcon={<FiPlus />}
                onClick={handleAddItem}
            >
                {label}
            </Button>
            <Spacer />
            <Box w="sm">
                <SearchField handleSearch={handleSearch} />
            </Box>
        </HStack>
    )
};

interface ListHeaderProps {
    handleAddItem?: MouseEventHandler,
    label: string,
    handleSearch?: (a: string) => void,
}

export default ListHeader;