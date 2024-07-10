import React, {FC, ReactElement, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {IconFileTypePdf, IconFileTypeCsv} from "@tabler/icons-react";
import {FiChevronDown, FiDownload} from "react-icons/fi";
import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text
} from "@chakra-ui/react";

import SearchField from "../form/SearchField";
import useDownloadFileHook, {DownloadFileHookType} from "../../hooks/useDownloadFileHook";
import {FileType} from "../../helpers/globalTypesHelper";
import SelectInput, {SelectInputOptionType} from "../form/SelectInput";

const TableActions: FC<TableActionsProps> = ({handleShowItems, handleSearch, baseUrl, children}): ReactElement => {
    return (
        <div>
            <Stack px={6} justifyContent={"space-between"} direction={{base: "column", md: "row"}}>
                <Box w={{base: "full", md: "sm"}}>
                    <SearchField handleSearch={handleSearch} />
                </Box>
                <Stack direction={{base: "column", md: "row"}}>
                    <ShowItemsSelect handleShowItems={handleShowItems} />
                    <HStack>
                        <DownloadButton baseUrl={baseUrl} />
                        {children}
                    </HStack>
                </Stack>
            </Stack>
        </div>
    );
};

const ShowItemsSelect: FC<{handleShowItems: (a: number) => void}> = ({handleShowItems}): ReactElement => {
    const {t} = useTranslation();

    const options: Array<SelectInputOptionType> =[
        {value: "7", label: "7"},
        {value: "10", label: "10"},
        {value: "20", label: "20"},
        {value: "50", label: "50"},
        {value: "100", label: "100"},
        {value: "250", label: "250"}
    ];

    return (
        <HStack>
            <Text>{t("show")}</Text>
            <SelectInput
                options={options}
                name={"sort"}
                defaultValue={options[0]}
                handleSelect={(v: string) => handleShowItems(parseInt(v))}
            />
            <Text>{t("items")}</Text>
        </HStack>
    );
};

const DownloadButton: FC<{baseUrl: string}> = ({baseUrl}): ReactElement => {
    const {t} = useTranslation();
    const {handleDownload, isDownloadFilePending}: DownloadFileHookType = useDownloadFileHook({baseUrl});

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={<FiChevronDown />}
                leftIcon={<FiDownload />}
                isLoading={isDownloadFilePending}
                w={150}
                border={0}
                color={"gray.600"}
                _hover={{color: "purple.500", bg: "gray.100"}}
                _active={{color: "purple.500", bg: "purple.100"}}
            >
                {t("export")}
            </MenuButton>
            <MenuList shadow="default" rounded="lg" minW={150}>
                <MenuItem py={0} bg={"none"}>
                    <Flex
                        px={4}
                        py={2}
                        alignItems={"center"}
                        w={"full"}
                        _hover={{color: "purple.500"}}
                        onClick={() => handleDownload(FileType.EXCEL)}
                    >
                        <Icon mr="2" as={IconFileTypeCsv} fontSize={"lg"} />
                        Excel
                    </Flex>
                </MenuItem>
                <MenuItem py={0} bg={"none"}>
                    <Flex
                        px={4}
                        py={2}
                        alignItems={"center"}
                        w={"full"}
                        _hover={{color: "purple.500"}}
                        onClick={() => handleDownload(FileType.PDF)}
                    >
                        <Icon mr="2" as={IconFileTypePdf} fontSize={"lg"} />
                        PDF
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

interface TableActionsProps {
    handleShowItems: (a: number) => void,
    handleSearch: (a: string) => void,
    baseUrl: string,
    children: ReactNode,
}

export default TableActions;