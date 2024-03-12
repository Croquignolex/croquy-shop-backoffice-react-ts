import React, {FC, MouseEventHandler, ReactElement} from "react";
import { FiPlus } from "react-icons/fi";
import { Box, HStack, Button, Spacer } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";
import Loader from "./Loader";
import DisplayAlert from "./DisplayAlert";
import SearchField from "./form/SearchField";
import { ErrorAlertType } from "../types/otherTypes";

const ListHeader: FC<ListHeaderProps> = ({ isLoading, alertData, handleAddItem, hasData = true, handleSearch }): ReactElement => {
    log("ListHeader component", {isLoading, alertData, handleAddItem, handleSearch});

    return (
        <>
            <Loader isLoading={isLoading} />
            <DisplayAlert data={alertData} />
            <HStack>
                <Button colorScheme='orange' variant="outline" fontWeight="none" onClick={handleAddItem}>
                    <FiPlus />
                    Ajouter
                </Button>
                <Spacer />
                {hasData && (
                    <Box w="sm">
                        <SearchField handleSearch={handleSearch} />
                    </Box>
                )}
            </HStack>
        </>
    )
};

interface ListHeaderProps {
    isLoading: boolean
    alertData: ErrorAlertType,
    handleAddItem?: MouseEventHandler,
    hasData?: boolean,
    handleSearch?: (a: string) => void,
}

export default ListHeader;