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
import {GroupType, defaultSelectedGroup} from "../show/showGroupData";
import RowImage from "../../../components/RowImage";
import EditIconButton from "../../../components/form/EditIconButton";
import DeleteIconButton from "../../../components/form/DeleteButtonIcon";
import MoreIconButton from "../../../components/form/MoreButtonIcon";
import TableHeader from "../../../components/table/TableHeader";
import DrawerForm from "../../../components/DrawerForm";
import GroupEditForm from "./GroupEditForm";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import MoreMenuItem from "../../../components/form/MoreMenuItem";
import {PaginationType} from "../../../helpers/globalTypesHelper";
import {SortAndFilterRequestDataType} from "../../../hooks/useSortAndFilterHook";
import ImageUpdateForm from "../../../components/ImageUpdateForm";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../../../hooks/useIDActionRequestHook";

const GroupsCustomTable: FC<CustomTableProps> = (
    {
        showCreator = false,
        isGroupsPending,
        handleSort,
        reloadList,
        sortAndFilterData,
        groupsResponseData
    }): ReactElement => {

    const {onOpen: onEditGroupDrawerOpen, isOpen: isEditGroupDrawerOpen, onClose: onEditGroupDrawerClose} = useDisclosure();
    const {onOpen: onChangeGroupLogoDrawerOpen, isOpen: isChangeGroupLogoDrawerOpen, onClose: onChangeGroupLogoDrawerClose} = useDisclosure();
    const {onOpen: onChangeGroupBannerDrawerOpen, isOpen: isChangeGroupBannerDrawerOpen, onClose: onChangeGroupBannerDrawerClose} = useDisclosure();
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [selectedGroup, setSelectedGroup] = useState<GroupType>(defaultSelectedGroup);

    const logoBaseUrl: string = groupsApiURI.logo;
    const bannerBaseUrl: string = groupsApiURI.banner;
    const deleteBaseUrl: string = groupsApiURI.destroy;
    const toggleBaseUrl: string = groupsApiURI.toggle;

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("group_deleted", {name: selectedGroup.name})}`
        });
        reloadList();
    };

    const toggleDone = (): void => {
        toast({
            title: t(`toggle_${selectedGroup.enabled}`),
            description: `${t(`group_toggled_${selectedGroup.enabled}`, {name: selectedGroup.name})}`
        });
        reloadList();
    };

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteGroupAlertData,
        isPending: isDeleteGroupPending,
        handleRequest: handleDeleteGroup,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: deleteDone,
        item: selectedGroup,
        baseUrl: deleteBaseUrl,
        type: IDActionRequestType.DELETE
    });

    const {
        onModalClose: onToggleModalClose,
        showModal: showToggleModal,
        isModalOpen: isToggleModalOpen,
        alertData: toggleGroupAlertData,
        isPending: isToggleGroupPending,
        handleRequest: handleToggleGroup,
    }: IDActionRequestHookType = useIDActionRequestHook({
        done: toggleDone,
        item: selectedGroup,
        baseUrl: toggleBaseUrl,
        type: IDActionRequestType.TOGGLE
    });

    const fields: Array<{field: string, label: string, show: boolean, sort: boolean, search: boolean}> = [
        {field: "name", label: "group", show: true, sort: true, search: true},
        {field: "seo", label: "seo", show: true, sort: false, search: false},
        {field: "enabled", label: "status", show: true, sort: true, search: false},
        {field: "createdAt", label: "created_at", show: true, sort: true, search: false},
        {field: "creator", label: "created_by", show: showCreator, sort: false, search: false},
    ];

    return (
        <TableContainer>
            <Table size={"sm"}>
                <TableHeader fields={fields} handleSort={handleSort} sortAndFilterData={sortAndFilterData} />
                <Tbody>
                    {isGroupsPending ? <TableSkeletonLoader /> : (
                        groupsResponseData.empty ? <EmptyTableAlert /> : (
                            groupsResponseData.content.map((group: GroupType, index: number) => (
                                <Tr key={index}>
                                    <Td>
                                        <RowImage
                                            logo
                                            image={group.logo}
                                            title={group.name}
                                            state={group}
                                            url={`${mainRoutes.groups.path}/${group.id}`}
                                            description={group.description}
                                        />
                                    </Td>
                                    <Td>
                                        <RowImage
                                            plain
                                            unlink
                                            title={group.seoTitle}
                                            description={group.seoDescription}
                                        />
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={`${group.enabled ? "green" : "red"}`}>
                                            {t(`status_${group.enabled}`)}
                                        </Badge>
                                    </Td>
                                    <Td>{t("date_time", {value: group.createdAt})}</Td>
                                    {showCreator && (
                                        <Td>
                                            <RowImage
                                                user
                                                image={group.creator?.avatar}
                                                title={group.creator?.firstName}
                                                state={group.creator}
                                                url={`${mainRoutes.users.path}/${group.creator?.id}`}
                                                description={group.creator?.email || group.creator?.username}
                                            />
                                        </Td>
                                    )}
                                    <Td>
                                        <HStack>
                                            <EditIconButton
                                                showEditDrawer={(): void => {
                                                    onEditGroupDrawerOpen();
                                                    setSelectedGroup(group);
                                                }}
                                            />
                                            <DeleteIconButton
                                                showDeleteModal={(): void => {
                                                    showDeleteModal();
                                                    setSelectedGroup(group);
                                                }}
                                            />
                                            <MoreIconButton
                                                url={`${mainRoutes.groups.path}/${group.id}`}
                                                state={group}
                                                status={group.enabled}
                                                showStatusToggleModal={(): void => {
                                                    showToggleModal();
                                                    setSelectedGroup(group);
                                                }}
                                            >
                                                <MoreMenuItem
                                                    label={t("change_logo")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeGroupLogoDrawerOpen();
                                                        setSelectedGroup(group);
                                                    }}
                                                />
                                                <MoreMenuItem
                                                    label={t("change_banner")}
                                                    icon={IconPhotoCog}
                                                    showDrawer={(): void => {
                                                        onChangeGroupBannerDrawerOpen();
                                                        setSelectedGroup(group);
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
                handleConfirm={handleDeleteGroup}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteGroupPending}
                alertData={deleteGroupAlertData}
            >
                {t("delete_group")} <strong>{selectedGroup.name}</strong>?
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
                title={t(`toggle_${selectedGroup.enabled}`)}
                handleConfirm={handleToggleGroup}
                isOpen={isToggleModalOpen}
                onClose={onToggleModalClose}
                isLoading={isToggleGroupPending}
                alertData={toggleGroupAlertData}
            >
                {t(`toggle_group_${selectedGroup.enabled}`)} <strong>{selectedGroup.name}</strong>?
            </ConfirmAlertDialog>

            <DrawerForm
                title={t("edit_group")}
                isOpen={isEditGroupDrawerOpen}
                onClose={onEditGroupDrawerClose}
            >
                <GroupEditForm
                    selectedGroup={selectedGroup}
                    finished={(): void => {
                        onEditGroupDrawerClose();
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
                    item={selectedGroup}
                    image={selectedGroup.logo}
                    baseUrl={logoBaseUrl}
                />
            </DrawerForm>

            <DrawerForm
                title={t("change_banner")}
                isOpen={isChangeGroupBannerDrawerOpen}
                onClose={onChangeGroupBannerDrawerClose}
            >
                <ImageUpdateForm
                    banner
                    item={selectedGroup}
                    image={selectedGroup.banner}
                    baseUrl={bannerBaseUrl}
                />
            </DrawerForm>
        </TableContainer>
    );
};


interface GroupsResponseDataType extends PaginationType {
    content: Array<GroupType>,
}

interface CustomTableProps {
    showCreator?: boolean;
    reloadList: () => void,
    isGroupsPending: boolean;
    handleSort: (a: string, b: string) => void
    sortAndFilterData: SortAndFilterRequestDataType,
    groupsResponseData: GroupsResponseDataType,

}

export default GroupsCustomTable;