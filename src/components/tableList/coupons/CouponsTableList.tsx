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
import useCouponsTableListHook from "./useCouponsTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {CouponType} from "../../../pages/coupons/show/showCouponData";
import {CouponsTableListHookType} from "./couponsTableListData";

const CouponsTableList: FC<CouponsTableListProps> = ({showCreator = false, fetchCoupons = false, couponsBaseUrl, children}): ReactElement => {
    const {
        couponsResponseData,
        isCouponsPending,
        couponsAlertData,
        fetchPaginatedCoupons,
        fetchPaginatedNeedleCoupons,
        onDeleteModalClose,
        selectedCoupon,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCouponAlertData,
        isDeleteCouponPending,
        handleDeleteCoupon,
    }: CouponsTableListHookType = useCouponsTableListHook({fetchCoupons, couponsBaseUrl});

    return (
        <Stack>
            <CustomAlert data={couponsAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleCoupons(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Code</Th>
                            <Th>Reduction</Th>
                            <Th>Utilisation</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isCouponsPending ? <TableSkeletonLoader /> : (
                            couponsResponseData.empty ? <EmptyTableAlert /> : (
                                couponsResponseData.content.map((coupon: CouponType, index: number) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.coupons.path}/${coupon.id}`}
                                                className="link"
                                                state={coupon}
                                            >
                                                {coupon.code}
                                            </Link>
                                        </Td>
                                        <Td>{coupon.discount}%</Td>
                                        <Td>{coupon.totalUse}</Td>
                                        <Td><StatusBadge enabled={coupon.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(coupon.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${coupon.creator?.id}`}
                                                    className="link"
                                                    state={coupon.creator}
                                                >
                                                    {coupon.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={coupon}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.coupons.path}/${coupon.id}/edit`}
                                            />
                                        </Td>
                                    </Tr>
                                ))
                            )
                        )}
                    </Tbody>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Code</Th>
                            <Th>Reduction</Th>
                            <Th>Utilisation</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            {/*<Pagination
                show={!couponsResponseData.empty}
                handleNextPage={() => fetchPaginatedCoupons(true)}
                handlePreviousPage={() => fetchPaginatedCoupons(false)}
                currentPage={couponsResponseData.number + 1}
                pages={couponsResponseData.totalPages}
                totalElements={couponsResponseData.totalElements}
                currentPageElements={couponsResponseData.numberOfElements}
            />*/}
            <ConfirmAlertDialog
                handleConfirm={handleDeleteCoupon}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteCouponPending}
                alertData={deleteCouponAlertData}
            >
                Supprimer le coupon <strong>{selectedCoupon.code}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface CouponsTableListProps {
    showCreator?: boolean;
    fetchCoupons?: boolean;
    children: ReactNode;
    couponsBaseUrl: string;
}

export default CouponsTableList;