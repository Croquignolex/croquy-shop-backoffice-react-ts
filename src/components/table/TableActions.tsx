import React, {ChangeEvent, FC, ReactElement, ReactNode} from "react";
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
    Select,
    Stack,
    Text
} from "@chakra-ui/react";

import SearchField from "../form/SearchField";
import useDownloadFileHook, {DownloadFileHookType} from "../../hooks/useDownloadFileHook";
import {FileType} from "../../helpers/globalTypesHelper";

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

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleShowItems(parseInt(event.target.value));
    };

    return (
        <HStack>
            <Text>{t("show")}</Text>
            <Select name={"sort"} borderColor="gray.300" onChange={handleChange}>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option>
            </Select>
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