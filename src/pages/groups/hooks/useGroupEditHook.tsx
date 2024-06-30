import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {GroupType} from "../show/showGroupData";

// ######################################## HOOK ######################################## //

const useGroupEditHook = ({selectedGroup, finished}: GroupEditHookProps): GroupEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editGroupAlertData, setEditGroupAlertData] = useState<ErrorAlertType>({show: false});

    const updateGroupResponse: UseMutationResult<AxiosResponse, AxiosError, GroupEditRequestDataType, any> = useMutation({
        mutationFn: updateGroupRequest,
        onError: (error: AxiosError): void => {
            setEditGroupAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: GroupEditRequestDataType): void => {
            setEditGroupAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("group_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditGroup = (values: GroupEditFormType): void => {
        const {name, slug, seoTitle, seoDescription, description}: GroupEditFormType = values;
        updateGroupResponse.mutate({name, slug, seoTitle, seoDescription, description, id: selectedGroup.id});
    }

    const isEditGroupPending: boolean = updateGroupResponse.isPending;
    const formGroup: GroupEditFormType = selectedGroup;

    return {
        formGroup,
        editGroupAlertData,
        handleEditGroup,
        isEditGroupPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const groupEditSchema: Yup.ObjectSchema<GroupEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface GroupEditFormType {
    name: string,
    slug: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface GroupEditRequestDataType extends GroupEditFormType{
    id: string,
}

export interface GroupEditHookType {
    editGroupAlertData: ErrorAlertType,
    isEditGroupPending: boolean,
    formGroup: GroupEditFormType,
    handleEditGroup: (a: GroupEditFormType) => void,
}

interface GroupEditHookProps {
    selectedGroup: GroupType;
    finished: () => void;
}

const updateGroupRequest = (values: GroupEditRequestDataType): Promise<any> => {
    const {name, slug, seoTitle, seoDescription, description, id}: GroupEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(groupsApiURI.update, params);

    return putRequest(url, {name, slug, seoTitle, seoDescription, description});
};

export default useGroupEditHook;