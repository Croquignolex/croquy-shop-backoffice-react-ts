import React, {ReactElement} from "react";
import {
    Box,
    Stack,
    Table,
    Tbody,
    ButtonGroup,
    SimpleGrid,
    Badge,
    HStack,
    Grid,
    GridItem,
    Tabs,
    TabList, Tab, TabPanels, TabPanel
} from "@chakra-ui/react";

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
import RowImage from "../../../components/RowImage";
import {FiEdit, FiTrash} from "react-icons/fi";

const ShowCountryPage = (): ReactElement => {
    const {
        isCountryPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,
        handleDeleteCountry, countryAlertData, countryResponseData, handleToggleCountry, isToggleCountryPending, toggleCountryAlertData,
        isToggleModalOpen, onToggleModalClose, showToggleModal
    }: ShowCountryHookType = useShowCountryHook();

    return (
        <>
            <PageHeader
                title={`Détail pays ${countryResponseData.name}`}
                items={[{path: mainRoutes.countries.path, label: 'Pays'}]}
            />
            <Stack>
                <DisplayAlert data={countryAlertData} />

                <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2, 1fr)' gap={2}>
                    <GridItem>
                        <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>

                        </Stack>
                    </GridItem>
                    <GridItem colSpan={2}>
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
                                    <ListSkeletonLoader isLoading={isCountryPending} label={"Indice"}>{countryResponseData.phoneCode}</ListSkeletonLoader>
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
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                            <Tabs colorScheme='orange' isFitted >
                                <TabList>
                                    <Tab>One</Tab>
                                    <Tab>Two</Tab>
                                    <Tab>Three</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <p>one!</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>two!</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>three!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Stack>
                    </GridItem>
                </Grid>
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