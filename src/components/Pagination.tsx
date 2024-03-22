import React, {FC, MouseEventHandler, ReactElement} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Box, HStack, Button, Spacer, ButtonGroup } from "@chakra-ui/react";

const Pagination: FC<PaginationProps> = ({ show, currentPage, pages, currentPageElements, totalElements,
                                           handlePreviousPage, handleNextPage }): ReactElement | null => {
    if(!show) {
        return null;
    }

    return (
        <HStack>
            <Box fontSize={"sm"}>
                Page {currentPage} sur {pages} <br/>
                {currentPageElements} élément(s) sur {totalElements}
            </Box>
            <Spacer />
            <ButtonGroup gap='1'>
                <Button
                    size={"sm"}
                    leftIcon={<FiChevronLeft />}
                    variant='outline'
                    fontWeight="none"
                    onClick={handlePreviousPage}
                    isDisabled={(currentPage === 1)}
                >
                    Précédent
                </Button>
                <Button
                    size={"sm"}
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
    pages: number,
    currentPage: number,
    currentPageElements: number,
    totalElements: number,
}

export default Pagination;