import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {
    Box,
    Stack,
    Table,
    Tbody,
    ButtonGroup,
    Badge,
    SimpleGrid,
} from "@chakra-ui/react";

import useShowShopHook from "./useShowShopHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowShopHookType} from "./showShopData";
import NotFoundPage from "../../NotFoundPage";
import ShowAddress from "../../../components/showAddress/ShowAddress";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import {shopsApiURI} from "../../../constants/apiURIConstants";

const ShowShopPage = (): ReactElement => {
    const {
        isShopPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteShopAlertData,
        isDeleteShopPending,
        handleDeleteShop,
        shopAlertData,
        shopResponseData,
        handleToggleShop,
        isToggleShopPending,
        toggleShopAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleAddressUpdate
    }: ShowShopHookType = useShowShopHook();

    const addressBaseUrl: string = joinBaseUrlWithParams(shopsApiURI.address, [{param: "id", value: shopResponseData.id}]);

    return (
        <>
            <PageHeader
                title={`Détail boutique ${shopResponseData.name}`}
                items={[{path: mainRoutes.shops.path, label: 'Boutiques'}]}
            />
            <Stack>
                <CustomAlert data={shopAlertData} />
                {shopAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"} spacing={2}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!shopAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isShopPending}
                                                    showStatus={!isShopPending}
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
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${shopResponseData.creator?.id}`}
                                                            className="link"
                                                            state={shopResponseData.creator}
                                                        >
                                                            {shopResponseData.creator?.username}
                                                        </Link>
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
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <strong>Addresse</strong>
                                    <ShowAddress
                                        isLoading={isShopPending}
                                        address={shopResponseData.address}
                                        addressBaseUrl={addressBaseUrl}
                                        handleAddressUpdate={handleAddressUpdate}
                                    />
                                </Stack>
                            </Box>
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
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowShopPage;