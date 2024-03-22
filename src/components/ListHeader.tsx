import React, {FC, MouseEventHandler, ReactElement} from "react";
import {FiPlus} from "react-icons/fi";
import { Box, HStack, Button, Spacer } from "@chakra-ui/react";

import Loader from "./Loader";
import DisplayAlert from "./DisplayAlert";
import SearchField from "./form/SearchField";
import { ErrorAlertType } from "../helpers/globalTypesHelper";

const ListHeader: FC<ListHeaderProps> = ({ isLoading, alertData, handleAddItem, empty, handleSearch }): ReactElement => {
    return (
        <>
            <Loader isLoading={isLoading} />
            <DisplayAlert data={alertData} />
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
        </>
    )
};

interface ListHeaderProps {
    isLoading: boolean
    alertData: ErrorAlertType,
    handleAddItem?: MouseEventHandler,
    empty: boolean,
    handleSearch?: (a: string) => void,
}

export default ListHeader;