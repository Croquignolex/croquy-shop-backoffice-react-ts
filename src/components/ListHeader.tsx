import React, {FC, ReactElement} from "react";
import {FiPlusSquare} from "react-icons/fi";
import { Link } from "react-router-dom";
import { Box, HStack, Button, Spacer } from "@chakra-ui/react";

import SearchField from "./form/SearchField";

const ListHeader: FC<ListHeaderProps> = ({ addItemPath, label, handleSearch }): ReactElement => {
    return (
        <HStack>
            <Button
                colorScheme='orange'
                fontWeight="none"
                size={"sm"}
                leftIcon={<FiPlusSquare />}
                as={Link}
                to={addItemPath}
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
    addItemPath: string,
    label: string,
    handleSearch: (a: string) => void,
}

export default ListHeader;