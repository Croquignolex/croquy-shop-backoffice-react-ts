import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconPhotoCog} from "@tabler/icons-react";
import {
    Badge,
    CreateToastFnReturn,
    HStack,
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
import {BrandType, defaultSelectedBrand} from "../show/showBrandData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import BrandEditForm from "./BrandEditForm";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import {brandsApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const BrandsCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isBrandsPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        brandsResponseData
    }): ReactElement => {

    const {onOpen: onEditBrandDrawerOpen, isOpen: isEditBrandDrawerOpen, onClose: onEditBrandDrawerClose} = useDisclosure();
    const {onOpen: onChangeBrandFlagDrawerOpen, isOpen: isChangeBrandFlagDrawerOpen, onClose: onChangeBrandFlagDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedBrand, setSelectedBrand] = useState<BrandType>(defaultSelectedBrand);

    const logoBaseUrl: string = brandsApiURI.logo;
    const deleteBaseUrl: string = brandsApiURI.destroy;
    const toggleBaseUrl: string = brandsApiURI.toggle;

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("brand_deleted", {name: selectedBrand.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedBrand.enabled}`),
            description: `${t(`brand_toggled_${selectedBrand.enabled}`, {name: selectedBrand.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteBrandAlertData,
        isPending: isDeleteBrandPending,
        handleRequest: handleDeleteBrand,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        item: selectedBrand,
        baseUrl: deleteBaseUrl,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleBrandAlertData,
        isPending: isToggleBrandPending,
        handleRequest: handleToggleBrand,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        item: selectedBrand,
        baseUrl: toggleBaseUrl,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "brand", show: true, sort: true, search: true},
        {field: "website", label: "website", show: true, sort: true, search: true},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isBrandsPending ? <TableSkeletonLoader /> : (
                        brandsResponseData.empty ? <EmptyTableAlert /> : (
                            brandsResponseData.content.map((brand: BrandType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            logo
                                            image={brand.logo}
                                            title={brand.name}
                                            state={brand}
                                            url={`${mainRoutes.brands.path}/${brand.id}`}
                                            description={brand.description}
                                        />
                                    </Td>
                                    <Td>{brand.website}</Td>
                                    <Td>
                                        <Badge colorScheme={`${brand.enabled ? "green" : "red"}`}>
                                            {t(`status_${brand.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: brand.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={brand.creator?.avatar}
                                                title={brand.creator?.firstName}
                                                state={brand.creator}
                                                url={`${mainRoutes.users.path}/${brand.creator?.id}`}
                                                description={brand.creator?.email || brand.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditBrandDrawerOpen();
                                                    setSelectedBrand(brand);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedBrand(brand);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.brands.path}/${brand.id}`}
                                                state={brand}
                                                status={brand.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedBrand(brand);
                                                }}
                                            >
                                                <MoreMenuItem
                                                    label={t("change_logo")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeBrandFlagDrawerOpen();
                                                        setSelectedBrand(brand);
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
                handleConfirm={handleDeleteBrand}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteBrandPending}
                alertData={deleteBrandAlertData}
            >
                {t("delete_brand")} <strong>{selectedBrand.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedBrand.enabled}`)}
                handleConfirm={handleToggleBrand}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleBrandPending}
                alertData={toggleBrandAlertData}
            >
                {t(`toggle_brand_${selectedBrand.enabled}`)} <strong>{selectedBrand.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_brand")}
                isOpen={isEditBrandDrawerOpen}
                onClose={onEditBrandDrawerClose}
            >
                <BrandEditForm
                    selectedBrand={selectedBrand}
                    finished={(): void => {
                        onEditBrandDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_logo")}
                isOpen={isChangeBrandFlagDrawerOpen}
                onClose={onChangeBrandFlagDrawerClose}
            >
                <ImageUpdateForm
                    logo
                    item={selectedBrand}
                    image={selectedBrand.logo}
                    baseUrl={logoBaseUrl}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface BrandsResponseDataType extends PaginationType {
    content: Array<BrandType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isBrandsPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    brandsResponseData: BrandsResponseDataType,

}

export default BrandsCustomTable;