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

import useShowGroupHook from "./useShowGroupHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowGroupHookType} from "./showGroupData";
import NotFoundPage from "../../NotFoundPage";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import ShowImage from "../../../components/showImage/ShowImage";

const ShowGroupPage = (): ReactElement => {
    const {
        isGroupPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteGroupAlertData,
        isDeleteGroupPending,
        handleDeleteGroup,
        groupAlertData,
        groupResponseData,
        handleToggleGroup,
        isToggleGroupPending,
        toggleGroupAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleLogoUpdate,
        handleBannerUpdate
    }: ShowGroupHookType = useShowGroupHook();

    const logoBaseUrl: string = joinBaseUrlWithParams(groupsApiURI.logo, [{param: "id", value: groupResponseData.id}]);
    const bannerBaseUrl: string = joinBaseUrlWithParams(groupsApiURI.banner, [{param: "id", value: groupResponseData.id}]);

    return (
        <>
            <PageHeader
                title={`Détail groupe ${groupResponseData.name}`}
                items={[{path: mainRoutes.groups.path, label: 'Groupes'}]}
            />
            <Stack>
                <CustomAlert data={groupAlertData} />
                {groupAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"} spacing={2}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!groupAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isGroupPending}
                                                    showStatus={!isGroupPending}
                                                    state={groupResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.groups.path}/${groupResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Nom"}>{groupResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Slug"}>{groupResponseData.slug}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Titre SEO"}>{groupResponseData.seoTitle}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Description SEO"}>{groupResponseData.seoDescription}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Status"}><StatusBadge enabled={groupResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${groupResponseData.creator?.id}`}
                                                            className="link"
                                                            state={groupResponseData.creator}
                                                        >
                                                            {groupResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(groupResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(groupResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isGroupPending} label={"Description"}>{groupResponseData.description}</ListSkeletonLoader>
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
                                            isLoading={isGroupPending}
                                            image={groupResponseData.logo}
                                            imageBaseUrl={logoBaseUrl}
                                            handleImageUpdate={handleLogoUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Bannière</strong>
                                        <ShowImage
                                            id={"upload-banner"}
                                            isLoading={isGroupPending}
                                            image={groupResponseData.banner}
                                            imageBaseUrl={bannerBaseUrl}
                                            handleImageUpdate={handleBannerUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteGroup}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteGroupPending}
                            alertData={deleteGroupAlertData}
                        >
                            Supprimer le groupe <strong>{groupResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={groupResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleGroup}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleGroupPending}
                            alertData={toggleGroupAlertData}
                            title={groupResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {groupResponseData.enabled ? "Désactiver" : "Activer"} le groupe <strong>{groupResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowGroupPage;