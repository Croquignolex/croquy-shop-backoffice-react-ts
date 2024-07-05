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
import {AttributeValueType, defaultSelectedAttributeValue} from "../show/showAttributeValueData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import AttributeValueValueEditForm from "./AttributeValueEditForm";
import {attributeValuesApiURI} from "../../../constants/apiURIConstants";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const AttributeValueValuesCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isAttributeValuesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        attributeValuesResponseData
    }): ReactElement => {

    const {onOpen: onEditAttributeValueDrawerOpen, isOpen: isEditAttributeValueDrawerOpen, onClose: onEditAttributeValueDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedAttributeValue, setSelectedAttributeValue] = useState<AttributeValueType>(defaultSelectedAttributeValue);

    const deleteUri: string = joinBaseUrlWithParams(attributeValuesApiURI.destroy, [{param: "id", value: selectedAttributeValue.id}]);
    const toggleUri: string = joinBaseUrlWithParams(attributeValuesApiURI.toggle, [{param: "id", value: selectedAttributeValue.id}]);

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("attribute_value_deleted", {name: selectedAttributeValue.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedAttributeValue.enabled}`),
            description: `${t(`attribute_value_toggled_${selectedAttributeValue.enabled}`, {name: selectedAttributeValue.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteAttributeValueAlertData,
        isPending: isDeleteAttributeValuePending,
        handleRequest: handleDeleteAttributeValue,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        uri: deleteUri,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleAttributeValueAlertData,
        isPending: isToggleAttributeValuePending,
        handleRequest: handleToggleAttributeValue,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        uri: toggleUri,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "attribute_value", show: true, sort: true, search: true},
        {field: "value", label: "value", show: true, sort: true, search: true},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isAttributeValuesPending ? <TableSkeletonLoader /> : (
                        attributeValuesResponseData.empty ? <EmptyTableAlert /> : (
                            attributeValuesResponseData.content.map((attributeValue: AttributeValueType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            plain
                                            title={attributeValue.name}
                                            state={attributeValue}
                                            url={`${mainRoutes.attributeValues.path}/${attributeValue.id}`}
                                            description={attributeValue.description}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={"gray"}>
                                            {t(attributeValue.value)}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${attributeValue.enabled ? "green" : "red"}`}>
                                            {t(`status_${attributeValue.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: attributeValue.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={attributeValue.creator?.avatar}
                                                title={attributeValue.creator?.firstName}
                                                state={attributeValue.creator}
                                                url={`${mainRoutes.users.path}/${attributeValue.creator?.id}`}
                                                description={attributeValue.creator?.email || attributeValue.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditAttributeValueDrawerOpen();
                                                    setSelectedAttributeValue(attributeValue);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedAttributeValue(attributeValue);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.attributeValues.path}/${attributeValue.id}`}
                                                state={attributeValue}
                                                status={attributeValue.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedAttributeValue(attributeValue);
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
                handleConfirm={handleDeleteAttributeValue}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteAttributeValuePending}
                alertData={deleteAttributeValueAlertData}
            >
                {t("delete_attributeValue")} <strong>{selectedAttributeValue.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedAttributeValue.enabled}`)}
                handleConfirm={handleToggleAttributeValue}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleAttributeValuePending}
                alertData={toggleAttributeValueAlertData}
            >
                {t(`toggle_attributeValue_${selectedAttributeValue.enabled}`)} <strong>{selectedAttributeValue.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_attributeValue")}
                isOpen={isEditAttributeValueDrawerOpen}
                onClose={onEditAttributeValueDrawerClose}
            >
                <AttributeValueValueEditForm
                    selectedAttributeValue={selectedAttributeValue}
                    finished={(): void => {
                        onEditAttributeValueDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface AttributeValuesResponseDataType extends PaginationType {
    content: Array<AttributeValueType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isAttributeValuesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    attributeValuesResponseData: AttributeValuesResponseDataType,

}

export default AttributeValueValuesCustomTable;