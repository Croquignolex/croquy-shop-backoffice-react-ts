import * as Yup from "yup";

import {AddressType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {patchRequest} from "../../../helpers/axiosHelpers";

export const updateAddressInitialStaticValues: UpdateAddressFormType = {
    streetAddress: "", 
    phoneNumberOne: "",
    stateId: "",
    zipcode: "",
    phoneNumberTwo: "",
    description: "",
};

export const addAddressSchema: Yup.ObjectSchema<UpdateAddressFormType> = Yup.object().shape({
    streetAddress: Yup.string().required(formValidationMessage.required),
    phoneNumberOne: Yup.string().required(formValidationMessage.required),
    stateId: Yup.string().nullable(),
    zipcode: Yup.string().nullable(),
    phoneNumberTwo: Yup.string().nullable(),
    description: Yup.string().nullable(),
});

export interface UpdateAddressFormType {
    streetAddress: string;
    zipcode: string | null | undefined;
    phoneNumberOne: string;
    phoneNumberTwo: string | null | undefined;
    description: string | null | undefined;
    stateId: string | null | undefined;
}

export interface UpdateAddressRequestDataType extends UpdateAddressFormType {
    baseUrl: string
}

export interface UpdateAddressFormHookeProps {
    handleAddressUpdate: (a: AddressType | null) => void,
    address: AddressType | null,
    baseUrl: string;
}

export interface UpdateAddressFormHookType {
    addAddressAlertData: ErrorAlertType,
    isAddAddressPending: boolean, 
    handleAddAddress: (a: UpdateAddressFormType) => void,
}

export const updateAddressRequest = (values: UpdateAddressRequestDataType): Promise<any> => {
    const {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description, baseUrl}: UpdateAddressRequestDataType = values;
    const url: string = v1URL(baseUrl);

    return patchRequest(url, {streetAddress, phoneNumberOne, stateId, zipcode, phoneNumberTwo, description});
};