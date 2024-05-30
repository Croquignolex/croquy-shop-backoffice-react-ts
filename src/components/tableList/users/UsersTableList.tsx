import React, {FC, ReactElement, ReactNode} from "react";
import {Link} from "react-router-dom";
import {Badge, Box, HStack, Spacer, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

import EmptyTableAlert from "../../alert/EmptyTableAlert";
import StatusBadge from "../../StatusBadge";
import Pagination from "../../Pagination";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../skeletonLoader/TableSkeletonLoader";
import useUsersTableListHook from "./useUsersTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {UserType} from "../../../pages/users/show/showUserData";
import {UsersTableListHookType} from "./usersTableListData";
import ImageDisplay from "../../ImageDisplay";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";
import EnumBadge from "../../EnumBadge";

const UsersTableList: FC<UsersTableListProps> = ({showCreator = false, fetchUsers = false, usersBaseUrl, children}): ReactElement => {
    const {
        usersResponseData,
        isUsersPending,
        usersAlertData,
        fetchPaginatedUsers,
        fetchPaginatedNeedleUsers,
    }: UsersTableListHookType = useUsersTableListHook({fetchUsers, usersBaseUrl});

    return (
        <Stack>
            <CustomAlert data={usersAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleUsers(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Avatar</Th>
                            <Th>Nom d'utilisateur</Th>
                            <Th>Prénom</Th>
                            <Th>Nom</Th>
                            <Th>Role</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isUsersPending ? <TableSkeletonLoader /> : (
                            usersResponseData.empty ? <EmptyTableAlert /> : (
                                usersResponseData.content.map((user: UserType, index: number) => (
                                    <Tr key={index}>
                                        <Td><ImageDisplay image={user.avatar} size={ImageSizeEnumType.ROW} /></Td>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.users.path}/${user.id}`}
                                                className="link"
                                                state={user}
                                            >
                                                {user.username}
                                            </Link>
                                        </Td>
                                        <Td>{user.firstName}</Td>
                                        <Td>{user.lastName}</Td>
                                        <Td><EnumBadge data={user.role} role /></Td>
                                        <Td><StatusBadge enabled={user.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(user.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${user.creator?.id}`}
                                                    className="link"
                                                    state={user.creator}
                                                >
                                                    {user.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                    </Tr>
                                ))
                            )
                        )}
                    </Tbody>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Avatar</Th>
                            <Th>Nom d'utilisateur</Th>
                            <Th>Prénom</Th>
                            <Th>Nom</Th>
                            <Th>Role</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!usersResponseData.empty}
                handleNextPage={() => fetchPaginatedUsers(true)}
                handlePreviousPage={() => fetchPaginatedUsers(false)}
                currentPage={usersResponseData.number + 1}
                pages={usersResponseData.totalPages}
                totalElements={usersResponseData.totalElements}
                currentPageElements={usersResponseData.numberOfElements}
            />
        </Stack>
    );
};

interface UsersTableListProps {
    showCreator?: boolean;
    fetchUsers?: boolean;
    children: ReactNode;
    usersBaseUrl: string;
}

export default UsersTableList;