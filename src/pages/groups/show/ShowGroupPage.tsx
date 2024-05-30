import React, {ReactElement, useState} from "react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";
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
    Icon,
    TabPanels,
    TabPanel,
    Button,
    useDisclosure,
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
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";
import FormModal from "../../../components/FormModal";
import GroupCategoryCreateForm from "../../../components/createForm/category/group/GroupCategoryCreateForm";
import CategoriesTableList from "../../../components/tableList/categories/CategoriesTableList";
import SeoTable from "../../../components/SeoTable";

const ShowGroupPage = (): ReactElement => {
    const [categoriesSequence, setCategoriesSequence] = useState<number>(0);
    const { onOpen: onAddCategoryModalOpen, isOpen: isAddCategoryModalOpen, onClose: onAddCategoryModalClose } = useDisclosure();
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
        handleTabsChange,
        handleBannerUpdate
    }: ShowGroupHookType = useShowGroupHook();

    const categoriesBaseUrl: string = joinBaseUrlWithParams(groupsApiURI.categories, [{param: "id", value: groupResponseData.id}]);
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
                        <SimpleGrid minChildWidth={"md"}>
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
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Logo</strong>
                                        <ShowImage
                                            id={"upload-logo"}
                                            imageSize={ImageSizeEnumType.SMALL}
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
                                        <strong>SEO</strong>
                                        <SeoTable isLoading={isGroupPending} data={groupResponseData} />
                                    </>
                                </Stack>
                                <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                                    <>
                                        <strong>Bannière</strong>
                                        <ShowImage
                                            imageSize={ImageSizeEnumType.LARGE}
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
                        <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                            {!groupAlertData.show && (
                                <Tabs colorScheme='green' isFitted onChange={handleTabsChange}>
                                    <TabList>
                                        <Tab><Icon mr="2" as={mainRoutes.categories.icon} /> {mainRoutes.categories.title}</Tab>
                                        {/*<Tab><Icon mr="2" as={FiCheck} /> Inventaire</Tab>*/}
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel key={categoriesSequence}>
                                            {groupResponseData.id && (
                                                <CategoriesTableList
                                                    fetchCategories
                                                    showCreator
                                                    categoriesBaseUrl={categoriesBaseUrl}
                                                >
                                                    <Button
                                                        colorScheme='green'
                                                        fontWeight="none"
                                                        size={"sm"}
                                                        leftIcon={<FiPlusSquare />}
                                                        onClick={onAddCategoryModalOpen}
                                                    >
                                                        Ajouter une catégorie
                                                    </Button>
                                                </CategoriesTableList>
                                            )}
                                        </TabPanel>
                                        {/*<TabPanel>
                                        <p>two!</p>
                                    </TabPanel>*/}
                                    </TabPanels>
                                </Tabs>
                            )}
                        </Stack>
                        <FormModal
                            title={"Ajouter une catégorie"}
                            isOpen={isAddCategoryModalOpen}
                            onClose={onAddCategoryModalClose}
                        >
                            <GroupCategoryCreateForm
                                groupId={groupResponseData.id}
                                handleAdd={() => setCategoriesSequence(categoriesSequence + 1)}
                                handleFinish={(): void => {
                                    onAddCategoryModalClose();
                                    setCategoriesSequence(categoriesSequence + 1);
                                }}
                            />
                        </FormModal>
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