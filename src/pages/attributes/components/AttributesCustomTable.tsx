import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
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
import {AttributeType, defaultSelectedAttribute} from "../show/showAttributeData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import AttributeEditForm from "./AttributeEditForm";
import {attributesApiURI} from "../../../constants/apiURIConstants";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const AttributesCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isAttributesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        attributesResponseData
    }): ReactElement => {

    const {onOpen: onEditAttributeDrawerOpen, isOpen: isEditAttributeDrawerOpen, onClose: onEditAttributeDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedAttribute, setSelectedAttribute] = useState<AttributeType>(defaultSelectedAttribute);

    const deleteBaseUrl: string = attributesApiURI.destroy;
    const toggleBaseUrl: string = attributesApiURI.toggle;

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("attribute_deleted", {name: selectedAttribute.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedAttribute.enabled}`),
            description: `${t(`attribute_toggled_${selectedAttribute.enabled}`, {name: selectedAttribute.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteAttributeAlertData,
        isPending: isDeleteAttributePending,
        handleRequest: handleDeleteAttribute,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        item: selectedAttribute,
        baseUrl: deleteBaseUrl,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleAttributeAlertData,
        isPending: isToggleAttributePending,
        handleRequest: handleToggleAttribute,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        item: selectedAttribute,
        baseUrl: toggleBaseUrl,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "attribute", show: true, sort: true, search: true},
        {field: "type", label: "type", show: true, sort: false, search: false},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isAttributesPending ? <TableSkeletonLoader /> : (
                        attributesResponseData.empty ? <EmptyTableAlert /> : (
                            attributesResponseData.content.map((attribute: AttributeType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            plain
                                            title={attribute.name}
                                            state={attribute}
                                            url={`${mainRoutes.attributes.path}/${attribute.id}`}
                                            description={attribute.description}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={"gray"}>
                                            {t(attribute.type)}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${attribute.enabled ? "green" : "red"}`}>
                                            {t(`status_${attribute.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: attribute.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={attribute.creator?.avatar}
                                                title={attribute.creator?.firstName}
                                                state={attribute.creator}
                                                url={`${mainRoutes.users.path}/${attribute.creator?.id}`}
                                                description={attribute.creator?.email || attribute.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditAttributeDrawerOpen();
                                                    setSelectedAttribute(attribute);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedAttribute(attribute);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.attributes.path}/${attribute.id}`}
                                                state={attribute}
                                                status={attribute.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedAttribute(attribute);
                                                }}
                                            />
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
                handleConfirm={handleDeleteAttribute}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteAttributePending}
                alertData={deleteAttributeAlertData}
            >
                {t("delete_attribute")} <strong>{selectedAttribute.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedAttribute.enabled}`)}
                handleConfirm={handleToggleAttribute}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleAttributePending}
                alertData={toggleAttributeAlertData}
            >
                {t(`toggle_attribute_${selectedAttribute.enabled}`)} <strong>{selectedAttribute.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_attribute")}
                isOpen={isEditAttributeDrawerOpen}
                onClose={onEditAttributeDrawerClose}
            >
                <AttributeEditForm
                    selectedAttribute={selectedAttribute}
                    finished={(): void => {
                        onEditAttributeDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface AttributesResponseDataType extends PaginationType {
    content: Array<AttributeType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isAttributesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    attributesResponseData: AttributesResponseDataType,

}

export default AttributesCustomTable;