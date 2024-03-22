import React, {ReactElement} from "react";
import {FiEdit, FiTrash} from "react-icons/fi";
import {TableContainer, Table, Thead, Tr, Th, Tbody, Td, Stack, Button, ButtonGroup } from "@chakra-ui/react";

import useShopsHook from "./useShopsHook";
import useDeleteShopHook from "./useDeleteShopHook";
import {DeleteShopHookType, ShopsHookType, ShopType} from "./shopsData";
import ListHeader from "../../components/ListHeader";
import EmptyTableAlert from "../../components/EmptyTableAlert";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import DeleteAlertDialog from "../../components/DeleteAlertDialog";
import {stringDateFormat} from "../../helpers/generalHelpers";
import Loader from "../../components/Loader";
import DisplayAlert from "../../components/DisplayAlert";

const ShopsPage = (): ReactElement => {
    const {
        shopsResponseData, isShopsPending, shopsAlertData, fetchPaginatedShops, fetchPaginatedNeedleShops,
        selectedShop, showDeleteModal, isDeleteModalOpen, closeModal
    }: ShopsHookType = useShopsHook();
    const {
        isDeleteShopPending, deleteShopAlertData, handleDeleteShop
    }: DeleteShopHookType = useDeleteShopHook({selectedShop, closeModal});

    return (
        <>
            <Stack>
                <Loader isLoading={isShopsPending} />
                <DisplayAlert data={shopsAlertData} />
                <DisplayAlert data={deleteShopAlertData} />
                <ListHeader
                    empty={shopsResponseData.empty}
                    handleAddItem={() => {}}
                    handleSearch={(needle: string) => fetchPaginatedNeedleShops(needle)}
                />
                <TableContainer boxShadow="md" borderRadius="md">
                    <Table size={"sm"}>
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Statut</Th>
                                <Th>Créer le</Th>
                                <Th>Créer par</Th>
                                <Th textAlign={'right'}>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {shopsResponseData.empty ? <EmptyTableAlert /> : (
                                shopsResponseData.content.map((shop: ShopType, index: number) => (
                                    <Tr key={index}>
                                        <Td>{shop.name}</Td>
                                        <Td><StatusBadge enabled={shop.enabled}/></Td>
                                        <Td>{stringDateFormat(shop.createdAt)}</Td>
                                        <Td>{shop.creator?.username}</Td>
                                        <Td textAlign={'right'}>
                                            <ButtonGroup>
                                                <Button
                                                    fontWeight="none"
                                                    colorScheme={"yellow"}
                                                    leftIcon={<FiEdit />}
                                                    size={"sm"}
                                                    onClick={() => {}}
                                                >
                                                    Modifier
                                                </Button>
                                                <Button
                                                    fontWeight="none"
                                                    colorScheme={"red"}
                                                    size={"sm"}
                                                    leftIcon={<FiTrash />}
                                                    onClick={() => {showDeleteModal(shop)}}
                                                >
                                                    Supprimer
                                                </Button>
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                ))
                            )}
                        </Tbody>
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Statut</Th>
                                <Th>Créer le</Th>
                                <Th>Créer par</Th>
                                <Th textAlign={'right'}>Actions</Th>
                            </Tr>
                        </Thead>
                    </Table>
                </TableContainer>
                <Pagination
                    show={!shopsResponseData.empty}
                    handleNextPage={() => fetchPaginatedShops(true)}
                    handlePreviousPage={() => fetchPaginatedShops(false)}
                    currentPage={shopsResponseData.number + 1}
                    pages={shopsResponseData.totalPages}
                    totalElements={shopsResponseData.totalElements}
                    currentPageElements={shopsResponseData.numberOfElements}
                />
                <DeleteAlertDialog
                    handleDelete={handleDeleteShop}
                    isOpen={isDeleteModalOpen}
                    onClose={() => closeModal()}
                    isLoading={isDeleteShopPending}
                >
                    Supprimer la boutique <strong>{selectedShop.name}</strong>?
                </DeleteAlertDialog>
            </Stack>
        </>
    );
};

export default ShopsPage;