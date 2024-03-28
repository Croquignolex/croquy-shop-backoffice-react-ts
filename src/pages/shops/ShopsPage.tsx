import React, {ReactElement} from "react";
import {FiEdit, FiTrash} from "react-icons/fi";
import {TableContainer, Table, Thead, Tr, Th, Tbody, Td, Stack, Button, ButtonGroup} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import useShopsHook from "./useShopsHook";
import {ShopsHookType, ShopType} from "./shopsData";
import ListHeader from "../../components/ListHeader";
import EmptyTableAlert from "../../components/EmptyTableAlert";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import DeleteAlertDialog from "../../components/DeleteAlertDialog";
import {stringDateFormat} from "../../helpers/generalHelpers";
import Loader from "../../components/Loader";
import DisplayAlert from "../../components/DisplayAlert";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";

const ShopsPage = (): ReactElement => {
    const {
        shopsResponseData, isShopsPending, shopsAlertData, fetchPaginatedShops, fetchPaginatedNeedleShops, onDeleteModalClose,
        selectedShop, showDeleteModal, isDeleteModalOpen, deleteShopAlertData, isDeleteShopPending,  handleDeleteShop,
    }: ShopsHookType = useShopsHook();

    return (
        <>
            <PageHeader title={"Boutiques"} />
            <Stack>
                <Loader isLoading={isShopsPending} />
                <DisplayAlert data={shopsAlertData} />
                <ListHeader
                    label={"Nouvelle boutique"}
                    addItemPath={mainRoutes.addShop.path}
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
                                                    as={Link}
                                                    to={`${mainRoutes.shops.path}/${shop.id}/edit`}
                                                    state={shop}
                                                >
                                                    Modifier
                                                </Button>
                                                <Button
                                                    fontWeight="none"
                                                    colorScheme={"red"}
                                                    size={"sm"}
                                                    leftIcon={<FiTrash />}
                                                    onClick={(): void => showDeleteModal(shop)}
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
                    onClose={onDeleteModalClose}
                    isLoading={isDeleteShopPending}
                    deleteAlertData={deleteShopAlertData}
                >
                    Supprimer la boutique <strong>{selectedShop.name}</strong>?
                </DeleteAlertDialog>
            </Stack>
        </>
    );
};

export default ShopsPage;