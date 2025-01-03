import React, {FC, ReactElement} from "react";
import {HStack, Th, Text, Icon, Thead, Tr} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {IconArrowsSort, IconSortAscending, IconSortDescending, IconSearch} from '@tabler/icons-react';
import {SortAndFilterRequestDataType} from "../../hooks/useSortAndFilterHook";

const TableHeader: FC<TableHeaderProps> = (
    {
        fields,
        handleSort,
        sortAndFilterData,
        noAction
    }) => {
    const {t} = useTranslation();

    return (
        <Thead>
            <Tr>
                {fields.map((field: {field: string, label: string, show: boolean, sort: boolean, search: boolean}, index: number): ReactElement | null => {
                    if(field.show) {
                        return (
                            <Th key={index}>
                                <Cel
                                    label={field.label}
                                    field={field.field}
                                    handleSort={handleSort}
                                    sortable={field.sort}
                                    searchable={field.search}
                                    sort={
                                        (sortAndFilterData.sort === field.field)
                                            ? sortAndFilterData.direction === "desc"
                                            : undefined
                                    }
                                />
                            </Th>
                        );
                    }
                    return null;
                })}
                {!noAction && <Th>{t("actions")}</Th>}
            </Tr>
        </Thead>
    )
};

const Cel: FC<CelProps> = ({label, field, sort, sortable, searchable, handleSort}): ReactElement => {
    const {t} = useTranslation();

    const handleSortClick = (sort: boolean): void => {
        handleSort(field, sort ? "desc" : "asc");
    }

    return (
        <HStack justifyContent={"space-between"}>
            <Text>
                {searchable && <Icon as={IconSearch} />}
                {t(label)}
            </Text>
            {sortable && (
                (sort === undefined) ? (
                    <Icon
                        as={IconArrowsSort}
                        cursor={"pointer"}
                        fontSize={"md"}
                        _hover={{color: "gray.900"}}
                        onClick={() => handleSortClick(true)}
                    />
                ) : (sort ? (
                        <Icon
                            as={IconSortDescending}
                            cursor={"pointer"}
                            fontSize={"md"}
                            _hover={{color: "gray.900"}}
                            onClick={() => handleSortClick(false)}
                        />
                    ) : (
                        <Icon
                            as={IconSortAscending}
                            cursor={"pointer"}
                            fontSize={"md"}
                            _hover={{color: "gray.900"}}
                            onClick={() => handleSortClick(true)}
                        />
                    )
                )
            )}
        </HStack>
    );
};

interface CelProps {
    field: string,
    label: string,
    sort: boolean | undefined,
    sortable: boolean,
    searchable: boolean,
    handleSort: (a: string, b: string) => void,
}

interface TableHeaderProps {
    fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}>,
    handleSort: (a: string, b: string) => void,
    sortAndFilterData: SortAndFilterRequestDataType,
    noAction?: boolean
}

export default TableHeader;