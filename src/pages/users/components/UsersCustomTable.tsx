import React, {FC, ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconPhotoCog} from "@tabler/icons-react";
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
import {UserType, defaultSelectedUser} from "../show/showUserData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import UserEditForm from "./UserEditForm";
import {usersApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import {joinBaseUrlWithParams} from "../../../helpers/apiRequestsHelpers";
import EnumBadge from "../../../components/EnumBadge";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const UsersCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isUsersPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        usersResponseData
    }): ReactElement => {

    const {onOpen: onEditUserDrawerOpen, isOpen: isEditUserDrawerOpen, onClose: onEditUserDrawerClose} = useDisclosure();
    const {onOpen: onChangeUserLogoDrawerOpen, isOpen: isChangeUserLogoDrawerOpen, onClose: onChangeUserLogoDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedUser, setSelectedUser] = useState<UserType>(defaultSelectedUser);

    const toggleUri: string = joinBaseUrlWithParams(usersApiURI.toggle, [{param: "id", value: selectedUser.id}]);

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedUser.enabled}`),
            description: `${t(`user_toggled_${selectedUser.enabled}`, {name: selectedUser.firstName})}`
        });
        reloadList();
    };

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleUserAlertData,
        isPending: isToggleUserPending,
        handleRequest: handleToggleUser,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        uri: toggleUri,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "firstName", label: "user", show: true, sort: true, search: true},
        {field: "address", label: "address", show: true, sort: false, search: false},
        {field: "role", label: "role", show: true, sort: false, search: false},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isUsersPending ? <TableSkeletonLoader /> : (
                        usersResponseData.empty ? <EmptyTableAlert /> : (
                            usersResponseData.content.map((user: UserType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            user
                                            image={user?.avatar}
                                            title={user?.firstName}
                                            state={user}
                                            url={`${mainRoutes.users.path}/${user?.id}`}
                                            description={user?.email || user?.username}
                                        />
                                    </Td>
                                    <Td>
                                        <RowImage
                                            plain
                                            unlink
                                            title={user.defaultAddress?.phoneNumberOne}
                                            description={user.defaultAddress?.streetAddress}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme="gray">
                                            {t(user.role)}
                                        </Badge>
                                     </Td>
                                    <Td>
                                        <Badge colorScheme={`${user.enabled ? "green" : "red"}`}>
                                            {t(`status_${user.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: user.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={user.creator?.avatar}
                                                title={user.creator?.firstName}
                                                state={user.creator}
                                                url={`${mainRoutes.users.path}/${user.creator?.id}`}
                                                description={user.creator?.email || user.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditUserDrawerOpen();
                                                    setSelectedUser(user);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.users.path}/${user.id}`}
                                                state={user}
                                                status={user.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedUser(user);
                                                }}
                                            >
                                                <MenuDivider />
                                                <MoreMenuItem
                                                    label={t("change_logo")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeUserLogoDrawerOpen();
                                                        setSelectedUser(user);
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
                title={t(`toggle_${selectedUser.enabled}`)}
                handleConfirm={handleToggleUser}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleUserPending}
                alertData={toggleUserAlertData}
            >
                {t(`toggle_user_${selectedUser.enabled}`)} <strong>{selectedUser.firstName}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_user")}
                isOpen={isEditUserDrawerOpen}
                onClose={onEditUserDrawerClose}
            >
                <UserEditForm
                    selectedUser={selectedUser}
                    finished={(): void => {
                        onEditUserDrawerClose();
                        reloadList();
                    }}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_logo")}
                isOpen={isChangeUserLogoDrawerOpen}
                onClose={onChangeUserLogoDrawerClose}
            >

            </DrawerForm>
        </TableContainer>
    );
};


interface UsersResponseDataType extends PaginationType {
    content: Array<UserType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isUsersPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    usersResponseData: UsersResponseDataType,

}

export default UsersCustomTable;