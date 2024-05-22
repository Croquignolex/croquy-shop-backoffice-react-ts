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

import useShowBrandHook from "./useShowBrandHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowBrandHookType} from "./showBrandData";
import NotFoundPage from "../../NotFoundPage";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import ShowImage from "../../../components/showImage/ShowImage";

const ShowBrandPage = (): ReactElement => {
    const {
        isBrandPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteBrandAlertData,
        isDeleteBrandPending,
        handleDeleteBrand,
        brandAlertData,
        brandResponseData,
        handleToggleBrand,
        isToggleBrandPending,
        toggleBrandAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleLogoUpdate
    }: ShowBrandHookType = useShowBrandHook();

    const logoBaseUrl: string = joinBaseUrlWithParams(brandsApiURI.logo, [{param: "id", value: brandResponseData.id}]);

    return (
        <>
            <PageHeader
                title={`Détail marque ${brandResponseData.name}`}
                items={[{path: mainRoutes.brands.path, label: 'Marques'}]}
            />
            <Stack>
                <CustomAlert data={brandAlertData} />
                {brandAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"} spacing={2}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!brandAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isBrandPending}
                                                    showStatus={!isBrandPending}
                                                    state={brandResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.brands.path}/${brandResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Nom"}>{brandResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Slug"}>{brandResponseData.slug}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Site web"}>{brandResponseData.website}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Titre SEO"}>{brandResponseData.seoTitle}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Description SEO"}>{brandResponseData.seoDescription}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Status"}><StatusBadge enabled={brandResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${brandResponseData.creator?.id}`}
                                                            className="link"
                                                            state={brandResponseData.creator}
                                                        >
                                                            {brandResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(brandResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(brandResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isBrandPending} label={"Description"}>{brandResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Logo</strong>
                                        <ShowImage
                                            id={"upload-logo"}
                                            isLoading={isBrandPending}
                                            image={brandResponseData.logo}
                                            imageBaseUrl={logoBaseUrl}
                                            handleImageUpdate={handleLogoUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteBrand}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteBrandPending}
                            alertData={deleteBrandAlertData}
                        >
                            Supprimer la marque <strong>{brandResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={brandResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleBrand}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleBrandPending}
                            alertData={toggleBrandAlertData}
                            title={brandResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {brandResponseData.enabled ? "Désactiver" : "Activer"} la marque <strong>{brandResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowBrandPage;