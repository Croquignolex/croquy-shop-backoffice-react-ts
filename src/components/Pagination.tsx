import React, {FC, ReactElement, useMemo} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {Box, HStack, Button, Text, Icon, Stack} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const Pagination: FC<PaginationProps> = (
    {
        show,
        currentPage,
        totalPages,
        currentPageElements,
        totalElements,
        handleGotoPage
    }): ReactElement | null => {

    const {t} = useTranslation();
    const buildButtons: Array<{label: number, active: boolean}> = useMemo(() => {
        const buttons: Array<{label: number, active: boolean}> = [];

        for(let i: number = 1; i <= totalPages; i++) {
            buttons.push({label: i, active: currentPage === i});
        }

        return buttons;
    }, [currentPage, totalPages]);

    if(!show) {
        return null;
    }

    const goToPreviousPage = (): void => {
        if (currentPage > 1) {
            // -1 page start at 0
            handleGotoPage(currentPage - 2);
        }
    }

    const goToNextPage = (): void => {
        if (currentPage < totalPages) {
            // -1 page start at 0
            handleGotoPage(currentPage);
        }
    }

    const goToPage = (page: number): void => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            // -1 page start at 0
            handleGotoPage(page - 1);
        }
    }

    return (
        <HStack pt={4} px={6} justifyContent={"space-between"}>
            <Box fontSize={"xs"}>
                <Text>{t("page_on", {currentPage, totalPages})}</Text>
                <Text>{t("elements_on", {currentPageElements, totalElements})}</Text>
            </Box>
            <Stack direction={{base: "column", md: "row"}}>
                <Button
                    onClick={goToPreviousPage}
                    variant={"outline"}
                    isDisabled={(currentPage === 1)}
                    size={{base: "sm", md: "md"}}
                >
                    <Icon as={FiChevronLeft} />
                </Button>
                {buildButtons.map((button: {label: number, active: boolean}, index: number) => (
                    <Button
                        key={index}
                        onClick={() => goToPage(button.label)}
                        isDisabled={button.active}
                        variant={button.active ? "solid" : "outline"}
                        size={{base: "sm", md: "md"}}
                    >
                        {button.label}
                    </Button>
                ))}
                <Button
                    onClick={goToNextPage}
                    variant={"outline"}
                    isDisabled={(currentPage === totalPages)}
                    size={{base: "sm", md: "md"}}
                >
                    <Icon as={FiChevronRight} />
                </Button>
            </Stack>
        </HStack>
    )
};

interface PaginationProps {
    show: boolean
    handleGotoPage: (a: number) => void,
    totalPages: number,
    currentPage: number,
    currentPageElements: number,
    totalElements: number,
}

export default Pagination;