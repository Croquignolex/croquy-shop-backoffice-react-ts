import * as Yup from "yup";

import {ErrorAlertType} from "../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../constants/generalConstants";

export const addShopInitialValues: AddShopFormType = { name: '', slug: '', description: '' };

export const addShopSchema: Yup.ObjectSchema<AddShopFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface AddShopRequestDataType {
    name: string,
    slug: string,
    description: string | null | undefined,
}

export interface AddShopFormType extends AddShopRequestDataType {}

export interface AddShopHookType {
    addShopAlertData: ErrorAlertType,
    isAddShopPending: boolean,
    handleAddShop: (a: AddShopFormType) => void,
}