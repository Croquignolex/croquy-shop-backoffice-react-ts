import React, {FC, MouseEventHandler, ReactElement} from "react";
import {FiPlus} from "react-icons/fi";
import { Box, HStack, Button, Spacer } from "@chakra-ui/react";

import SearchField from "./form/SearchField";

const ListHeader: FC<ListHeaderProps> = ({ handleAddItem, empty, handleSearch }): ReactElement => {
    return (
        <HStack>
            <Button
                colorScheme='orange'
                variant="outline"
                fontWeight="none"
                leftIcon={<FiPlus />}
                onClick={handleAddItem}
            >
                Ajouter
            </Button>
            <Spacer />
            <Box w="sm"><SearchField handleSearch={handleSearch} /></Box>)
        </HStack>
    )
};

interface ListHeaderProps {
    handleAddItem?: MouseEventHandler,
    empty: boolean,
    handleSearch?: (a: string) => void,
}

export default ListHeader;