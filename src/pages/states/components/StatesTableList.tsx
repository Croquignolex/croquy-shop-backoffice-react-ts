import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import StateAddForm from "./StateAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import StatesCustomTable from "./StatesCustomTable";
import AddButton from "../../../components/form/AddButton";

const StatesTableList: FC<StatesTableListProps> = (
    {
        showCreator = false,
        showCountry = false,
        fetchStates = false,
        statesBaseUrl
    }): ReactElement => {

    const {onOpen: onAddStateDrawerOpen, isOpen: isAddStateDrawerOpen, onClose: onAddStateDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: statesBaseUrl});
    const {
        responseData: statesResponseData,
        isFetching: isStatesFetching,
        alertData: statesAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchStates, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={statesBaseUrl}>
                <AddButton onAddDrawerOpen={onAddStateDrawerOpen} title={t("add_state")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={statesAlertData} />
            </Box>

            <StatesCustomTable
                handleSort={handleSort}
                isStatesPending={isStatesFetching}
                showCreator={showCreator}
                showCountry={showCountry}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                statesResponseData={statesResponseData}
            />

            <Pagination
                show={!statesResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={statesResponseData.number + 1}
                totalPages={statesResponseData.totalPages}
                totalElements={statesResponseData.totalElements}
                currentPageElements={statesResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_state")}
                isOpen={isAddStateDrawerOpen}
                onClose={onAddStateDrawerClose}
            >
                <StateAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddStateDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface StatesTableListProps {
    showCountry?: boolean;
    showCreator?: boolean;
    fetchStates?: boolean;
    statesBaseUrl: string;
}

export default StatesTableList;