import * as Yup from "yup";

import {ErrorAlertType} from "../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../constants/generalConstants";

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