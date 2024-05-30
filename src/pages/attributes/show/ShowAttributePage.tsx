import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Badge, Box, ButtonGroup, SimpleGrid, Stack, Table, Tbody,} from "@chakra-ui/react";

import useShowAttributeHook from "./useShowAttributeHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import DoubleActionButton from "../../../components/form/DoubleActionButton";
import {ShowAttributeHookType} from "./showAttributeData";
import NotFoundPage from "../../NotFoundPage";
import EnumBadge from "../../../components/EnumBadge";

const ShowAttributePage = (): ReactElement => {
    const {
        isAttributePending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteAttributeAlertData,
        isDeleteAttributePending,
        handleDeleteAttribute,
        attributeAlertData,
        attributeResponseData,
        handleToggleAttribute,
        isToggleAttributePending,
        toggleAttributeAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    }: ShowAttributeHookType = useShowAttributeHook();

    return (
        <>
            <PageHeader
                title={`Détail attribut ${attributeResponseData.name}`}
                items={[{path: mainRoutes.attributes.path, label: 'Attributs'}]}
            />
            <Stack>
                <CustomAlert data={attributeAlertData} />
                {attributeAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!attributeAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <DoubleActionButton
                                                    isDisabled={isAttributePending}
                                                    showStatus={!isAttributePending}
                                                    state={attributeResponseData}
                                                    showDeleteModal={showDeleteModal}
                                                    showToggleModal={showToggleModal}
                                                    edithPath={`${mainRoutes.attributes.path}/${attributeResponseData.id}/edit`}
                                                />
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Nom"}>{attributeResponseData.name}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Type"}><EnumBadge data={attributeResponseData.type} attribute /></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Status"}><StatusBadge enabled={attributeResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${attributeResponseData.creator?.id}`}
                                                            className="link"
                                                            state={attributeResponseData.creator}
                                                        >
                                                            {attributeResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(attributeResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(attributeResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isAttributePending} label={"Description"}>{attributeResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box />
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            handleConfirm={handleDeleteAttribute}
                            isOpen={isDeleteModalOpen}
                            onClose={onDeleteModalClose}
                            isLoading={isDeleteAttributePending}
                            alertData={deleteAttributeAlertData}
                        >
                            Supprimer l'attribut <strong>{attributeResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                        <ConfirmAlertDialog
                            colorScheme={attributeResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleAttribute}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleAttributePending}
                            alertData={toggleAttributeAlertData}
                            title={attributeResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {attributeResponseData.enabled ? "Désactiver" : "Activer"} l'attribut <strong>{attributeResponseData.name}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowAttributePage;