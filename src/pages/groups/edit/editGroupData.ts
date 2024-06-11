import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {GroupType} from "../show/showGroupData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";

export const editGroupInitialStaticValues: EditGroupFormType = {
    name: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    description: ''
};

export const editGroupSchema: Yup.ObjectSchema<EditGroupFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    seoTitle: Yup.string().nullable(),
    seoDescription: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface EditGroupFormType {
    name: string,
    slug: string,
    seoTitle: string | null | undefined,
    seoDescription: string | null | undefined,
    description: string | null | undefined,
}

export interface EditGroupRequestDataType extends EditGroupFormType {
    id: string,
}

export interface EditGroupHookType {
    editGroupAlertData: ErrorAlertType,
    isEditGroupPending: boolean,
    isGroupPending: boolean,
    groupAlertData: ErrorAlertType,
    formGroup: EditGroupFormType,
    pageHeaderItems: Array<any>,
    groupResponseData: GroupType,
    handleEditGroup: (a: EditGroupFormType) => void,
}

export const updateGroupRequest = (values: EditGroupRequestDataType): Promise<any> => {
    const {name, slug, seoTitle, seoDescription, description, id}: EditGroupRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(groupsApiURI.update, params);

    return putRequest(url, {name, slug, seoTitle, seoDescription, description});
};