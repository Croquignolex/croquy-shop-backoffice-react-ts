import React, {ReactElement} from "react";
import {Box, Stack, Table, Tbody, ButtonGroup, SimpleGrid, Badge} from "@chakra-ui/react";

import useShowShopHook from "./useShowShopHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import DisplayAlert from "../../../components/DisplayAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {ShowShopHookType} from "./showStateData";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import ExternalLink from "../../../components/ExternalLink";
import DefaultAddress from "../../../components/defaultAddress/DefaultAddress";

const ShowShopPage = (): ReactElement => {
    const {
        isShopPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteShopAlertData, isDeleteShopPending,
        handleDeleteShop, shopAlertData, shopResponseData, handleToggleShop, isToggleShopPending, toggleShopAlertData,
        isToggleModalOpen, onToggleModalClose, showToggleModal
    }: ShowShopHookType = useShowShopHook();

    return (
        <>
            <PageHeader
                title={`Détail boutique ${shopResponseData.name}`}
                items={[{path: mainRoutes.shops.path, label: 'Boutiques'}]}
            />
            <Stack>
                <DisplayAlert data={shopAlertData} />

                <SimpleGrid columns={{lg: 2, sm: 1}} spacing={2}>
                    <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                        <ButtonGroup>
                            <DoubleActionButton
                                showStatus
                                state={shopResponseData}
                                showDeleteModal={showDeleteModal}
                                showToggleModal={showToggleModal}
                                edithPath={`${mainRoutes.shops.path}/${shopResponseData.id}/edit`}
                            />
                        </ButtonGroup>
                        <Table size={"sm"}>
                            <Tbody>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Nom"}>{shopResponseData.name}</ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Slug"}>{shopResponseData.slug}</ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Status"}><StatusBadge enabled={shopResponseData.enabled}/></ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Créer par"}>
                                    <ExternalLink
                                        state={shopResponseData.creator}
                                        label={shopResponseData.creator?.username}
                                        path={`${mainRoutes.users.path}/${shopResponseData.creator?.id}`}
                                    />
                                </ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Créer le"}>
                                    <Badge rounded="md">{stringDateFormat(shopResponseData.createdAt, true)}</Badge>
                                </ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Modifié le"}>
                                    <Badge rounded="md">{stringDateFormat(shopResponseData.updatedAt, true)}</Badge>
                                </ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isShopPending} label={"Description"}>{shopResponseData.description}</ListSkeletonLoader>
                            </Tbody>
                        </Table>
                    </Stack>
                    <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                        <DefaultAddress url={""} />
                    </Stack>
                </SimpleGrid>
                <ConfirmAlertDialog
                    handleConfirm={handleDeleteShop}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                    isLoading={isDeleteShopPending}
                    alertData={deleteShopAlertData}
                >
                    Supprimer la boutique <strong>{shopResponseData.name}</strong>?
                </ConfirmAlertDialog>
                <ConfirmAlertDialog
                    colorScheme={shopResponseData.enabled ? "orange" : "green"}
                    handleConfirm={handleToggleShop}
                    isOpen={isToggleModalOpen}
                    onClose={onToggleModalClose}
                    isLoading={isToggleShopPending}
                    alertData={toggleShopAlertData}
                    title={shopResponseData.enabled ? "Désactivation" : "Activation"}
                >
                    {shopResponseData.enabled ? "Désactiver" : "Activer"} la boutique <strong>{shopResponseData.name}</strong>?
                </ConfirmAlertDialog>
            </Stack>
        </>
    );
};

export default ShowShopPage;