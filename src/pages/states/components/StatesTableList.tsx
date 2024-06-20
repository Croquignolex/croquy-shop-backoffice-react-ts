import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconFlagPlus, IconFlagCog} from "@tabler/icons-react";
import {
    Badge,
    Box,
    Button,
    Divider,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";

import EmptyTableAlert from "../../../components/alert/EmptyTableAlert";
import ConfirmAlertDialog from "../../../components/ConfirmAlertDialog";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../../components/skeletonLoader/TableSkeletonLoader";
import CustomAlert from "../../../components/alert/CustomAlert";
import {StateType, defaultSelectedState} from "../show/showStateData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import useStateDeleteHook, {StateDeleteHookType} from "../hooks/useStateDeleteHook";
import useStateToggleHook, {StateToggleHookType} from "../hooks/useStateToggleHook";
import TableActions from "../../../components/table/TableActions";
import TableHeader from "../../../components/table/TableHeader";
import Pagination from "../../../components/Pagination";
import DrawerForm from "../../../components/DrawerForm";
import StateAddForm from "./StateAddForm";
import StateEditForm from "./StateEditForm";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import {statesApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import useSortAndFilterHook, {
    SortAndFilterHookType,
    SortAndFilterRequestDataType
} from "../../../hooks/useSortAndFilterHook";
import useStatesTableListHook, {
    StatesResponseDataType,
    StatesTableListHookType
} from "../hooks/useStatesTableListHook";

const StatesTableList: FC<StatesTableListProps> = (
    {
        showCreator = false,
        showCountry = false,
        fetchStates = false,
        statesBaseUrl
    }): ReactElement => {

    const {onOpen: onAddStateDrawerOpen, isOpen: isAddStateDrawerOpen, onClose: onAddStateDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const {
        handleChangePage,
        handleShowItems,
        handleSearch,
        handleSort,
        sortAndFilterData
    }: SortAndFilterHookType = useSortAndFilterHook({baseUrl: statesBaseUrl});
    const {
        statesResponseData,
        isStatesFetching,
        statesAlertData,
        reloadList,
    }: StatesTableListHookType = useStatesTableListHook({fetchStates, sortAndFilterData});

    return (
        <Box py={4} rounded="lg" shadow="default" bg="white">
            <TableActions handleShowItems={handleShowItems} handleSearch={handleSearch} baseUrl={statesBaseUrl}>
                <Button
                    leftIcon={<IconFlagPlus />}
                    px={{base: 4, sm: 6}}
                    onClick={onAddStateDrawerOpen}
                >
                    {t("add_state")}
                </Button>
            </TableActions>

            <Divider mt={6} />

            <Box px={6}>
                <CustomAlert data={statesAlertData} />
            </Box>

            <CustomTable
                handleSort={handleSort}
                isStatesPending={isStatesFetching}
                showCreator={showCreator}
                reloadList={reloadList}
                sortAndFilterData={sortAndFilterData}
                statesResponseData={statesResponseData}
            />

            <Pagination
                show={!statesResponseData.empty}
                handleGotoPage={handleChangePage}
                currentPage={statesResponseData.number + 1}
                totalPages={statesResponseData.totalPages}
                totalElements={statesResponseData.totalElements}
                currentPageElements={statesResponseData.numberOfElements}
            />

            <DrawerForm
                title={t("add_state")}
                isOpen={isAddStateDrawerOpen}
                onClose={onAddStateDrawerClose}
            >
                <StateAddForm
                    added={reloadList}
                    finished={(): void => {
                        onAddStateDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>
        </Box>
    );
};

const CustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isStatesPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        statesResponseData
    }): ReactElement => {

    const {onOpen: onEditStateDrawerOpen, isOpen: isEditStateDrawerOpen, onClose: onEditStateDrawerClose} = useDisclosure();
    const {onOpen: onChangeStateFlagDrawerOpen, isOpen: isChangeStateFlagDrawerOpen, onClose: onChangeStateFlagDrawerClose} = useDisclosure();
    const {t} = useTranslation();

    const [selectedState, setSelectedState] = useState<StateType>(defaultSelectedState);

    const flagBaseUrl: string = joinBaseUrlWithParams(statesApiURI.flag, [{param: "id", value: selectedState.id}]);

    const {
        onDeleteModalClose,
        selectedState: deletedState,
        showDeleteModal,
        isDeleteModalOpen,
        deleteStateAlertData,
        isDeleteStatePending,
        handleDeleteState,
    }: StateDeleteHookType = useStateDeleteHook({deleted: reloadList});
    const {
        onToggleModalClose,
        selectedState: toggledState,
        showToggleModal,
        isToggleModalOpen,
        toggleStateAlertData,
        isToggleStatePending,
        handleToggleState,
    }: StateToggleHookType = useStateToggleHook({toggled: reloadList});

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "state", show: true, sort: true, search: true},
        {field: "phoneCode", label: "phone_code", show: true, sort: true, search: true},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
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
                                            flag
                                            image={state.flag}
                                            title={state.name}
                                            state={state}
                                            url={`${mainRoutes.states.path}/${state.id}`}
                                            description={state.description}
                                        />
                                    </Td>
                                    <Td>{state.phoneCode}</Td>
                                    <Td>
                                        <Badge colorScheme={`${state.enabled ? "green" : "red"}`}>
                                            {t(`status_${state.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: state.createdAt})}</Td>
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
                                                    showDeleteModal(state);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.states.path}/${state.id}`}
                                                state={state}
                                                status={state.enabled}
                                                showStatusToggleModal={showToggleModal}
                                            >
                                                <MoreMenuItem
                                                    label={t("change_flag")}
                                                    icon={IconFlagCog}
                                                    showDrawer={(): void => {
                                                        onChangeStateFlagDrawerOpen();
                                                        setSelectedState(state);
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
                handleConfirm={handleDeleteState}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteStatePending}
                alertData={deleteStateAlertData}
            >
                {t("delete_state")} <strong>{deletedState.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${toggledState.enabled}`)}
                handleConfirm={handleToggleState}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleStatePending}
                alertData={toggleStateAlertData}
            >
                {t(`toggle_state_${toggledState.enabled}`)} <strong>{toggledState.name}</strong>?
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

            <DrawerForm
                title={t("change_flag")}
                isOpen={isChangeStateFlagDrawerOpen}
                onClose={onChangeStateFlagDrawerClose}
            >
                <ImageUpdateForm
                    flag
                    image={selectedState.flag}
                    imageBaseUrl={flagBaseUrl}
                />
            </DrawerForm>
        </TableContainer>
    );
};

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isStatesPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    statesResponseData: StatesResponseDataType,
}

interface StatesTableListProps {
    showCreator?: boolean;
    showCountry?: boolean;
    fetchStates?: boolean;
    statesBaseUrl: string;
}

export default StatesTableList;