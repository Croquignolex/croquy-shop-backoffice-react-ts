import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import ShopAddForm from "./ShopAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import ShopsCustomTable from "./ShopsCustomTable";
import AddButton from "../../../components/form/AddButton";

const ShopsTableList: FC<ShopsTableListProps> = (
    {
        showCreator = false,
        fetchShops = false,
        shopsBaseUrl
    }): ReactElement => {

    const {onOpen: onAddShopDrawerOpen, isOpen: isAddShopDrawerOpen, onClose: onAddShopDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: shopsBaseUrl});
    const {
        responseData: shopsResponseData,
        isFetching: isShopsFetching,
        alertData: shopsAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchShops, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={shopsBaseUrl}>
                <AddButton onAddDrawerOpen={onAddShopDrawerOpen} title={t("add_shop")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={shopsAlertData} />
            </Box>

            <ShopsCustomTable
                handleSort={handleSort}
                isShopsPending={isShopsFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                shopsResponseData={shopsResponseData}
            />

            <Pagination
                show={!shopsResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={shopsResponseData.number + 1}
                totalPages={shopsResponseData.totalPages}
                totalElements={shopsResponseData.totalElements}
                currentPageElements={shopsResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_shop")}
                isOpen={isAddShopDrawerOpen}
                onClose={onAddShopDrawerClose}
            >
                <ShopAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddShopDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface ShopsTableListProps {
    showCreator?: boolean;
    fetchShops?: boolean;
    shopsBaseUrl: string;
}

export default ShopsTableList;