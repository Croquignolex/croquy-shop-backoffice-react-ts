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
import useShopsTableListHook from "./useShopsTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {ShopType} from "../../../pages/shops/show/showShopData";
import {ShopsTableListHookType} from "./shopsTableListData";

const ShopsTableList: FC<ShopsTableListProps> = ({showCreator = false, fetchShops = false, shopsBaseUrl, children}): ReactElement => {
    const {
        shopsResponseData,
        isShopsPending,
        shopsAlertData,
        fetchPaginatedShops,
        fetchPaginatedNeedleShops,
        onDeleteModalClose,
        selectedShop,
        showDeleteModal,
        isDeleteModalOpen,
        deleteShopAlertData,
        isDeleteShopPending,
        handleDeleteShop,
    }: ShopsTableListHookType = useShopsTableListHook({fetchShops, shopsBaseUrl});

    return (
        <Stack>
            <CustomAlert data={shopsAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleShops(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Slug</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isShopsPending ? <TableSkeletonLoader /> : (
                            shopsResponseData.empty ? <EmptyTableAlert /> : (
                                shopsResponseData.content.map((shop: ShopType, index: number) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.shops.path}/${shop.id}`}
                                                className="link"
                                                state={shop}
                                            >
                                                {shop.name}
                                            </Link>
                                        </Td>
                                        <Td>{shop.slug}</Td>
                                        <Td><StatusBadge enabled={shop.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(shop.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${shop.creator?.id}`}
                                                    className="link"
                                                    state={shop.creator}
                                                >
                                                    {shop.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
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
                Supprimer le pays <strong>{selectedShop.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface ShopsTableListProps {
    showCreator?: boolean;
    fetchShops?: boolean;
    children: ReactNode;
    shopsBaseUrl: string;
}

export default ShopsTableList;