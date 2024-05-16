import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {shopsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createShopInitialStaticValues: CreateShopFormType = { name: '', slug: '', description: '' };

export const createShopSchema: Yup.ObjectSchema<CreateShopFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    slug: Yup.string()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/ , formValidationMessage.match)
        .required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface CreateShopFormType {
    name: string,
    slug: string,
    description: string | null | undefined,
}

export interface CreateShopRequestDataType extends CreateShopFormType {}

export interface ShopCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface ShopCreateFormHookType {
    createShopAlertData: ErrorAlertType,
    isCreateShopPending: boolean,
    sequence: number,
    handleCreateShop: (a: CreateShopFormType) => void,
    handleCreateShopAndContinue: (a: CreateShopFormType) => void,
}

export const storeShopRequest = ({name, slug, description}: CreateShopRequestDataType): Promise<any> => {
    const url: string = v1URL(shopsApiURI.store);

    return postRequest(url, {name, slug, description});
};