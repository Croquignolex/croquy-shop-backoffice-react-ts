import React, {ReactElement} from "react";
import {Box, Stack, Table, Tbody, ButtonGroup, SimpleGrid, Badge} from "@chakra-ui/react";

import useShowCountryHook from "./useShowCountryHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import DisplayAlert from "../../../components/DisplayAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import ExternalLink from "../../../components/ExternalLink";
import DefaultAddress from "../../../components/defaultAddress/DefaultAddress";
import {ShowCountryHookType} from "./showCountryData";

const ShowCountryPage = (): ReactElement => {
    const {
        isCountryPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,
        handleDeleteCountry, countryAlertData, countryResponseData, handleToggleCountry, isToggleCountryPending, toggleCountryAlertData,
        isToggleModalOpen, onToggleModalClose, showToggleModal
    }: ShowCountryHookType = useShowCountryHook();

    return (
        <>
            <PageHeader
                title={`Détail boutique ${countryResponseData.name}`}
                items={[{path: mainRoutes.countries.path, label: 'Boutiques'}]}
            />
            <Stack>
                <DisplayAlert data={countryAlertData} />

                <SimpleGrid columns={{lg: 2, sm: 1}} spacing={2}>
                    <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                        <ButtonGroup>
                            <DoubleActionButton
                                showStatus
                                state={countryResponseData}
                                showDeleteModal={showDeleteModal}
                                showToggleModal={showToggleModal}
                                edithPath={`${mainRoutes.countries.path}/${countryResponseData.id}/edit`}
                            />
                        </ButtonGroup>
                        <Table size={"sm"}>
                            <Tbody>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Nom"}>{countryResponseData.name}</ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Slug"}>{countryResponseData.phoneCode}</ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Status"}><StatusBadge enabled={countryResponseData.enabled}/></ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Créer par"}>
                                    <ExternalLink
                                        state={countryResponseData.creator}
                                        label={countryResponseData.creator?.username}
                                        path={`${mainRoutes.users.path}/${countryResponseData.creator?.id}`}
                                    />
                                </ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Créer le"}>
                                    <Badge rounded="md">{stringDateFormat(countryResponseData.createdAt, true)}</Badge>
                                </ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Modifié le"}>
                                    <Badge rounded="md">{stringDateFormat(countryResponseData.updatedAt, true)}</Badge>
                                </ListSkeletonLoader>
                                <ListSkeletonLoader isLoading={isCountryPending} label={"Description"}>{countryResponseData.description}</ListSkeletonLoader>
                            </Tbody>
                        </Table>
                    </Stack>
                    <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                        <DefaultAddress url={""} />
                    </Stack>
                </SimpleGrid>
                <ConfirmAlertDialog
                    handleConfirm={handleDeleteCountry}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                    isLoading={isDeleteCountryPending}
                    alertData={deleteCountryAlertData}
                >
                    Supprimer la boutique <strong>{countryResponseData.name}</strong>?
                </ConfirmAlertDialog>
                <ConfirmAlertDialog
                    colorScheme={countryResponseData.enabled ? "orange" : "green"}
                    handleConfirm={handleToggleCountry}
                    isOpen={isToggleModalOpen}
                    onClose={onToggleModalClose}
                    isLoading={isToggleCountryPending}
                    alertData={toggleCountryAlertData}
                    title={countryResponseData.enabled ? "Désactivation" : "Activation"}
                >
                    {countryResponseData.enabled ? "Désactiver" : "Activer"} la boutique <strong>{countryResponseData.name}</strong>?
                </ConfirmAlertDialog>
            </Stack>
        </>
    );
};

export default ShowCountryPage;