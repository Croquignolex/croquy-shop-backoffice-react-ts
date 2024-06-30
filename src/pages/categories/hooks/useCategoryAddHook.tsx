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
import {categoriesApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";
import {CreateCategoryRequestDataType} from "../../../components/createForm/category/categoryCreateFormData";

// ######################################## HOOK ######################################## //

const useCategoryAddHook = ({added, finished}: CategoryAddHookProps): CategoryAddHookType => {
    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const [addCategoryAlertData, setAddCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const storeCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, CategoryAddRequestDataType, any> = useMutation({
        mutationFn: storeCategoryRequest,
        onError: (error: AxiosError): void => {
            setAddCategoryAlertData(errorAlert(error));
        },
        onSuccess: (data: AxiosResponse, variables: CategoryAddRequestDataType): void => {
            setAddCategoryAlertData({show: false});

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
                description: `${t("category_added", {name: variables.name})}`
            });
        }
    });

    const save = (values: CategoryAddFormType, next: boolean = false): void => {
        const {name, slug, groupId, seoTitle, seoDescription, description}: CategoryAddFormType = values;
        setAddCategoryAlertData({show: false});
        setNext(next);

        storeCategoryResponse.mutate({name, slug, groupId, seoTitle, seoDescription, description});
    }

    const handleAddCategory = (values: CategoryAddFormType): void => save(values);
    const handleAddCategoryAndContinue = (values: CategoryAddFormType): void => save(values, true);

    const isAddCategoryPending: boolean = storeCategoryResponse.isPending;

    return {
        addCategoryAlertData,
        handleAddCategory,
        handleAddCategoryAndContinue,
        sequence,
        isAddCategoryPending
    };
};

// ######################################## STATICS DATA ######################################## //

export const categoryAddInitialStaticValues: CategoryAddFormType = {
    name: '',
    slug: '',
    groupId: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const categoryAddSchema: Yup.ObjectSchema<CategoryAddFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    groupId: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface CategoryAddFormType {
    name: string,
    slug: string,
    groupId: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

interface CategoryAddRequestDataType extends CategoryAddFormType {}

export interface CategoryAddHookType {
    addCategoryAlertData: ErrorAlertType,
    isAddCategoryPending: boolean,
    sequence: number,
    handleAddCategory: (a: CategoryAddFormType) => void,
    handleAddCategoryAndContinue: (a: CategoryAddFormType) => void,
}

interface CategoryAddHookProps {
    added: () => void;
    finished: () => void;
}

const storeCategoryRequest = (values: CreateCategoryRequestDataType): Promise<any> => {
    const {name, slug, groupId, seoTitle, seoDescription, description}: CreateCategoryRequestDataType = values;
    const url: string = v1URL(categoriesApiURI.store);

    return postRequest(url, {name, slug, groupId, seoTitle, seoDescription, description});
};

export default useCategoryAddHook;