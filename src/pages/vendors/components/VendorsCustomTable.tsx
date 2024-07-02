import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconMapPin, IconPhotoCog} from "@tabler/icons-react";
import {
    Badge,
    CreateToastFnReturn,
    HStack, MenuDivider,
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
import {VendorType, defaultSelectedVendor} from "../show/showVendorData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import VendorEditForm from "./VendorEditForm";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import AddressUpdateForm from "../../../components/AddressUpdateForm";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const VendorsCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isVendorsPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        vendorsResponseData
    }): ReactElement => {

    const {onOpen: onEditVendorDrawerOpen, isOpen: isEditVendorDrawerOpen, onClose: onEditVendorDrawerClose} = useDisclosure();
    const {onOpen: onChangeVendorLogoDrawerOpen, isOpen: isChangeVendorLogoDrawerOpen, onClose: onChangeVendorLogoDrawerClose} = useDisclosure();
    const {onOpen: onChangeShopAddressDrawerOpen, isOpen: isChangeShopAddressDrawerOpen, onClose: onChangeShopAddressDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedVendor, setSelectedVendor] = useState<VendorType>(defaultSelectedVendor);

    const logoUri: string = joinBaseUrlWithParams(vendorsApiURI.logo, [{param: "id", value: selectedVendor.id}]);
    const addressUri: string = joinBaseUrlWithParams(vendorsApiURI.address, [{param: "id", value: selectedVendor.id}]);
    const deleteUri: string = joinBaseUrlWithParams(vendorsApiURI.destroy, [{param: "id", value: selectedVendor.id}]);
    const toggleUri: string = joinBaseUrlWithParams(vendorsApiURI.toggle, [{param: "id", value: selectedVendor.id}]);

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("vendor_deleted", {name: selectedVendor.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedVendor.enabled}`),
            description: `${t(`vendor_toggled_${selectedVendor.enabled}`, {name: selectedVendor.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteVendorAlertData,
        isPending: isDeleteVendorPending,
        handleRequest: handleDeleteVendor,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        uri: deleteUri,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleVendorAlertData,
        isPending: isToggleVendorPending,
        handleRequest: handleToggleVendor,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        uri: toggleUri,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "vendor", show: true, sort: true, search: true},
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
                    {isVendorsPending ? <TableSkeletonLoader /> : (
                        vendorsResponseData.empty ? <EmptyTableAlert /> : (
                            vendorsResponseData.content.map((vendor: VendorType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            logo
                                            image={vendor.logo}
                                            title={vendor.name}
                                            state={vendor}
                                            url={`${mainRoutes.vendors.path}/${vendor.id}`}
                                            description={vendor.description}
                                        />
                                    </Td>
                                    <Td>
                                        <RowImage
                                            plain
                                            unlink
                                            title={vendor.address?.phoneNumberOne}
                                            description={vendor.address?.streetAddress}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${vendor.enabled ? "green" : "red"}`}>
                                            {t(`status_${vendor.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: vendor.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={vendor.creator?.avatar}
                                                title={vendor.creator?.firstName}
                                                state={vendor.creator}
                                                url={`${mainRoutes.users.path}/${vendor.creator?.id}`}
                                                description={vendor.creator?.email || vendor.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditVendorDrawerOpen();
                                                    setSelectedVendor(vendor);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedVendor(vendor);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.vendors.path}/${vendor.id}`}
                                                state={vendor}
                                                status={vendor.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedVendor(vendor);
                                                }}
                                            >
                                                <MenuDivider />
                                                <MoreMenuItem
                                                    label={t("change_logo")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeVendorLogoDrawerOpen();
                                                        setSelectedVendor(vendor);
                                                    }}
                                                />
                                                <MoreMenuItem
                                                    label={t("change_address")}
                                                    icon={IconMapPin}
                                                    showDrawer={(): void => {
                                                        onChangeShopAddressDrawerOpen();
                                                        setSelectedVendor(vendor);
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
                handleConfirm={handleDeleteVendor}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteVendorPending}
                alertData={deleteVendorAlertData}
            >
                {t("delete_vendor")} <strong>{selectedVendor.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedVendor.enabled}`)}
                handleConfirm={handleToggleVendor}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleVendorPending}
                alertData={toggleVendorAlertData}
            >
                {t(`toggle_vendor_${selectedVendor.enabled}`)} <strong>{selectedVendor.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_vendor")}
                isOpen={isEditVendorDrawerOpen}
                onClose={onEditVendorDrawerClose}
            >
                <VendorEditForm
                    selectedVendor={selectedVendor}
                    finished={(): void => {
                        onEditVendorDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_logo")}
                isOpen={isChangeVendorLogoDrawerOpen}
                onClose={onChangeVendorLogoDrawerClose}
            >
                <ImageUpdateForm
                    logo
                    image={selectedVendor.logo}
                    uri={logoUri}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_address")}
                isOpen={isChangeShopAddressDrawerOpen}
                onClose={onChangeShopAddressDrawerClose}
            >
                <AddressUpdateForm
                    address={selectedVendor.address}
                    uri={addressUri}
                    finished={(): void => {
                        onChangeShopAddressDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface VendorsResponseDataType extends PaginationType {
    content: Array<VendorType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isVendorsPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    vendorsResponseData: VendorsResponseDataType,

}

export default VendorsCustomTable;