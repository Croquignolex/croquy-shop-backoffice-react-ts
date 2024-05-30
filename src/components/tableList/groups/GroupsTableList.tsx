import React, {FC, ReactElement, ReactNode} from "react";
import {Link} from "react-router-dom";
import {Badge, Box, HStack, Spacer, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

import EmptyTableAlert from "../../alert/EmptyTableAlert";
import StatusBadge from "../../StatusBadge";
import Pagination from "../../Pagination";
import ConfirmAlertDialog from "../../ConfirmAlertDialog";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../skeletonLoader/TableSkeletonLoader";
import DoubleActionButton from "../../form/DoubleActionButton";
import useGroupsTableListHook from "./useGroupsTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {GroupType} from "../../../pages/groups/show/showGroupData";
import {GroupsTableListHookType} from "./groupsTableListData";
import ImageDisplay from "../../ImageDisplay";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";

const GroupsTableList: FC<GroupsTableListProps> = ({showCreator = false, fetchGroups = false, groupsBaseUrl, children}): ReactElement => {
    const {
        groupsResponseData,
        isGroupsPending,
        groupsAlertData,
        fetchPaginatedGroups,
        fetchPaginatedNeedleGroups,
        onDeleteModalClose,
        selectedGroup,
        showDeleteModal,
        isDeleteModalOpen,
        deleteGroupAlertData,
        isDeleteGroupPending,
        handleDeleteGroup,
    }: GroupsTableListHookType = useGroupsTableListHook({fetchGroups, groupsBaseUrl});

    return (
        <Stack>
            <CustomAlert data={groupsAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleGroups(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Nom</Th>
                            <Th>Slug</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isGroupsPending ? <TableSkeletonLoader /> : (
                            groupsResponseData.empty ? <EmptyTableAlert /> : (
                                groupsResponseData.content.map((group: GroupType, index: number) => (
                                    <Tr key={index}>
                                        <Td><ImageDisplay image={group.logo} size={ImageSizeEnumType.ROW} /></Td>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.groups.path}/${group.id}`}
                                                className="link"
                                                state={group}
                                            >
                                                {group.name}
                                            </Link>
                                        </Td>
                                        <Td>{group.slug}</Td>
                                        <Td><StatusBadge enabled={group.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(group.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${group.creator?.id}`}
                                                    className="link"
                                                    state={group.creator}
                                                >
                                                    {group.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={group}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.groups.path}/${group.id}/edit`}
                                            />
                                        </Td>
                                    </Tr>
                                ))
                            )
                        )}
                    </Tbody>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Nom</Th>
                            <Th>Slug</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!groupsResponseData.empty}
                handleNextPage={() => fetchPaginatedGroups(true)}
                handlePreviousPage={() => fetchPaginatedGroups(false)}
                currentPage={groupsResponseData.number + 1}
                pages={groupsResponseData.totalPages}
                totalElements={groupsResponseData.totalElements}
                currentPageElements={groupsResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteGroup}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteGroupPending}
                alertData={deleteGroupAlertData}
            >
                Supprimer le groupe <strong>{selectedGroup.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface GroupsTableListProps {
    showCreator?: boolean;
    fetchGroups?: boolean;
    children: ReactNode;
    groupsBaseUrl: string;
}

export default GroupsTableList;