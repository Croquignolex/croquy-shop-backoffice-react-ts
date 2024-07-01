import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import AttributeAddForm from "./AttributeAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import AttributesCustomTable from "./AttributesCustomTable";
import AddButton from "../../../components/form/AddButton";

const AttributesTableList: FC<AttributesTableListProps> = (
    {
        showCreator = false,
        fetchAttributes = false,
        attributesBaseUrl
    }): ReactElement => {

    const {onOpen: onAddAttributeDrawerOpen, isOpen: isAddAttributeDrawerOpen, onClose: onAddAttributeDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: attributesBaseUrl});
    const {
        responseData: attributesResponseData,
        isFetching: isAttributesFetching,
        alertData: attributesAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchAttributes, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={attributesBaseUrl}>
                <AddButton onAddDrawerOpen={onAddAttributeDrawerOpen} title={t("add_attribute")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={attributesAlertData} />
            </Box>

            <AttributesCustomTable
                handleSort={handleSort}
                isAttributesPending={isAttributesFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                attributesResponseData={attributesResponseData}
            />

            <Pagination
                show={!attributesResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={attributesResponseData.number + 1}
                totalPages={attributesResponseData.totalPages}
                totalElements={attributesResponseData.totalElements}
                currentPageElements={attributesResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_attribute")}
                isOpen={isAddAttributeDrawerOpen}
                onClose={onAddAttributeDrawerClose}
            >
                <AttributeAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddAttributeDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface AttributesTableListProps {
    showCreator?: boolean;
    fetchAttributes?: boolean;
    attributesBaseUrl: string;
}

export default AttributesTableList;