import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconMapPin} from "@tabler/icons-react";
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
import {ShopType, defaultSelectedShop} from "../show/showShopData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import ShopEditForm from "./ShopEditForm";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";
import AddressUpdateForm from "../../../components/AddressUpdateForm";

const ShopsCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isShopsPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        shopsResponseData
    }): ReactElement => {

    const {onOpen: onEditShopDrawerOpen, isOpen: isEditShopDrawerOpen, onClose: onEditShopDrawerClose} = useDisclosure();
    const {onOpen: onChangeShopAddressDrawerOpen, isOpen: isChangeShopAddressDrawerOpen, onClose: onChangeShopAddressDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedShop, setSelectedShop] = useState<ShopType>(defaultSelectedShop);

    const addressBaseUrl: string = shopsApiURI.address;
    const deleteBaseUrl: string = shopsApiURI.destroy;
    const toggleBaseUrl: string = shopsApiURI.toggle;

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("shop_deleted", {name: selectedShop.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedShop.enabled}`),
            description: `${t(`shop_toggled_${selectedShop.enabled}`, {name: selectedShop.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteShopAlertData,
        isPending: isDeleteShopPending,
        handleRequest: handleDeleteShop,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        item: selectedShop,
        baseUrl: deleteBaseUrl,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleShopAlertData,
        isPending: isToggleShopPending,
        handleRequest: handleToggleShop,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        item: selectedShop,
        baseUrl: toggleBaseUrl,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "shop", show: true, sort: true, search: true},
        {field: "address", label: "address", show: true, sort: false, search: false},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isShopsPending ? <TableSkeletonLoader /> : (
                        shopsResponseData.empty ? <EmptyTableAlert /> : (
                            shopsResponseData.content.map((shop: ShopType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            plain
                                            title={shop.name}
                                            state={shop}
                                            url={`${mainRoutes.shops.path}/${shop.id}`}
                                            description={shop.description}
                                        />
                                    </Td>
                                    <Td>
                                        <RowImage
                                            plain
                                            unlink
                                            title={shop.address?.phoneNumberOne}
                                            description={shop.address?.streetAddress}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${shop.enabled ? "green" : "red"}`}>
                                            {t(`status_${shop.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: shop.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={shop.creator?.avatar}
                                                title={shop.creator?.firstName}
                                                state={shop.creator}
                                                url={`${mainRoutes.users.path}/${shop.creator?.id}`}
                                                description={shop.creator?.email || shop.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditShopDrawerOpen();
                                                    setSelectedShop(shop);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedShop(shop);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.shops.path}/${shop.id}`}
                                                state={shop}
                                                status={shop.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedShop(shop);
                                                }}
                                            >
                                                <MoreMenuItem
                                                    label={t("change_address")}
                                                    icon={IconMapPin}
                                                    showDrawer={(): void => {
                                                        onChangeShopAddressDrawerOpen();
                                                        setSelectedShop(shop);
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
                handleConfirm={handleDeleteShop}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteShopPending}
                alertData={deleteShopAlertData}
            >
                {t("delete_shop")} <strong>{selectedShop.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedShop.enabled}`)}
                handleConfirm={handleToggleShop}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleShopPending}
                alertData={toggleShopAlertData}
            >
                {t(`toggle_shop_${selectedShop.enabled}`)} <strong>{selectedShop.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_shop")}
                isOpen={isEditShopDrawerOpen}
                onClose={onEditShopDrawerClose}
            >
                <ShopEditForm
                    selectedShop={selectedShop}
                    finished={(): void => {
                        onEditShopDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_address")}
                isOpen={isChangeShopAddressDrawerOpen}
                onClose={onChangeShopAddressDrawerClose}
            >
                <AddressUpdateForm
                    item={selectedShop}
                    address={selectedShop.address}
                    baseUrl={addressBaseUrl}
                    finished={(): void => {
                        onChangeShopAddressDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface ShopsResponseDataType extends PaginationType {
    content: Array<ShopType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isShopsPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    shopsResponseData: ShopsResponseDataType,

}

export default ShopsCustomTable;