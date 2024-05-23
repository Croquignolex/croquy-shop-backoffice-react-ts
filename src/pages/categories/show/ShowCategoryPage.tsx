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

import useShowCategoryHook from "./useShowCategoryHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowCategoryHookType} from "./showCategoryData";
import NotFoundPage from "../../NotFoundPage";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import ShowImage from "../../../components/showImage/ShowImage";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";
import SeoTable from "../../../components/SeoTable";

const ShowCategoryPage = (): ReactElement => {
    const {
        isCategoryPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCategoryAlertData,
        isDeleteCategoryPending,
        handleDeleteCategory,
        categoryAlertData,
        categoryResponseData,
        handleToggleCategory,
        isToggleCategoryPending,
        toggleCategoryAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleLogoUpdate,
        handleBannerUpdate
    }: ShowCategoryHookType = useShowCategoryHook();

    const logoBaseUrl: string = joinBaseUrlWithParams(categoriesApiURI.logo, [{param: "id", value: categoryResponseData.id}]);
    const bannerBaseUrl: string = joinBaseUrlWithParams(categoriesApiURI.banner, [{param: "id", value: categoryResponseData.id}]);

    return (
        <>
            <PageHeader
                title={`Détail catégorie ${categoryResponseData.name}`}
                items={[{path: mainRoutes.categories.path, label: 'Catégories'}]}
            />
            <Stack>
                <CustomAlert data={categoryAlertData} />
                {categoryAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!categoryAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isCategoryPending}
                                                    showStatus={!isCategoryPending}
                                                    state={categoryResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.categories.path}/${categoryResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Nom"}>{categoryResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Slug"}>{categoryResponseData.slug}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Status"}><StatusBadge enabled={categoryResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Groupe"}>
                                                        <Link
                                                            to={`${mainRoutes.groups.path}/${categoryResponseData.group?.id}`}
                                                            className="link"
                                                            state={categoryResponseData.group}
                                                        >
                                                            {categoryResponseData.group?.name}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${categoryResponseData.creator?.id}`}
                                                            className="link"
                                                            state={categoryResponseData.creator}
                                                        >
                                                            {categoryResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(categoryResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(categoryResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isCategoryPending} label={"Description"}>{categoryResponseData.description}</ListSkeletonLoader>
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
                                            imageSize={ImageSizeEnumType.small}
                                            isLoading={isCategoryPending}
                                            image={categoryResponseData.logo}
                                            imageBaseUrl={logoBaseUrl}
                                            handleImageUpdate={handleLogoUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>SEO</strong>
                                        <SeoTable isLoading={isCategoryPending} data={categoryResponseData} />
                                    </>
                                </Stack>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Bannière</strong>
                                        <ShowImage
                                            imageSize={ImageSizeEnumType.large}
                                            id={"upload-banner"}
                                            isLoading={isCategoryPending}
                                            image={categoryResponseData.banner}
                                            imageBaseUrl={bannerBaseUrl}
                                            handleImageUpdate={handleBannerUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteCategory}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteCategoryPending}
                            alertData={deleteCategoryAlertData}
                        >
                            Supprimer la catégorie <strong>{categoryResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={categoryResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleCategory}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleCategoryPending}
                            alertData={toggleCategoryAlertData}
                            title={categoryResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {categoryResponseData.enabled ? "Désactiver" : "Activer"} la catégorie <strong>{categoryResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowCategoryPage;