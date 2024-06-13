import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Badge, Box, ButtonGroup, SimpleGrid, Stack, Table, Tbody,} from "@chakra-ui/react";

import useShowAttributeValueHook from "./useShowAttributeValueHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowAttributeValueHookType} from "./showAttributeValueData";
import NotFoundPage from "../../NotFoundPage";

const ShowAttributeValuePage = (): ReactElement => {
    const {
        isAttributeValuePending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeValueAlertData,
        isDeleteAttributeValuePending,
        handleDeleteAttributeValue,
        attributeValueAlertData,
        attributeValueResponseData,
        handleToggleAttributeValue,
        isToggleAttributeValuePending,
        toggleAttributeValueAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    }: ShowAttributeValueHookType = useShowAttributeValueHook();

    return (
        <>
            {/*<PageHeader*/}
            {/*    title={`Détail marque ${attributeValueResponseData.name}`}*/}
            {/*    items={[{path: mainRoutes.attributeValues.path, label: 'Marques'}]}*/}
            {/*/>*/}
            <Stack>
                <CustomAlert data={attributeValueAlertData} />
                {attributeValueAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!attributeValueAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isAttributeValuePending}
                                                    showStatus={!isAttributeValuePending}
                                                    state={attributeValueResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.attributeValues.path}/${attributeValueResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Nom"}>{attributeValueResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Valeur"}>{attributeValueResponseData.value}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Status"}><StatusBadge enabled={attributeValueResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${attributeValueResponseData.creator?.id}`}
                                                            className="link"
                                                            state={attributeValueResponseData.creator}
                                                        >
                                                            {attributeValueResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(attributeValueResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(attributeValueResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributeValuePending} label={"Description"}>{attributeValueResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box />
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteAttributeValue}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteAttributeValuePending}
                            alertData={deleteAttributeValueAlertData}
                        >
                            Supprimer la valeur d'attribut <strong>{attributeValueResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            // colorScheme={attributeValueResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleAttributeValue}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleAttributeValuePending}
                            alertData={toggleAttributeValueAlertData}
                            title={attributeValueResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {attributeValueResponseData.enabled ? "Désactiver" : "Activer"} la valeur d'attribut <strong>{attributeValueResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowAttributeValuePage;