import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert} from "../../../helpers/generalHelpers";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useGroupAddHook = ({added, finished}: GroupAddHookProps): GroupAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addGroupAlertData, setAddGroupAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeGroupResponse: UseMutationResult<AxiosResponse, AxiosError, GroupAddRequestDataType, any> = useMutation({
        mutationFn: storeGroupRequest,
        onError: (error: AxiosError): void => {
            setAddGroupAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: GroupAddRequestDataType): void => {
            setAddGroupAlertData({show: false});

            // Reload component
            if(next) {
                added();
                setSequence(sequence + 1);
            }
            else {
                finished();
            }

            toast({
                title: t("add"),
                description: `${t("group_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: GroupAddFormType, next: boolean = false): void => {
        const {name, slug, seoTitle, seoDescription, description}: GroupAddFormType = values;
        setAddGroupAlertData({show: false});
        setNext(next);

        storeGroupResponse.mutate({name, slug, seoTitle, seoDescription, description});
    }

    const handleAddGroup = (values: GroupAddFormType): void => save(values);
    const handleAddGroupAndContinue = (values: GroupAddFormType): void => save(values, true);

    const isAddGroupPending: boolean = storeGroupResponse.isPending;

    return {
        addGroupAlertData,
        handleAddGroup,
        handleAddGroupAndContinue,
        sequence,
        isAddGroupPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const groupAddInitialStaticValues: GroupAddFormType = {
    name: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const addGroupSchema: Yup.ObjectSchema<GroupAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface GroupAddFormType {
    name: string,
    slug: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface GroupAddRequestDataType extends GroupAddFormType {}

export interface GroupAddHookType {
    addGroupAlertData: ErrorAlertType,
    isAddGroupPending: boolean,
    sequence: number,
    handleAddGroup: (a: GroupAddFormType) => void,
    handleAddGroupAndContinue: (a: GroupAddFormType) => void,
}

interface GroupAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeGroupRequest = (values: GroupAddRequestDataType): Promise<any> => {
    const {name, slug, seoTitle, seoDescription, description}: GroupAddRequestDataType = values;
    const url: string = v1URL(groupsApiURI.store);

    return postRequest(url, {name, slug, seoTitle, seoDescription, description});
};

export default useGroupAddHook;