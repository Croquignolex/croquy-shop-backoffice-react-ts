import React, {FC, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, useDisclosure} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import TableActions from "../../../components/table/TableActions";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import GroupAddForm from "./GroupAddForm";
import useTableListHook, {TableListHookType} from "../../../hooks/useTableListHook";
import useSortAndFilterHook, {SortAndFilterHookType} from "../../../hooks/useSortAndFilterHook";
import GroupsCustomTable from "./GroupsCustomTable";
import AddButton from "../../../components/form/AddButton";

const GroupsTableList: FC<GroupsTableListProps> = (
    {
        showCreator = false,
        fetchGroups = false,
        groupsBaseUrl
    }): ReactElement => {

    const {onOpen: onAddGroupDrawerOpen, isOpen: isAddGroupDrawerOpen, onClose: onAddGroupDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: groupsBaseUrl});
    const {
        responseData: groupsResponseData,
        isFetching: isGroupsFetching,
        alertData: groupsAlertData,
        reloadList,
    }: TableListHookType = useTableListHook({fetch: fetchGroups, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={groupsBaseUrl}>
                <AddButton onAddDrawerOpen={onAddGroupDrawerOpen} title={t("add_group")} />
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={groupsAlertData} />
            </Box>

            <GroupsCustomTable
                handleSort={handleSort}
                isGroupsPending={isGroupsFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                groupsResponseData={groupsResponseData}
            />

            <Pagination
                show={!groupsResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={groupsResponseData.number + 1}
                totalPages={groupsResponseData.totalPages}
                totalElements={groupsResponseData.totalElements}
                currentPageElements={groupsResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_group")}
                isOpen={isAddGroupDrawerOpen}
                onClose={onAddGroupDrawerClose}
            >
                <GroupAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddGroupDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

interface GroupsTableListProps {
    showCreator?: boolean;
    fetchGroups?: boolean;
    groupsBaseUrl: string;
}

export default GroupsTableList;