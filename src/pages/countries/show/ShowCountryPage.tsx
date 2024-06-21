import React, {ReactElement, useState} from "react";
import {FiPlusSquare} from "react-icons/fi";
import {Link} from "react-router-dom";
import {
    Box,
    Stack,
    Table,
    Tbody,
    ButtonGroup,
    Badge,
    SimpleGrid,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Icon,
    Button,
    useDisclosure,
} from "@chakra-ui/react";

import useShowCountryHook from "./useShowCountryHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowCountryHookType} from "./showCountryData";
import ShowImage from "../../../components/showImage/ShowImage";
// import StatesTableList from "../../../components/tableList/states/StatesTableList";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import { joinBaseUrlWithParams } from "../../../helpers/apiRequestsHelpers";
import NotFoundPage from "../../NotFoundPage";
import FormModal from "../../../components/FormModal";
import CountryStateCreateForm from "../../../components/createForm/state/country/CountryStateCreateForm";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";

const ShowCountryPage = (): ReactElement => {
    const [statesSequence, setStatesSequence] = useState<number>(0);
    const { onOpen: onAddStateModalOpen, isOpen: isAddStateModalOpen, onClose: onAddStateModalClose } = useDisclosure();
    const {
        isCountryPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCountryAlertData,
        isDeleteCountryPending,
        handleDeleteCountry,
        countryAlertData,
        countryResponseData,
        handleToggleCountry,
        isToggleCountryPending,
        toggleCountryAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleTabsChange,
        handleFlagUpdate
    }: ShowCountryHookType = useShowCountryHook();

    const statesBaseUrl: string = joinBaseUrlWithParams(countriesApiURI.states, [{param: "id", value: countryResponseData.id}]);
    const flagBaseUrl: string = joinBaseUrlWithParams(countriesApiURI.flag, [{param: "id", value: countryResponseData.id}]);

    return (
        <>
            {/*<PageHeader
                title={`Détail pays ${countryResponseData.name}`}
                items={[{path: mainRoutes.countries.path, label: 'Pays'}]}
            />*/}
            <Stack>
                <CustomAlert data={countryAlertData} />
                {countryAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!countryAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isCountryPending}
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
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Drapeau</strong>
                                        <ShowImage
                                            id={"upload-flag"}
                                            imageSize={ImageSizeEnumType.SMALL}
                                            isLoading={isCountryPending}
                                            image={countryResponseData.flag}
                                            imageBaseUrl={flagBaseUrl}
                                            handleImageUpdate={handleFlagUpdate}
                                        />
                                    </>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                        <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                            {!countryAlertData.show && (
                                <Tabs colorScheme='green' isFitted onChange={handleTabsChange}>
                                    <TabList>
                                        <Tab><Icon mr="2" as={mainRoutes.states.icon} /> {mainRoutes.states.title}</Tab>
                                        {/*<Tab><Icon mr="2" as={FiCheck} /> Inventaire</Tab>*/}
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel key={statesSequence}>
                                            {/*{countryResponseData.id && (
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
                                                        onClick={onAddStateModalOpen}
                                                    >
                                                        Ajouter une ville
                                                    </Button>
                                                </StatesTableList>
                                            )}*/}
                                        </TabPanel>
                                        {/*<TabPanel>
                                        <p>two!</p>
                                    </TabPanel>*/}
                                    </TabPanels>
                                </Tabs>
                            )}
                        </Stack>
                        <FormModal
                            title={"Ajouter une ville"}
                            isOpen={isAddStateModalOpen}
                            onClose={onAddStateModalClose}
                        >
                            <CountryStateCreateForm
                                countryId={countryResponseData.id}
                                handleAdd={() => setStatesSequence(statesSequence + 1)}
                                handleFinish={(): void => {
                                    onAddStateModalClose();
                                    setStatesSequence(statesSequence + 1);
                                }}
                            />
                        </FormModal>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteCountry}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteCountryPending}
                            alertData={deleteCountryAlertData}
                        >
                            Supprimer le pays <strong>{countryResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            // colorScheme={countryResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleCountry}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleCountryPending}
                            alertData={toggleCountryAlertData}
                            title={countryResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {countryResponseData.enabled ? "Désactiver" : "Activer"} le pays <strong>{countryResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowCountryPage;