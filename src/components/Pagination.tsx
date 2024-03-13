import React, {FC, MouseEventHandler, ReactElement} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Box, HStack, Button, Spacer, ButtonGroup } from "@chakra-ui/react";

const Pagination: FC<PaginationProps> = ({ show, currentPage = 0, pages = 0 ,
                                           handlePreviousPage, handleNextPage }): ReactElement | null => {
    if(!show) {
        return null;
    }

    return (
        <HStack>
            <Box>Page {currentPage} sur {pages}</Box>
            <Spacer />
            <ButtonGroup gap='1'>
                <Button
                    leftIcon={<FiChevronLeft />}
                    variant='outline'
                    fontWeight="none"
                    onClick={handlePreviousPage}
                    isDisabled={(currentPage === 1)}
                >
                    Précédent
                </Button>
                <Button
                    rightIcon={<FiChevronRight />}
                    variant='outline'
                    fontWeight="none"
                    onClick={handleNextPage}
                    isDisabled={(currentPage === pages)}
                >
                    Suivant
                </Button>
            </ButtonGroup>
        </HStack>
    )
};

interface PaginationProps {
    show: boolean
    handlePreviousPage?: MouseEventHandler,
    handleNextPage?: MouseEventHandler,
    pages?: number,
    currentPage?: number,
}

export default Pagination;