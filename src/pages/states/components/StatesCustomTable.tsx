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
import {StateType, defaultSelectedState} from "../show/showStateData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import StateEditForm from "./StateEditForm";
import {statesApiURI} from "../../../constants/apiURIConstants";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const StatesCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        showCountry = false,
        isStatesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        statesResponseData
    }): ReactElement => {

    const {onOpen: onEditStateDrawerOpen, isOpen: isEditStateDrawerOpen, onClose: onEditStateDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedState, setSelectedState] = useState<StateType>(defaultSelectedState);

    const deleteBaseUrl: string = statesApiURI.destroy;
    const toggleBaseUrl: string = statesApiURI.toggle;

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("state_deleted", {name: selectedState.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedState.enabled}`),
            description: `${t(`state_toggled_${selectedState.enabled}`, {name: selectedState.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteStateAlertData,
        isPending: isDeleteStatePending,
        handleRequest: handleDeleteState,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        item: selectedState,
        baseUrl: deleteBaseUrl,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleStateAlertData,
        isPending: isToggleStatePending,
        handleRequest: handleToggleState,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        item: selectedState,
        baseUrl: toggleBaseUrl,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "state", show: true, sort: true, search: true},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "country", label: "country", show: showCountry, sort: false, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isStatesPending ? <TableSkeletonLoader /> : (
                        statesResponseData.empty ? <EmptyTableAlert /> : (
                            statesResponseData.content.map((state: StateType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            plain
                                            title={state.name}
                                            state={state}
                                            url={`${mainRoutes.states.path}/${state.id}`}
                                            description={state.description}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${state.enabled ? "green" : "red"}`}>
                                            {t(`status_${state.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: state.createdAt})}</Td>
                                    {showCountry && (
                                        <Td>
                                            <RowImage
                                                flag
                                                image={state.country?.flag}
                                                title={state.country?.name}
                                                state={state.country}
                                                url={`${mainRoutes.countries.path}/${state.country?.id}`}
                                                description={state.country?.description}
                                            />
                                        </Td>
                                    )}
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={state.creator?.avatar}
                                                title={state.creator?.firstName}
                                                state={state.creator}
                                                url={`${mainRoutes.users.path}/${state.creator?.id}`}
                                                description={state.creator?.email || state.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditStateDrawerOpen();
                                                    setSelectedState(state);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedState(state);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.states.path}/${state.id}`}
                                                state={state}
                                                status={state.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedState(state);
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
                handleConfirm={handleDeleteState}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteStatePending}
                alertData={deleteStateAlertData}
            >
                {t("delete_state")} <strong>{selectedState.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedState.enabled}`)}
                handleConfirm={handleToggleState}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleStatePending}
                alertData={toggleStateAlertData}
            >
                {t(`toggle_state_${selectedState.enabled}`)} <strong>{selectedState.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_state")}
                isOpen={isEditStateDrawerOpen}
                onClose={onEditStateDrawerClose}
            >
                <StateEditForm
                    selectedState={selectedState}
                    finished={(): void => {
                        onEditStateDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface StatesResponseDataType extends PaginationType {
    content: Array<StateType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    showCountry?: boolean;
    reloadList: () => void,
    isStatesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    statesResponseData: StatesResponseDataType,

}

export default StatesCustomTable;