import React, {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Badge, Box, Button, ButtonGroup, SimpleGrid, Skeleton, Stack, Table, Tbody,} from "@chakra-ui/react";

import useShowUserHook from "./useShowUserHook";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import CustomAlert from "../../../components/alert/CustomAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {mainRoutes} from "../../../routes/mainRoutes";
import StatusBadge from "../../../components/StatusBadge";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import ListSkeletonLoader from "../../../components/skeletonLoader/ListSkeletonLoader";
import {ShowUserHookType} from "./showUserData";
import NotFoundPage from "../../NotFoundPage";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";
import EnumBadge from "../../../components/EnumBadge";
import {FiLock, FiUnlock} from "react-icons/fi";
import ImageDisplay from "../../../components/ImageDisplay";

const ShowUserPage = (): ReactElement => {
    const {
        isUserPending,
        userAlertData,
        userResponseData,
        handleToggleUser,
        isToggleUserPending,
        toggleUserAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    }: ShowUserHookType = useShowUserHook();

    return (
        <>
            <PageHeader
                title={`Détail utilisateur ${userResponseData.firstName}`}
                items={[{path: mainRoutes.users.path, label: 'Utilisateurs'}]}
            />
            <Stack>
                <CustomAlert data={userAlertData} />
                {userAlertData.show ? <NotFoundPage /> : (
                    <>
                        <SimpleGrid minChildWidth={"md"}>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    {!userAlertData.show && (
                                        <>
                                            <ButtonGroup>
                                                <Button
                                                    fontWeight="none"
                                                    colorScheme={userResponseData.enabled ? "orange" : "green"}
                                                    size={"sm"}
                                                    leftIcon={userResponseData.enabled ? <FiLock /> : <FiUnlock />}
                                                    onClick={showToggleModal}
                                                >
                                                    {userResponseData.enabled ? "Désactiver" : "Activer"}
                                                </Button>
                                            </ButtonGroup>
                                            <Table size={"sm"}>
                                                <Tbody>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Nom d'utilisateur"}>{userResponseData.username}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Prénom"}>{userResponseData.firstName}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Nom"}>{userResponseData.lastName}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Profession"}>{userResponseData.profession}</ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Rôle"}><EnumBadge data={userResponseData.role} role /></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Genre"}><EnumBadge data={userResponseData.gender} gender /></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Status"}><StatusBadge enabled={userResponseData.enabled}/></ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Créer par"}>
                                                        <Link
                                                            to={`${mainRoutes.users.path}/${userResponseData.creator?.id}`}
                                                            className="link"
                                                            state={userResponseData.creator}
                                                        >
                                                            {userResponseData.creator?.username}
                                                        </Link>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Date de nais."}>
                                                        <Badge rounded="md">{stringDateFormat(userResponseData.birthdate)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Dernière con. le"}>
                                                        <Badge rounded="md">{stringDateFormat(userResponseData.lastLoggedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Créer le"}>
                                                        <Badge rounded="md">{stringDateFormat(userResponseData.createdAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Modifié le"}>
                                                        <Badge rounded="md">{stringDateFormat(userResponseData.updatedAt, true)}</Badge>
                                                    </ListSkeletonLoader>
                                                    <ListSkeletonLoader isLoading={isUserPending} label={"Description"}>{userResponseData.description}</ListSkeletonLoader>
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                            <Box>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Avatar</strong>
                                        <Stack>
                                            {isUserPending ? <Skeleton height={"200px"} width={"200px"} rounded={"md"} /> : (
                                                <Stack>
                                                    <ImageDisplay image={userResponseData.avatar} size={ImageSizeEnumType.SMALL} />
                                                </Stack>
                                            )}
                                        </Stack>
                                    </>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                        <ConfirmAlertDialog
                            colorScheme={userResponseData.enabled ? "orange" : "green"}
                            handleConfirm={handleToggleUser}
                            isOpen={isToggleModalOpen}
                            onClose={onToggleModalClose}
                            isLoading={isToggleUserPending}
                            alertData={toggleUserAlertData}
                            title={userResponseData.enabled ? "Désactivation" : "Activation"}
                        >
                            {userResponseData.enabled ? "Désactiver" : "Activer"} l'utilisateur <strong>{userResponseData.firstName}</strong>?
                        </ConfirmAlertDialog>
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowUserPage;