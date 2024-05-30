import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {groupRequest, GroupType, defaultSelectedGroup} from "../show/showGroupData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditGroupFormType,
    EditGroupHookType,
    editGroupInitialStaticValues,
    EditGroupRequestDataType,
    updateGroupRequest
} from "./editGroupData"

const useEditGroupHook = (): EditGroupHookType => {
    let groupAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const group: GroupType = state;

    const [editGroupAlertData, setEditGroupAlertData] = useState<ErrorAlertType>({show: false});
    const [groupQueryEnabled, setGroupQueryEnabled] = useState<boolean>(false);
    const [groupResponseData, setGroupResponseData] = useState<GroupType>(defaultSelectedGroup);
    const [formGroup, setFormGroup] = useState<EditGroupFormType>(editGroupInitialStaticValues);

    useEffect((): void => {
        if(group) {
            setGroupResponseData(group);
            setFormGroup(group);
        } else {
            setGroupQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const groupResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["group"],
        queryFn: () => groupRequest(id || ""),
        enabled: groupQueryEnabled,
    });

    const updateGroupResponse: UseMutationResult<AxiosResponse, AxiosError, EditGroupRequestDataType, any> = useMutation({
        mutationFn: updateGroupRequest,
        onError: (error: AxiosError): void => {
            setEditGroupAlertData(errorAlert(error));

            log("Update group failure", updateGroupResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditGroupRequestDataType): void => {
            setEditGroupAlertData({show: false});

            const toastMessage: string = `Groupe ${variables.name} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(`${mainRoutes.groups.path}/${groupResponseData.id}`);

            log("Update group successful", updateGroupResponse);
        }
    });

    if(groupResponse.isError) {
        groupAlertData = errorAlert(groupResponse.error);

        log("Group show failure", groupResponse);
    }

    if(groupQueryEnabled && groupResponse.isSuccess && !groupResponse.isFetching) {
        setGroupResponseData(groupResponse.data.data);
        setFormGroup(groupResponse.data.data);
        setGroupQueryEnabled(false);

        log("Groups list successful", groupResponse);
    }

    const handleEditGroup = (values: EditGroupFormType): void => {
        const {name, slug, seoTitle, seoDescription, description}: EditGroupFormType = values;
        updateGroupResponse.mutate({name, slug, seoTitle, seoDescription, description, id: groupResponseData.id});
    }

    const isEditGroupPending: boolean = updateGroupResponse.isPending;
    const isGroupPending: boolean = groupResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.groups.path, label: 'Groupes'}];
    if(groupResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.groups.path}/${groupResponseData.id}`,
            label: `Détail groupe ${groupResponseData.name}`,
            state: groupResponseData
        })
    }

    return {
        editGroupAlertData,
        handleEditGroup,
        groupResponseData,
        isGroupPending,
        groupAlertData,
        formGroup,
        pageHeaderItems,
        isEditGroupPending
    };
};

export default useEditGroupHook;