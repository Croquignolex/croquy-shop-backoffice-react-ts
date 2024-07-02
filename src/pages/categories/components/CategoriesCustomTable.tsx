import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Badge,
    CreateToastFnReturn,
    HStack,
    MenuDivider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../components/alert/EmptyTableAlert";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../components/skeletonLoader/TableSkeletonLoader";
import {CategoryType, defaultSelectedCategory} from "../show/showCategoryData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import CategoryEditForm from "./CategoryEditForm";
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {IconPhotoCog} from "@tabler/icons-react";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const CategoriesCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        showGroup = false,
        isCategoriesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        categoriesResponseData
    }): ReactElement => {

    const {onOpen: onEditCategoryDrawerOpen, isOpen: isEditCategoryDrawerOpen, onClose: onEditCategoryDrawerClose} = useDisclosure();
    const {onOpen: onChangeGroupLogoDrawerOpen, isOpen: isChangeGroupLogoDrawerOpen, onClose: onChangeGroupLogoDrawerClose} = useDisclosure();
    const {onOpen: onChangeGroupBannerDrawerOpen, isOpen: isChangeGroupBannerDrawerOpen, onClose: onChangeGroupBannerDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(defaultSelectedCategory);

    const logoUri: string = joinBaseUrlWithParams(categoriesApiURI.logo, [{param: "id", value: selectedCategory.id}]);
    const bannerUri: string = joinBaseUrlWithParams(categoriesApiURI.banner, [{param: "id", value: selectedCategory.id}]);
    const deleteUri: string = joinBaseUrlWithParams(categoriesApiURI.destroy, [{param: "id", value: selectedCategory.id}]);
    const toggleUri: string = joinBaseUrlWithParams(categoriesApiURI.toggle, [{param: "id", value: selectedCategory.id}]);


    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("category_deleted", {name: selectedCategory.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedCategory.enabled}`),
            description: `${t(`category_toggled_${selectedCategory.enabled}`, {name: selectedCategory.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteCategoryAlertData,
        isPending: isDeleteCategoryPending,
        handleRequest: handleDeleteCategory,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        uri: deleteUri,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleCategoryAlertData,
        isPending: isToggleCategoryPending,
        handleRequest: handleToggleCategory,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        uri: toggleUri,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "category", show: true, sort: true, search: true},
        {field: "seo", label: "seo", show: true, sort: false, search: false},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "group", label: "group", show: showGroup, sort: false, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isCategoriesPending ? <TableSkeletonLoader /> : (
                        categoriesResponseData.empty ? <EmptyTableAlert /> : (
                            categoriesResponseData.content.map((category: CategoryType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            logo
                                            image={category.logo}
                                            title={category.name}
                                            state={category}
                                            url={`${mainRoutes.categories.path}/${category.id}`}
                                            description={category.description}
                                        />
                                    </Td>
                                    <Td>
                                        <RowImage
                                            plain
                                            unlink
                                            title={category.seoTitle}
                                            description={category.seoDescription}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${category.enabled ? "green" : "red"}`}>
                                            {t(`status_${category.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: category.createdAt})}</Td>
                                    {showGroup && (
                                        <Td>
                                            <RowImage
                                                logo
                                                image={category.group?.logo}
                                                title={category.group?.name}
                                                state={category.group}
                                                url={`${mainRoutes.groups.path}/${category.group?.id}`}
                                                description={category.group?.description}
                                            />
                                        </Td>
                                    )}
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={category.creator?.avatar}
                                                title={category.creator?.firstName}
                                                state={category.creator}
                                                url={`${mainRoutes.users.path}/${category.creator?.id}`}
                                                description={category.creator?.email || category.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditCategoryDrawerOpen();
                                                    setSelectedCategory(category);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedCategory(category);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.categories.path}/${category.id}`}
                                                state={category}
                                                status={category.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedCategory(category);
                                                }}
                                            >
                                                <MenuDivider />
                                                <MoreMenuItem
                                                    label={t("change_logo")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeGroupLogoDrawerOpen();
                                                        setSelectedCategory(category);
                                                    }}
                                                />
                                                <MoreMenuItem
                                                    label={t("change_banner")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeGroupBannerDrawerOpen();
                                                        setSelectedCategory(category);
                                                    }}
                                                />
                                            </MoreIconButton>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                        )
                    )}
                </Tbody>
            </Table>

            <ConfirmAlertDialog
                danger
                handleConfirm={handleDeleteCategory}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteCategoryPending}
                alertData={deleteCategoryAlertData}
            >
                {t("delete_category")} <strong>{selectedCategory.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedCategory.enabled}`)}
                handleConfirm={handleToggleCategory}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleCategoryPending}
                alertData={toggleCategoryAlertData}
            >
                {t(`toggle_category_${selectedCategory.enabled}`)} <strong>{selectedCategory.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_category")}
                isOpen={isEditCategoryDrawerOpen}
                onClose={onEditCategoryDrawerClose}
            >
                <CategoryEditForm
                    selectedCategory={selectedCategory}
                    finished={(): void => {
                        onEditCategoryDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_logo")}
                isOpen={isChangeGroupLogoDrawerOpen}
                onClose={onChangeGroupLogoDrawerClose}
            >
                <ImageUpdateForm
                    logo
                    image={selectedCategory.logo}
                    uri={logoUri}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_banner")}
                isOpen={isChangeGroupBannerDrawerOpen}
                onClose={onChangeGroupBannerDrawerClose}
            >
                <ImageUpdateForm
                    banner
                    image={selectedCategory.banner}
                    uri={bannerUri}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface CategoriesResponseDataType extends PaginationType {
    content: Array<CategoryType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    showGroup?: boolean;
    reloadList: () => void,
    isCategoriesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    categoriesResponseData: CategoriesResponseDataType,

}

export default CategoriesCustomTable;