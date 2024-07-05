import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import UserAddForm from "./UserAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import UsersCustomTable from "./UsersCustomTable";
import AddButton from "../../../components/form/AddButton";

const UsersTableList: FC<UsersTableListProps> = (
    {
        showCreator = false,
        fetchUsers = false,
        usersBaseUrl
    }): ReactElement => {

    const {onOpen: onAddUserDrawerOpen, isOpen: isAddUserDrawerOpen, onClose: onAddUserDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: usersBaseUrl});
    const {
        responseData: usersResponseData,
        isFetching: isUsersFetching,
        alertData: usersAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchUsers, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={usersBaseUrl}>
                <AddButton onAddDrawerOpen={onAddUserDrawerOpen} title={t("add_user")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={usersAlertData} />
            </Box>

            <UsersCustomTable
                handleSort={handleSort}
                isUsersPending={isUsersFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                usersResponseData={usersResponseData}
            />

            <Pagination
                show={!usersResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={usersResponseData.number + 1}
                totalPages={usersResponseData.totalPages}
                totalElements={usersResponseData.totalElements}
                currentPageElements={usersResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_user")}
                isOpen={isAddUserDrawerOpen}
                onClose={onAddUserDrawerClose}
            >
                <UserAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddUserDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface UsersTableListProps {
    showCreator?: boolean;
    fetchUsers?: boolean;
    usersBaseUrl: string;
}

export default UsersTableList;