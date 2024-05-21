import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Box, Stack, Table, Tbody, ButtonGroup, Badge, SimpleGrid} from "@chakra-ui/react";

import useShowCouponHook from "./useShowCouponHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowCouponHookType} from "./showCouponData";
import NotFoundPage from "../../NotFoundPage";

const ShowCouponPage = (): ReactElement => {
    const {
        isCouponPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCouponAlertData,
        isDeleteCouponPending,
        handleDeleteCoupon,
        couponAlertData,
        couponResponseData,
        handleToggleCoupon,
        isToggleCouponPending,
        toggleCouponAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    }: ShowCouponHookType = useShowCouponHook();

    return (
        <>
            <PageHeader
                title={`Détail coupon ${couponResponseData.code}`}
                items={[{path: mainRoutes.coupons.path, label: 'Coupons'}]}
            />
            <Stack>
                <CustomAlert data={couponAlertData} />
                {couponAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"} spacing={2}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!couponAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isCouponPending}
                                                    showStatus={!isCouponPending}
                                                    state={couponResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.coupons.path}/${couponResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"code"}>{couponResponseData.code}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Reduction"}>{couponResponseData.discount}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Utilisation max"}>{couponResponseData.totalUse}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Utilisation restante"}>XXXXX</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Status"}><StatusBadge enabled={couponResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${couponResponseData.creator?.id}`}
                                                            className="link"
                                                            state={couponResponseData.creator}
                                                        >
                                                            {couponResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(couponResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(couponResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCouponPending} label={"Description"}>{couponResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box />
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteCoupon}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteCouponPending}
                            alertData={deleteCouponAlertData}
                        >
                            Supprimer le coupon <strong>{couponResponseData.code}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={couponResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleCoupon}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleCouponPending}
                            alertData={toggleCouponAlertData}
                            title={couponResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {couponResponseData.enabled ? "Désactiver" : "Activer"} le coupon <strong>{couponResponseData.code}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowCouponPage;