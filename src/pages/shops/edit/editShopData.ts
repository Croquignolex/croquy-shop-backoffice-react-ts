import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {ShopType} from "../show/showShopData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editShopInitialStaticValues: EditShopFormType = { name: '', slug: '', description: '' };

export const editShopSchema: Yup.ObjectSchema<EditShopFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface EditShopFormType {
    name: string,
    slug: string,
    description: string | null | undefined,
}

export interface EditShopRequestDataType extends EditShopFormType {
    id: string,
}

export interface EditShopHookType {
    editShopAlertData: ErrorAlertType,
    isEditShopPending: boolean,
    isShopPending: boolean,
    shopAlertData: ErrorAlertType,
    formShop: EditShopFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    shopResponseData: ShopType,
    handleEditShop: (a: EditShopFormType) => void,
}

export const updateShopRequest = ({name, slug, description, id}: EditShopRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(shopsApiURI.update, params);

    return putRequest(url, {name, slug, description});
};