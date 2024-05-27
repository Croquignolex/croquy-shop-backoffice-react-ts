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
import useAttributesTableListHook from "./useAttributesTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {AttributeType} from "../../../pages/attributes/show/showAttributeData";
import {AttributesTableListHookType} from "./attributesTableListData";

const AttributesTableList: FC<AttributesTableListProps> = ({showCreator = false, fetchAttributes = false, attributesBaseUrl, children}): ReactElement => {
    const {
        attributesResponseData,
        isAttributesPending,
        attributesAlertData,
        fetchPaginatedAttributes,
        fetchPaginatedNeedleAttributes,
        onDeleteModalClose,
        selectedAttribute,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeAlertData,
        isDeleteAttributePending,
        handleDeleteAttribute,
    }: AttributesTableListHookType = useAttributesTableListHook({fetchAttributes, attributesBaseUrl});

    return (
        <Stack>
            <CustomAlert data={attributesAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleAttributes(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Type</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isAttributesPending ? <TableSkeletonLoader /> : (
                            attributesResponseData.empty ? <EmptyTableAlert /> : (
                                attributesResponseData.content.map((attribute: AttributeType, index: number) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.attributes.path}/${attribute.id}`}
                                                className="link"
                                                state={attribute}
                                            >
                                                {attribute.name}
                                            </Link>
                                        </Td>
                                        <Td>{attribute.type}</Td>
                                        <Td><StatusBadge enabled={attribute.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(attribute.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${attribute.creator?.id}`}
                                                    className="link"
                                                    state={attribute.creator}
                                                >
                                                    {attribute.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={attribute}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.attributes.path}/${attribute.id}/edit`}
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
                            <Th>Type</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!attributesResponseData.empty}
                handleNextPage={() => fetchPaginatedAttributes(true)}
                handlePreviousPage={() => fetchPaginatedAttributes(false)}
                currentPage={attributesResponseData.number + 1}
                pages={attributesResponseData.totalPages}
                totalElements={attributesResponseData.totalElements}
                currentPageElements={attributesResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteAttribute}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteAttributePending}
                alertData={deleteAttributeAlertData}
            >
                Supprimer l'attribut <strong>{selectedAttribute.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface AttributesTableListProps {
    showCreator?: boolean;
    fetchAttributes?: boolean;
    children: ReactNode;
    attributesBaseUrl: string;
}

export default AttributesTableList;