import React, {ChangeEvent, FC, ReactElement} from "react";
import {Box, Button, HStack, Select, Stack, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {IconFlagPlus} from '@tabler/icons-react';

import {mainRoutes} from "../../routes/mainRoutes";
import SearchField from "../form/SearchField";
import LocaleSwitcher from "../LocaleSwitcher";

const TableActions: FC<TableActionsProps> = ({handleShowItems, handleSearch}): ReactElement => {
    const {t} = useTranslation();

    return (
        <Stack px={6} justifyContent={"space-between"} direction={{base: "column", md: "row"}}>
            <Box w={{base: "full", md: "sm"}}>
                <SearchField handleSearch={handleSearch} />
            </Box>
            <Stack direction={{base: "column", md: "row"}}>
                <HStack>
                    <Text>{t("show")}</Text>
                    <Select
                        name={"sort"}
                        borderColor="gray.300"
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => handleShowItems(parseInt(event.target.value))}
                    >
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                    </Select>
                    <Text>{t("items")}</Text>
                </HStack>
                <HStack>
                    <LocaleSwitcher />
                    <Button leftIcon={<IconFlagPlus />} as={Link} to={mainRoutes.addCountry.path} px={{base: 4, sm: 6}}>
                        {t("add_country")}
                    </Button>
                </HStack>
            </Stack>
        </Stack>
    );
};

interface TableActionsProps {
    handleShowItems: (a: number) => void,
    handleSearch: (a: string) => void,
}

export default TableActions;