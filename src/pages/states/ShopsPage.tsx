import React, {ReactElement} from "react";
import {TableContainer, Table, Thead, Tr, Th, Tbody, Td, Stack, Badge} from "@chakra-ui/react";

import useShopsHook from "./useShopsHook";
import ListHeader from "../../components/ListHeader";
import EmptyTableAlert from "../../components/EmptyTableAlert";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import ConfirmAlertDialog from "../../components/ConfirmAlertDialog";
import {stringDateFormat} from "../../helpers/generalHelpers";
import DisplayAlert from "../../components/DisplayAlert";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import ExternalLink from "../../components/ExternalLink";
import TableSkeletonLoader from "../../components/TableSkeletonLoader";
import DoubleActionButton from "../../components/form/DoubleActionButton";
import {ShopsHookType} from "../shops/shopsData";
import {ShopType} from "../shops/show/showShopData";

const ShopsPage = (): ReactElement => {
    const {
        shopsResponseData, isShopsPending, shopsAlertData, fetchPaginatedShops, fetchPaginatedNeedleShops, onDeleteModalClose,
        selectedShop, showDeleteModal, isDeleteModalOpen, deleteShopAlertData, isDeleteShopPending,  handleDeleteShop,
    }: ShopsHookType = useShopsHook();

    return (
        <>
            <PageHeader title={"Boutiques"} />
            <Stack>
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
                            {isShopsPending ? <TableSkeletonLoader /> : (
                                shopsResponseData.empty ? <EmptyTableAlert /> : (
                                    shopsResponseData.content.map((shop: ShopType, index: number) => (
                                        <Tr key={index}>
                                            <Td>
                                                <ExternalLink
                                                    state={shop}
                                                    label={shop.name}
                                                    path={`${mainRoutes.shops.path}/${shop.id}`}
                                                />
                                            </Td>
                                            <Td><StatusBadge enabled={shop.enabled}/></Td>
                                            <Td><Badge rounded="md">{stringDateFormat(shop.createdAt)}</Badge></Td>
                                            <Td>
                                                <ExternalLink
                                                    state={shop.creator}
                                                    label={shop.creator?.username}
                                                    path={`${mainRoutes.users.path}/${shop.creator?.id}`}
                                                />
                                            </Td>
                                            <Td textAlign={'right'}>
                                                <DoubleActionButton
                                                    isListView
                                                    state={shop}
                                                    showDeleteModal={showDeleteModal}
                                                    edithPath={`${mainRoutes.shops.path}/${shop.id}/edit`}
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
                <ConfirmAlertDialog
                    handleConfirm={handleDeleteShop}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                    isLoading={isDeleteShopPending}
                    alertData={deleteShopAlertData}
                >
                    Supprimer la boutique <strong>{selectedShop.name}</strong>?
                </ConfirmAlertDialog>
            </Stack>
        </>
    );
};

export default ShopsPage;