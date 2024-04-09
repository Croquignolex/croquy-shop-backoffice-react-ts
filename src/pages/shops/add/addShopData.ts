import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";
import {v1URL} from "../../../helpers/apiRequestsHelpers";

export const addShopInitialStaticValues: AddShopFormType = { name: '', slug: '', description: '' };

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
    sequence: number,
    handleAddShop: (a: AddShopFormType) => void,
    handleAddShopAndContinue: (a: AddShopFormType) => void,
}

export const storeShopRequest = ({name, slug, description}: AddShopRequestDataType): Promise<any> => {
    const url: string = v1URL(shopsApiURI.store);

    return postRequest(url, {name, slug, description});
};