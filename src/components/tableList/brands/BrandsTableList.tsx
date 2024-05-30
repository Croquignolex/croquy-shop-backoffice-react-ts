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
import useBrandsTableListHook from "./useBrandsTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {BrandType} from "../../../pages/brands/show/showBrandData";
import {BrandsTableListHookType} from "./brandsTableListData";
import ImageDisplay from "../../ImageDisplay";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";

const BrandsTableList: FC<BrandsTableListProps> = ({showCreator = false, fetchBrands = false, brandsBaseUrl, children}): ReactElement => {
    const {
        brandsResponseData,
        isBrandsPending,
        brandsAlertData,
        fetchPaginatedBrands,
        fetchPaginatedNeedleBrands,
        onDeleteModalClose,
        selectedBrand,
        showDeleteModal,
        isDeleteModalOpen,
        deleteBrandAlertData,
        isDeleteBrandPending,
        handleDeleteBrand,
    }: BrandsTableListHookType = useBrandsTableListHook({fetchBrands, brandsBaseUrl});

    return (
        <Stack>
            <CustomAlert data={brandsAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleBrands(needle)} />
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
                        {isBrandsPending ? <TableSkeletonLoader /> : (
                            brandsResponseData.empty ? <EmptyTableAlert /> : (
                                brandsResponseData.content.map((brand: BrandType, index: number) => (
                                    <Tr key={index}>
                                        <Td><ImageDisplay image={brand.logo} size={ImageSizeEnumType.ROW} /></Td>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.brands.path}/${brand.id}`}
                                                className="link"
                                                state={brand}
                                            >
                                                {brand.name}
                                            </Link>
                                        </Td>
                                        <Td>{brand.slug}</Td>
                                        <Td><StatusBadge enabled={brand.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(brand.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${brand.creator?.id}`}
                                                    className="link"
                                                    state={brand.creator}
                                                >
                                                    {brand.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={brand}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.brands.path}/${brand.id}/edit`}
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
                show={!brandsResponseData.empty}
                handleNextPage={() => fetchPaginatedBrands(true)}
                handlePreviousPage={() => fetchPaginatedBrands(false)}
                currentPage={brandsResponseData.number + 1}
                pages={brandsResponseData.totalPages}
                totalElements={brandsResponseData.totalElements}
                currentPageElements={brandsResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteBrand}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteBrandPending}
                alertData={deleteBrandAlertData}
            >
                Supprimer la marque <strong>{selectedBrand.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface BrandsTableListProps {
    showCreator?: boolean;
    fetchBrands?: boolean;
    children: ReactNode;
    brandsBaseUrl: string;
}

export default BrandsTableList;