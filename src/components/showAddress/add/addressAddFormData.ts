import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {postRequest} from "../../../helpers/axiosHelpers";

export const addAddressInitialStaticValues: AddAddressFormType = {
    streetAddress: "", 
    phoneNumberOne: "",
    stateId: "",
    zipcode: "",
    phoneNumberTwo: "",
    description: "",
};

export const addAddressSchema: Yup.ObjectSchema<AddAddressFormType> = Yup.object().shape({
    streetAddress: Yup.string().required(formValidationMessage.required),
    phoneNumberOne: Yup.string().required(formValidationMessage.required),
    stateId: Yup.string().nullable(),
    zipcode: Yup.string().nullable(),
    phoneNumberTwo: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface AddAddressFormType {  
    streetAddress: string;
    zipcode: string | null | undefined;
    phoneNumberOne: string;
    phoneNumberTwo: string | null | undefined;
    description: string | null | undefined;
    stateId: string | null | undefined;
}

export interface AddAddressRequestDataType extends AddAddressFormType {
    baseUrl: string
}

export interface AddAddressFormHookeProps { 
    handleFinish: () => void;
    baseUrl: string;
}

export interface AddressAddFormHookType {
    addAddressAlertData: ErrorAlertType,
    isAddAddressPending: boolean, 
    handleAddAddress: (a: AddAddressFormType) => void, 
}

export const storeAddressRequest = ({streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description, baseUrl}: AddAddressRequestDataType): Promise<any> => {
    const url: string = v1URL(baseUrl);

    return postRequest(url, {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description});
};