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

import useShowVendorHook from "./useShowVendorHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowVendorHookType} from "./showVendorData";
import NotFoundPage from "../../NotFoundPage";
import ShowAddress from "../../../components/showAddress/ShowAddress";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import ShowImage from "../../../components/showImage/ShowImage";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";

const ShowVendorPage = (): ReactElement => {
    const {
        isVendorPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteVendorAlertData,
        isDeleteVendorPending,
        handleDeleteVendor,
        vendorAlertData,
        vendorResponseData,
        handleToggleVendor,
        isToggleVendorPending,
        toggleVendorAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleAddressUpdate,
        handleLogoUpdate
    }: ShowVendorHookType = useShowVendorHook();

    const addressBaseUrl: string = joinBaseUrlWithParams(vendorsApiURI.address, [{param: "id", value: vendorResponseData.id}]);
    const logoBaseUrl: string = joinBaseUrlWithParams(vendorsApiURI.logo, [{param: "id", value: vendorResponseData.id}]);

    return (
        <>
            <PageHeader
                title={`Détail fournisseur ${vendorResponseData.name}`}
                items={[{path: mainRoutes.vendors.path, label: 'Fournisseurs'}]}
            />
            <Stack>
                <CustomAlert data={vendorAlertData} />
                {vendorAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!vendorAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isVendorPending}
                                                    showStatus={!isVendorPending}
                                                    state={vendorResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.vendors.path}/${vendorResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isVendorPending} label={"Nom"}>{vendorResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isVendorPending} label={"Status"}><StatusBadge enabled={vendorResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isVendorPending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${vendorResponseData.creator?.id}`}
                                                            className="link"
                                                            state={vendorResponseData.creator}
                                                        >
                                                            {vendorResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isVendorPending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(vendorResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isVendorPending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(vendorResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isVendorPending} label={"Description"}>{vendorResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Logo</strong>
                                        <ShowImage
                                            id={"upload-logo"}
                                            imageSize={ImageSizeEnumType.SMALL}
                                            isLoading={isVendorPending}
                                            image={vendorResponseData.logo}
                                            imageBaseUrl={logoBaseUrl}
                                            handleImageUpdate={handleLogoUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <strong>Addresse</strong>
                                    <ShowAddress
                                        isLoading={isVendorPending}
                                        address={vendorResponseData.address}
                                        addressBaseUrl={addressBaseUrl}
                                        handleAddressUpdate={handleAddressUpdate}
                                    />
                                </Stack>
                            </Box>
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteVendor}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteVendorPending}
                            alertData={deleteVendorAlertData}
                        >
                            Supprimer le fournisseur <strong>{vendorResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={vendorResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleVendor}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleVendorPending}
                            alertData={toggleVendorAlertData}
                            title={vendorResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {vendorResponseData.enabled ? "Désactiver" : "Activer"} le fournisseur <strong>{vendorResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowVendorPage;