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
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {CategoryType} from "../show/showCategoryData";

// ######################################## HOOK ######################################## //

const useCategoryEditHook = ({selectedCategory, finished}: CategoryEditHookProps): CategoryEditHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [editCategoryAlertData, setEditCategoryAlertData] = useState<ErrorAlertType>({show: false});

    const updateCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, CategoryEditRequestDataType, any> = useMutation({
        mutationFn: updateCategoryRequest,
        onError: (error: AxiosError): void => {
            setEditCategoryAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: CategoryEditRequestDataType): void => {
            setEditCategoryAlertData({show: false});

            finished();

            toast({
                title: t("edit"),
                description: `${t("category_edited", {name: variables.name})}`
            });
        }
    });

    const handleEditCategory = (values: CategoryEditFormType): void => {
        const {name, slug, groupId, seoTitle, seoDescription, description}: CategoryEditFormType = values;
        updateCategoryResponse.mutate({name, slug, groupId, seoTitle, seoDescription, description, id: selectedCategory.id});
    }

    const isEditCategoryPending: boolean = updateCategoryResponse.isPending;
    const formCategory: CategoryEditFormType = {...selectedCategory, groupId: selectedCategory.group?.id || ""};

    return {
        formCategory,
        editCategoryAlertData,
        handleEditCategory,
        isEditCategoryPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const categoryEditSchema: Yup.ObjectSchema<CategoryEditFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    groupId: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CategoryEditFormType {
    name: string,
    slug: string,
    groupId: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface CategoryEditRequestDataType extends CategoryEditFormType{
    id: string,
}

export interface CategoryEditHookType {
    editCategoryAlertData: ErrorAlertType,
    isEditCategoryPending: boolean,
    formCategory: CategoryEditFormType,
    handleEditCategory: (a: CategoryEditFormType) => void,
}

interface CategoryEditHookProps {
    selectedCategory: CategoryType;
    finished: () => void;
}

const updateCategoryRequest = (values: CategoryEditRequestDataType): Promise<any> => {
    const {name, slug, groupId, seoTitle, seoDescription, description, id}: CategoryEditRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(categoriesApiURI.update, params);

    return putRequest(url, {name, slug, groupId, seoTitle, seoDescription, description});
};

export default useCategoryEditHook;