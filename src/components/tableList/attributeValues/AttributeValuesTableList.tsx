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
import useAttributeValuesTableListHook from "./useAttributeValuesTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {AttributeValueType} from "../../../pages/attributeValues/show/showAttributeValueData";
import {AttributeValuesTableListHookType} from "./attributeValuesTableListData";

const AttributeValuesTableList: FC<AttributeValuesTableListProps> = ({showCreator = false, fetchAttributeValues = false, attributeValuesBaseUrl, children}): ReactElement => {
    const {
        attributeValuesResponseData,
        isAttributeValuesPending,
        attributeValuesAlertData,
        fetchPaginatedAttributeValues,
        fetchPaginatedNeedleAttributeValues,
        onDeleteModalClose,
        selectedAttributeValue,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeValueAlertData,
        isDeleteAttributeValuePending,
        handleDeleteAttributeValue,
    }: AttributeValuesTableListHookType = useAttributeValuesTableListHook({fetchAttributeValues, attributeValuesBaseUrl});

    return (
        <Stack>
            <CustomAlert data={attributeValuesAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleAttributeValues(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Valeur</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isAttributeValuesPending ? <TableSkeletonLoader /> : (
                            attributeValuesResponseData.empty ? <EmptyTableAlert /> : (
                                attributeValuesResponseData.content.map((attributeValue: AttributeValueType, index: number) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.attributeValues.path}/${attributeValue.id}`}
                                                className="link"
                                                state={attributeValue}
                                            >
                                                {attributeValue.name}
                                            </Link>
                                        </Td>
                                        <Td>{attributeValue.value}</Td>
                                        <Td><StatusBadge enabled={attributeValue.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(attributeValue.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${attributeValue.creator?.id}`}
                                                    className="link"
                                                    state={attributeValue.creator}
                                                >
                                                    {attributeValue.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={attributeValue}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.attributeValues.path}/${attributeValue.id}/edit`}
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
                            <Th>Valeur</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!attributeValuesResponseData.empty}
                handleNextPage={() => fetchPaginatedAttributeValues(true)}
                handlePreviousPage={() => fetchPaginatedAttributeValues(false)}
                currentPage={attributeValuesResponseData.number + 1}
                pages={attributeValuesResponseData.totalPages}
                totalElements={attributeValuesResponseData.totalElements}
                currentPageElements={attributeValuesResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteAttributeValue}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteAttributeValuePending}
                alertData={deleteAttributeValueAlertData}
            >
                Supprimer la valeur d'attribut <strong>{selectedAttributeValue.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface AttributeValuesTableListProps {
    showCreator?: boolean;
    fetchAttributeValues?: boolean;
    children: ReactNode;
    attributeValuesBaseUrl: string;
}

export default AttributeValuesTableList;