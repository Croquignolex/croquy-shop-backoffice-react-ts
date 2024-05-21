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
import useVendorsTableListHook from "./useVendorsTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {VendorType} from "../../../pages/vendors/show/showVendorData";
import {VendorsTableListHookType} from "./vendorsTableListData";
import ImageDisplay from "../../ImageDisplay";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";

const VendorsTableList: FC<VendorsTableListProps> = ({showCreator = false, fetchVendors = false, vendorsBaseUrl, children}): ReactElement => {
    const {
        vendorsResponseData,
        isVendorsPending,
        vendorsAlertData,
        fetchPaginatedVendors,
        fetchPaginatedNeedleVendors,
        onDeleteModalClose,
        selectedVendor,
        showDeleteModal,
        isDeleteModalOpen,
        deleteVendorAlertData,
        isDeleteVendorPending,
        handleDeleteVendor,
    }: VendorsTableListHookType = useVendorsTableListHook({fetchVendors, vendorsBaseUrl});

    return (
        <Stack>
            <CustomAlert data={vendorsAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleVendors(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Nom</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isVendorsPending ? <TableSkeletonLoader /> : (
                            vendorsResponseData.empty ? <EmptyTableAlert /> : (
                                vendorsResponseData.content.map((vendor: VendorType, index: number) => (
                                    <Tr key={index}>
                                        <Td><ImageDisplay image={vendor.logo} size={ImageSizeEnumType.row} /></Td>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.vendors.path}/${vendor.id}`}
                                                className="link"
                                                state={vendor}
                                            >
                                                {vendor.name}
                                            </Link>
                                        </Td>
                                        <Td><StatusBadge enabled={vendor.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(vendor.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${vendor.creator?.id}`}
                                                    className="link"
                                                    state={vendor.creator}
                                                >
                                                    {vendor.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={vendor}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.vendors.path}/${vendor.id}/edit`}
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
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!vendorsResponseData.empty}
                handleNextPage={() => fetchPaginatedVendors(true)}
                handlePreviousPage={() => fetchPaginatedVendors(false)}
                currentPage={vendorsResponseData.number + 1}
                pages={vendorsResponseData.totalPages}
                totalElements={vendorsResponseData.totalElements}
                currentPageElements={vendorsResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteVendor}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteVendorPending}
                alertData={deleteVendorAlertData}
            >
                Supprimer le fournisseur <strong>{selectedVendor.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface VendorsTableListProps {
    showCreator?: boolean;
    fetchVendors?: boolean;
    children: ReactNode;
    vendorsBaseUrl: string;
}

export default VendorsTableList;