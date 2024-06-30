import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType, MediaType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
// import {DestroyGroupRequestDataType} from "../../../components/tableList/groups/groupsTableListData";
import {
    groupRequest,
    GroupType,
    defaultSelectedGroup,
    destroyGroup,
    ShowGroupHookType,
    toggleGroup,
    ToggleGroupRequestDataType
} from "./showGroupData";

const useShowGroupHook = (): ShowGroupHookType => {
    let groupAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [groupQueryEnabled, setGroupQueryEnabled] = useState<boolean>(true);
    const [deleteGroupAlertData, setDeleteGroupAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleGroupAlertData, setToggleGroupAlertData] = useState<ErrorAlertType>({show: false});
    const [groupResponseData, setGroupResponseData] = useState<GroupType>(defaultSelectedGroup);

    const groupResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["group"],
        queryFn: () => groupRequest(id || ""),
        enabled: groupQueryEnabled,
    });

    const destroyGroupGroupResponse: UseMutationResult<AxiosResponse, AxiosError, any, any> = useMutation({
        mutationFn: destroyGroup,
        onError: (error: AxiosError): void => {
            setDeleteGroupAlertData(errorAlert(error));

            log("Destroy group failure", destroyGroupGroupResponse);
        },
        onSuccess: (): void => {
            setDeleteGroupAlertData({show: false});

            const toastMessage: string = `Groupe ${groupResponseData.name} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.groups.path}`);

            log("Destroy group successful", destroyGroupGroupResponse);
        }
    });

    const toggleGroupGroupResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleGroupRequestDataType, any> = useMutation({
        mutationFn: toggleGroup,
        onError: (error: AxiosError): void => {
            setToggleGroupAlertData(errorAlert(error));

            log("Toggle group failure", toggleGroupGroupResponse);
        },
        onSuccess: (): void => {
            setToggleGroupAlertData({show: false});

            const toastMessage: string = `Groupe ${groupResponseData.name} ${groupResponseData.enabled ? "désactivé" : "activé"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setGroupResponseData({...groupResponseData, enabled: !groupResponseData.enabled});

            log("Toggle group successful", toggleGroupGroupResponse);
        }
    });

    if(groupResponse.isError) {
        groupAlertData = errorAlert(groupResponse.error);

        log("Group show failure", groupResponse);
    }

    if(groupQueryEnabled && groupResponse.isSuccess && !groupResponse.isFetching) {
        setGroupQueryEnabled(false);
        setGroupResponseData(groupResponse.data.data);

        log("Groups list successful", groupResponse);
    }

    const isGroupPending: boolean = groupResponse.isFetching;
    const isDeleteGroupPending: boolean = destroyGroupGroupResponse.isPending;
    const isToggleGroupPending: boolean = toggleGroupGroupResponse.isPending;

    const handleDeleteGroup = (): void => {
        setDeleteGroupAlertData({show: false});

        destroyGroupGroupResponse.mutate({id: groupResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteGroupAlertData({show: false});
    }

    const handleToggleGroup = (): void => {
        setToggleGroupAlertData({show: false});

        toggleGroupGroupResponse.mutate({id: groupResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleGroupAlertData({show: false});
    }

    const handleLogoUpdate = (logo: MediaType | null): void => {
        setGroupResponseData({...groupResponseData, logo});
    }

    const handleBannerUpdate = (banner: MediaType | null): void => {
        setGroupResponseData({...groupResponseData, banner});
    }

    const handleTabsChange = (index: number) => {
        console.log({index})
    }

    return {
        isGroupPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteGroupAlertData,
        isDeleteGroupPending,
        handleDeleteGroup,
        groupAlertData,
        groupResponseData,
        handleToggleGroup,
        isToggleGroupPending,
        toggleGroupAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleLogoUpdate,
        handleTabsChange,
        handleBannerUpdate
    };
};

export default useShowGroupHook;