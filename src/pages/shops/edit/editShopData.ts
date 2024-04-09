import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";

export const editShopSchema: Yup.ObjectSchema<EditShopFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
    id: Yup.string().nullable(),
});

export interface EditShopRequestDataType {
    id: string | null | undefined,
    name: string,
    slug: string,
    description: string | null | undefined,
}

export interface EditShopFormType extends EditShopRequestDataType {}

export interface EditShopHookType {
    editShopAlertData: ErrorAlertType,
    isEditShopPending: boolean,
    shop: EditShopFormType,
    handleEditShop: (a: EditShopFormType) => void,
}

export const updateShopRequest = ({name, slug, description, id}: EditShopRequestDataType): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "id", value: id || ""}];
    const url: string = v1URL(shopsApiURI.update, queries);

    return putRequest(url, {name, slug, description});
};