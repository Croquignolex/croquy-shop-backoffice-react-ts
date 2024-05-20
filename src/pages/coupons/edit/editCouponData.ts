import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {countriesApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {CountryType} from "../show/showCouponData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

export const editCountryInitialStaticValues: EditCountryFormType = { name: '', phoneCode: '', description: '' };

export const editCountrySchema: Yup.ObjectSchema<EditCountryFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    phoneCode: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface EditCountryFormType {
    name: string,
    phoneCode: string | null | undefined,
    description: string | null | undefined,
}

export interface EditCountryRequestDataType extends EditCountryFormType {
    id: string,
}

export interface EditCountryHookType {
    editCountryAlertData: ErrorAlertType,
    isEditCountryPending: boolean,
    isCountryPending: boolean,
    countryAlertData: ErrorAlertType,
    formCountry: EditCountryFormType,
    pageHeaderItems: Array<BreadcrumbItemsType>,
    countryResponseData: CountryType,
    handleEditCountry: (a: EditCountryFormType) => void,
}

export const updateCountryRequest = ({name, phoneCode, description, id}: EditCountryRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(countriesApiURI.update, params);

    return putRequest(url, {name, phoneCode, description});
};