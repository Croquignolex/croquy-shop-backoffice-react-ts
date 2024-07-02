import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import CategoryAddForm from "./CategoryAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import CategoriesCustomTable from "./CategoriesCustomTable";
import AddButton from "../../../components/form/AddButton";
import {GroupType} from "../../groups/show/showGroupData";

const CategoriesTableList: FC<CategoriesTableListProps> = (
    {
        showCreator = false,
        showGroup = false,
        fetchCategories = false,
        categoriesBaseUrl,
        group
    }): ReactElement => {

    const {onOpen: onAddCategoryDrawerOpen, isOpen: isAddCategoryDrawerOpen, onClose: onAddCategoryDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: categoriesBaseUrl});
    const {
        responseData: categoriesResponseData,
        isFetching: isCategoriesFetching,
        alertData: categoriesAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchCategories, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={categoriesBaseUrl}>
                <AddButton onAddDrawerOpen={onAddCategoryDrawerOpen} title={t("add_category")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={categoriesAlertData} />
            </Box>

            <CategoriesCustomTable
                handleSort={handleSort}
                isCategoriesPending={isCategoriesFetching}
                showCreator={showCreator}
                showGroup={showGroup}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                categoriesResponseData={categoriesResponseData}
            />

            <Pagination
                show={!categoriesResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={categoriesResponseData.number + 1}
                totalPages={categoriesResponseData.totalPages}
                totalElements={categoriesResponseData.totalElements}
                currentPageElements={categoriesResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_category")}
                isOpen={isAddCategoryDrawerOpen}
                onClose={onAddCategoryDrawerClose}
            >
                <CategoryAddForm
                    selectedGroup={group}
                    added={reloadList}
                    finished={(): void => {
                        onAddCategoryDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface CategoriesTableListProps {
    showGroup?: boolean;
    showCreator?: boolean;
    fetchCategories?: boolean;
    categoriesBaseUrl: string;
    group?: GroupType;
}

export default CategoriesTableList;