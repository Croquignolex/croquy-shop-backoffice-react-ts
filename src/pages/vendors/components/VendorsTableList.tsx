import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import VendorAddForm from "./VendorAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import VendorsCustomTable from "./VendorsCustomTable";
import AddButton from "../../../components/form/AddButton";

const VendorsTableList: FC<VendorsTableListProps> = (
    {
        showCreator = false,
        fetchVendors = false,
        vendorsBaseUrl
    }): ReactElement => {

    const {onOpen: onAddVendorDrawerOpen, isOpen: isAddVendorDrawerOpen, onClose: onAddVendorDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: vendorsBaseUrl});
    const {
        responseData: vendorsResponseData,
        isFetching: isVendorsFetching,
        alertData: vendorsAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchVendors, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={vendorsBaseUrl}>
                <AddButton onAddDrawerOpen={onAddVendorDrawerOpen} title={t("add_vendor")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={vendorsAlertData} />
            </Box>

            <VendorsCustomTable
                handleSort={handleSort}
                isVendorsPending={isVendorsFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                vendorsResponseData={vendorsResponseData}
            />

            <Pagination
                show={!vendorsResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={vendorsResponseData.number + 1}
                totalPages={vendorsResponseData.totalPages}
                totalElements={vendorsResponseData.totalElements}
                currentPageElements={vendorsResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_vendor")}
                isOpen={isAddVendorDrawerOpen}
                onClose={onAddVendorDrawerClose}
            >
                <VendorAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddVendorDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface VendorsTableListProps {
    showCreator?: boolean;
    fetchVendors?: boolean;
    vendorsBaseUrl: string;
}

export default VendorsTableList;