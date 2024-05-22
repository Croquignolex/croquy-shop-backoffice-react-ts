import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {GroupType, defaultSelectedGroup, destroyGroup} from "../../../pages/groups/show/showGroupData";
import {
    GroupsResponseDataType,
    GroupsTableListHookProps,
    GroupsTableListHookType,
    defaultGroupsResponseData,
    DestroyGroupRequestDataType,
    groupsRequest,
} from "./groupsTableListData";

const useGroupsTableListHook = ({fetchGroups, groupsBaseUrl}: GroupsTableListHookProps): GroupsTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [groupsQueryEnabled, setGroupsQueryEnabled] = useState<boolean>(fetchGroups);
    const [groupsAlertData, setGroupsAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteGroupAlertData, setDeleteGroupAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedGroup, setSelectedGroup] = useState<GroupType>(defaultSelectedGroup);
    const [groupsResponseData, setGroupsResponseData] = useState<GroupsResponseDataType>(defaultGroupsResponseData);

    const groupsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["groups"],
        queryFn: () => groupsRequest(groupsResponseData.number, groupsResponseData.size, searchNeedle, groupsBaseUrl),
        enabled: groupsQueryEnabled,
    });

    const destroyGroupGroupResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyGroupRequestDataType, any> = useMutation({
        mutationFn: destroyGroup,
        onError: (error: AxiosError): void => {
            setDeleteGroupAlertData(errorAlert(error));
            setGroupsQueryEnabled(false);

            log("Destroy group failure", destroyGroupGroupResponse);
        },
        onSuccess: (): void => {
            setDeleteGroupAlertData({show: false});
            setGroupsQueryEnabled(true);

            const toastMessage: string = `Groupe ${selectedGroup.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();

            log("Destroy group successful", destroyGroupGroupResponse);
        }
    });

    if(groupsQueryEnabled && groupsResponse.isError) {
        setGroupsQueryEnabled(false);
        setGroupsAlertData(errorAlert(groupsResponse.error));

        log("Groups list failure", groupsResponse);
    }

    if(groupsQueryEnabled && groupsResponse.isSuccess && !groupsResponse.isFetching) {
        setGroupsQueryEnabled(false);
        setGroupsAlertData({show: false});

        setGroupsResponseData(groupsResponse.data.data);

        log("Groups list successful", groupsResponse);
    }

    const isGroupsPending: boolean = groupsResponse.isFetching;
    const isDeleteGroupPending: boolean = destroyGroupGroupResponse.isPending;

    const handleDeleteGroup = (): void => {
        setDeleteGroupAlertData({show: false});

        destroyGroupGroupResponse.mutate({id: selectedGroup.id});
    }

    const showDeleteModal = (group: GroupType): void => {
        onDeleteModalOpen();
        setSelectedGroup(group);
        setDeleteGroupAlertData({show: false});
    }

    const fetchPaginatedGroups = (next: boolean): void => {
        if(next && !groupsResponseData.last) setGroupsResponseData({...groupsResponseData, number: groupsResponseData.number + 1});
        else if(!next && !groupsResponseData.first) setGroupsResponseData({...groupsResponseData, number: groupsResponseData.number - 1})

        setGroupsQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleGroups = (needle: string): void => {
        setSearchNeedle(needle);
        setGroupsResponseData({...groupsResponseData, number: 0});

        setGroupsQueryEnabled(true);
    }

    return {
        groupsResponseData,
        isGroupsPending,
        groupsAlertData,
        fetchPaginatedGroups,
        fetchPaginatedNeedleGroups,
        onDeleteModalClose,
        selectedGroup,
        showDeleteModal,
        isDeleteModalOpen,
        deleteGroupAlertData,
        isDeleteGroupPending,
        handleDeleteGroup,
    };
};

export default useGroupsTableListHook;