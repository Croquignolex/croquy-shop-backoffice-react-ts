import React, {FC, ReactElement, ReactNode} from "react";
import {Badge, Box, HStack, Spacer, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

import EmptyTableAlert from "../../alert/EmptyTableAlert";
import StatusBadge from "../../StatusBadge";
import Pagination from "../../Pagination";
import ConfirmAlertDialog from "../../ConfirmAlertDialog";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import ExternalLink from "../../ExternalLink";
import TableSkeletonLoader from "../../skeletonLoader/TableSkeletonLoader";
import DoubleActionButton from "../../form/DoubleActionButton";
import {StateType} from "../../../pages/states/show/showStateData";
import useStatesTableListHook from "./useStatesTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import {StatesTableListHookType} from "../../tableList/states/statesTableListData";
import SearchField from "../../form/SearchField";

const StatesTableList: FC<StatesTableListProps> = ({showCountry = false, showCreator = false, fetchStates = false, statesBaseUrl, children}): ReactElement => {
    const {
        statesResponseData, isStatesPending, statesAlertData, fetchPaginatedStates, fetchPaginatedNeedleStates, onDeleteModalClose,
        selectedState, showDeleteModal, isDeleteModalOpen, deleteStateAlertData, isDeleteStatePending,  handleDeleteState,
    }: StatesTableListHookType = useStatesTableListHook({fetchStates, statesBaseUrl});

    return (
        <Stack>
            <CustomAlert data={statesAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleStates(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Statut</Th>
                            {showCountry && <Th>Pays</Th>}
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isStatesPending ? <TableSkeletonLoader /> : (
                            statesResponseData.empty ? <EmptyTableAlert /> : (
                                statesResponseData.content.map((state: StateType, index: number) => (
                                    <Tr key={index}>
                                        <Td>
                                            <ExternalLink
                                                state={state}
                                                label={state.name}
                                                path={`${mainRoutes.states.path}/${state.id}`}
                                            />
                                        </Td>
                                        <Td><StatusBadge enabled={state.enabled}/></Td>
                                        {showCountry && (
                                            <Td>
                                                <ExternalLink
                                                    state={state.country}
                                                    label={state.country?.name}
                                                    path={`${mainRoutes.countries.path}/${state.country?.id}`}
                                                />
                                            </Td>
                                        )}
                                        <Td><Badge rounded="md">{stringDateFormat(state.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <ExternalLink
                                                    state={state.creator}
                                                    label={state.creator?.username}
                                                    path={`${mainRoutes.users.path}/${state.creator?.id}`}
                                                />
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={state}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.states.path}/${state.id}/edit`}
                                            />
                                        </Td>
                                    </Tr>
                                ))
                            )
                        )}
                    </Tbody>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Statut</Th>
                            {showCountry && <Th>Pays</Th>}
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!statesResponseData.empty}
                handleNextPage={() => fetchPaginatedStates(true)}
                handlePreviousPage={() => fetchPaginatedStates(false)}
                currentPage={statesResponseData.number + 1}
                pages={statesResponseData.totalPages}
                totalElements={statesResponseData.totalElements}
                currentPageElements={statesResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteState}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteStatePending}
                alertData={deleteStateAlertData}
            >
                Supprimer la ville <strong>{selectedState.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface StatesTableListProps {
    showCountry?: boolean;
    showCreator?: boolean;
    fetchStates?: boolean;
    children: ReactNode;
    statesBaseUrl: string;
}

export default StatesTableList;