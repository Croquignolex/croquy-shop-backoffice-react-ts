import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import AttributeValueAddForm from "./AttributeValueAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import AttributeValuesCustomTable from "./AttributeValuesCustomTable";
import AddButton from "../../../components/form/AddButton";

const AttributeValueValuesTableList: FC<AttributeValuesTableListProps> = (
    {
        showCreator = false,
        fetchAttributeValues = false,
        attributeValuesBaseUrl
    }): ReactElement => {

    const {onOpen: onAddAttributeValueDrawerOpen, isOpen: isAddAttributeValueDrawerOpen, onClose: onAddAttributeValueDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: attributeValuesBaseUrl});
    const {
        responseData: attributeValuesResponseData,
        isFetching: isAttributeValuesFetching,
        alertData: attributeValuesAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchAttributeValues, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={attributeValuesBaseUrl}>
                <AddButton onAddDrawerOpen={onAddAttributeValueDrawerOpen} title={t("add_attribute_value")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={attributeValuesAlertData} />
            </Box>

            <AttributeValuesCustomTable
                handleSort={handleSort}
                isAttributeValuesPending={isAttributeValuesFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                attributeValuesResponseData={attributeValuesResponseData}
            />

            <Pagination
                show={!attributeValuesResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={attributeValuesResponseData.number + 1}
                totalPages={attributeValuesResponseData.totalPages}
                totalElements={attributeValuesResponseData.totalElements}
                currentPageElements={attributeValuesResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_attribute_value")}
                isOpen={isAddAttributeValueDrawerOpen}
                onClose={onAddAttributeValueDrawerClose}
            >
                <AttributeValueAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddAttributeValueDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface AttributeValuesTableListProps {
    showCreator?: boolean;
    fetchAttributeValues?: boolean;
    attributeValuesBaseUrl: string;
}

export default AttributeValueValuesTableList;