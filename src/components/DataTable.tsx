import React, { FC, MouseEventHandler, ReactElement } from "react";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Stack, Alert } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";
import { AlertStatusEnumType, ErrorAlertType } from "../types/otherTypes";
import Pagination from "./Pagination";
import ListHeader from "./ListHeader";

const DataTable: FC<DataTableProps> = ({ isLoading, alertData, currentPage = 0, pages = 0 , headers = [], data = [], keys = [], children, simple = true,
                                           handleAddItem, handleSearch, handlePreviousPage, handleNextPage }): ReactElement => {
    if(headers.length === 0) {
        return (
            <Alert status={AlertStatusEnumType.warning} rounded='md'>
                Could not display table data, no headers.
            </Alert>
        );
    }

    log("DataTable component", {isLoading, alertData, handleAddItem});

    if(keys.length === 0) {
        headers.forEach((header: string) => keys.push(header.toLowerCase()));
    }

    const hasData: boolean = data.length > 0;

    return (
        <Stack>
            <ListHeader
                hasData={hasData}
                alertData={alertData}
                isLoading={isLoading}
                handleAddItem={handleAddItem}
                handleSearch={handleSearch}
            />
            <TableContainer boxShadow="md" borderRadius="md">
                <Table>
                    <Thead bg="gray.100">
                        <Tr>
                            {headers.map((header: string, index: number): ReactElement => <Th key={index}>{header}</Th>)}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {hasData ? (
                            <>
                                {
                                    (simple) ? (
                                        <>{data.map((item: any, index: number): ReactElement => <Tr key={index}>{keys.map((key: string, index: number): ReactElement => <Td key={index}>{item[key]}</Td>)}</Tr>)}</>
                                    ) : children
                                }
                            </>
                        ) : (
                            <Tr>
                                <Td colSpan={headers.length}>
                                    <Alert status={AlertStatusEnumType.info} rounded='md'>
                                        Pas de données
                                    </Alert>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                show={(hasData && currentPage > 0 && pages > 0 && pages >= currentPage)}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                currentPage={currentPage}
                pages={pages}
            />
        </Stack>
    )
};

interface DataTableProps {
    isLoading: boolean
    alertData: ErrorAlertType,
    handleAddItem?: MouseEventHandler,
    handlePreviousPage?: MouseEventHandler,
    handleNextPage?: MouseEventHandler,
    pages?: number,
    currentPage?: number,
    data?: Array<any>,
    headers?: Array<string>,
    keys?: Array<string>,
    handleSearch?: (a: string) => void,
    children?: React.ReactNode,
    simple?: boolean,
}

export default DataTable;