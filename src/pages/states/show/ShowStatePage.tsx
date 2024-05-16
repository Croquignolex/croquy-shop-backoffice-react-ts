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

import useShowStateHook from "./useShowStateHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowStateHookType} from "./showStateData";
import ShowImage from "../../../components/showImage/ShowImage";
import StatesTableList from "../../../components/tableList/states/StatesTableList";
import {statesApiURI} from "../../../constants/apiURIConstants";
import { joinBaseUrlWithParams } from "../../../helpers/apiRequestsHelpers";
import NotFoundPage from "../../NotFoundPage";
import FormModal from "../../../components/FormModal";

const ShowStatePage = (): ReactElement => {
    const [statesSequence, setStatesSequence] = useState<number>(0);
    const { onOpen: onAddStateModalOpen, isOpen: isAddStateModalOpen, onClose: onAddStateModalClose } = useDisclosure();
    const {
        isStatePending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteStateAlertData,
        isDeleteStatePending,
        handleDeleteState,
        stateAlertData,
        stateResponseData,
        handleToggleState,
        isToggleStatePending,
        toggleStateAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    }: ShowStateHookType = useShowStateHook();

    return (
        <>
            <PageHeader
                title={`Détail ville ${stateResponseData.name}`}
                items={[{path: mainRoutes.states.path, label: 'Villes'}]}
            />
            <Stack>
                <CustomAlert data={stateAlertData} />
                {stateAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"sm"} spacing={2}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!stateAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isStatePending}
                                                    showStatus={!isStatePending}
                                                    state={stateResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.states.path}/${stateResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Nom"}>{stateResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Status"}><StatusBadge enabled={stateResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Pays"}>
                                                        <Link
                                                            to={`${mainRoutes.countries.path}/${stateResponseData.country?.id}`}
                                                            className="link"
                                                            state={stateResponseData.country}
                                                        >
                                                            {stateResponseData.country?.name}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${stateResponseData.creator?.id}`}
                                                            className="link"
                                                            state={stateResponseData.creator}
                                                        >
                                                            {stateResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(stateResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(stateResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isStatePending} label={"Description"}>{stateResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box />
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteState}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteStatePending}
                            alertData={deleteStateAlertData}
                        >
                            Supprimer la boutique <strong>{stateResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={stateResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleState}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleStatePending}
                            alertData={toggleStateAlertData}
                            title={stateResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {stateResponseData.enabled ? "Désactiver" : "Activer"} la boutique <strong>{stateResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowStatePage;