import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import BrandAddForm from "./BrandAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import BrandsCustomTable from "./BrandsCustomTable";
import AddButton from "../../../components/form/AddButton";

const BrandsTableList: FC<BrandsTableListProps> = (
    {
        showCreator = false,
        fetchBrands = false,
        brandsBaseUrl
    }): ReactElement => {

    const {onOpen: onAddBrandDrawerOpen, isOpen: isAddBrandDrawerOpen, onClose: onAddBrandDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: brandsBaseUrl});
    const {
        responseData: brandsResponseData,
        isFetching: isBrandsFetching,
        alertData: brandsAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchBrands, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={brandsBaseUrl}>
                <AddButton onAddDrawerOpen={onAddBrandDrawerOpen} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={brandsAlertData} />
            </Box>

            <BrandsCustomTable
                handleSort={handleSort}
                isBrandsPending={isBrandsFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                brandsResponseData={brandsResponseData}
            />

            <Pagination
                show={!brandsResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={brandsResponseData.number + 1}
                totalPages={brandsResponseData.totalPages}
                totalElements={brandsResponseData.totalElements}
                currentPageElements={brandsResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_brand")}
                isOpen={isAddBrandDrawerOpen}
                onClose={onAddBrandDrawerClose}
            >
                <BrandAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddBrandDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface BrandsTableListProps {
    showCreator?: boolean;
    fetchBrands?: boolean;
    brandsBaseUrl: string;
}

export default BrandsTableList;