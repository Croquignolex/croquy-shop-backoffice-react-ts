import * as Yup from "yup";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {vendorsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createVendorInitialStaticValues: CreateVendorFormType = { name: '', description: '' };

export const createVendorSchema: Yup.ObjectSchema<CreateVendorFormType> = Yup.object().shape({
    name: Yup.string().required(formValidationMessage.required),
    description: Yup.string().nullable(),
});

export interface CreateVendorFormType {
    name: string,
    description: string | null | undefined,
}

export interface CreateVendorRequestDataType extends CreateVendorFormType {}

export interface VendorCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface VendorCreateFormHookType {
    createVendorAlertData: ErrorAlertType,
    isCreateVendorPending: boolean,
    sequence: number,
    handleCreateVendor: (a: CreateVendorFormType) => void,
    handleCreateVendorAndContinue: (a: CreateVendorFormType) => void,
}

export const storeVendorRequest = ({name, description}: CreateVendorRequestDataType): Promise<any> => {
    const url: string = v1URL(vendorsApiURI.store);

    return postRequest(url, {name, description});
};