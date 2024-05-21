import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {VendorType} from "../show/showVendorData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editVendorInitialStaticValues: EditVendorFormType = { name: '', description: '' };

export const editVendorSchema: Yup.ObjectSchema<EditVendorFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface EditVendorFormType {
    name: string,
    description: string | null | undefined,
}

export interface EditVendorRequestDataType extends EditVendorFormType {
    id: string,
}

export interface EditVendorHookType {
    editVendorAlertData: ErrorAlertType,
    isEditVendorPending: boolean,
    isVendorPending: boolean,
    vendorAlertData: ErrorAlertType,
    formVendor: EditVendorFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    vendorResponseData: VendorType,
    handleEditVendor: (a: EditVendorFormType) => void,
}

export const updateVendorRequest = ({name, description, id}: EditVendorRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(vendorsApiURI.update, params);

    return putRequest(url, {name, description});
};