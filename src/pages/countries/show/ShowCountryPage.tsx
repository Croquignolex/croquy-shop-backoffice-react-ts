import React, {ReactElement} from "react";
import {FiPlusSquare} from "react-icons/fi";
import {Link} from "react-router-dom";
import {
    Box, Stack, Table, Tbody, ButtonGroup, Badge, SimpleGrid,
    Tabs, TabList, Tab, TabPanels, TabPanel, Icon, Button,
} from "@chakra-ui/react";

import useShowCountryHook from "./useShowCountryHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowCountryHookType} from "./showCountryData";
import ShowImage from "../../../components/showImage/ShowImage";
import StatesTableList from "../../../components/tableList/states/StatesTableList";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import { joinBaseUrlWithParams } from "../../../helpers/apiRequestsHelpers";


const ShowCountryPage = (): ReactElement => {
    const {
        isCountryPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,
        handleDeleteCountry, countryAlertData, countryResponseData, handleToggleCountry, isToggleCountryPending, toggleCountryAlertData,
        isToggleModalOpen, onToggleModalClose, showToggleModal, handleTabsChange, handleFlagUpdate
    }: ShowCountryHookType = useShowCountryHook();

    const statesBaseUrl: string = joinBaseUrlWithParams(countriesApiURI.addState, [{param: "id", value: countryResponseData.id}]);
    const flagBaseUrl: string = joinBaseUrlWithParams(countriesApiURI.flag, [{param: "id", value: countryResponseData.id}]);

    return (
        <>
            <PageHeader
                title={`Détail pays ${countryResponseData.name}`}
                items={[{path: mainRoutes.countries.path, label: 'Pays'}]}
            />
            <Stack>
                <CustomAlert data={countryAlertData} />

                <SimpleGrid minChildWidth={"sm"} spacing={2}>
                    <Box>
                        <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                            <strong>Drapeau</strong>
                            <ShowImage
                                isLoading={isCountryPending}
                                image={countryResponseData.flag}
                                imageBaseUrl={flagBaseUrl}
                                handleImageUpdate={handleFlagUpdate}
                            />
                        </Stack>
                    </Box>
                    <Box>
                        <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                            <ButtonGroup>
                                <DoubleActionButton
                                    showStatus={!isCountryPending}
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
                                        <Link
                                            to={`${mainRoutes.users.path}/${countryResponseData.creator?.id}`}
                                            className="link"
                                            state={countryResponseData.creator}
                                        >
                                            {countryResponseData.creator?.username}
                                        </Link>
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
                    </Box>
                </SimpleGrid>
                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                    <Tabs colorScheme='green' isFitted onChange={handleTabsChange}>
                        <TabList>
                            <Tab><Icon mr="2" as={mainRoutes.states.icon} /> {mainRoutes.states.title}</Tab>
                            {/*<Tab><Icon mr="2" as={FiCheck} /> Inventaire</Tab>*/}
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <StatesTableList
                                    fetchStates
                                    showCreator
                                    statesBaseUrl={statesBaseUrl}
                                >
                                    <Button
                                        colorScheme='green'
                                        fontWeight="none"
                                        size={"sm"}
                                        leftIcon={<FiPlusSquare />}
                                        as={Link}
                                        to={mainRoutes.addState.path}
                                    >
                                        Ajouter une ville
                                    </Button>
                                </StatesTableList>
                            </TabPanel>
                            {/*<TabPanel>
                                        <p>two!</p>
                                    </TabPanel>*/}
                        </TabPanels>
                    </Tabs>
                </Stack>
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