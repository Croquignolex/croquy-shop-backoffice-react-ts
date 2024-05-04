import {UserType} from "../../pages/users/usersPageData";
import {ErrorAlertType} from "../../helpers/globalTypesHelper";
// import {StateType} from "../../pages/states/statesData";

export interface DefaultAddressHookType {
    address: AddressType,
    addressAlertData: ErrorAlertType,
    isAddressPending: boolean
}

export interface DefaultAddressHookProps {
    url: string
}

export interface AddressType {
    id: string;
    streetAddress: string;
    zipcode: string;
    phoneNumberOne: boolean;
    phoneNumberTwo: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    state: string | null;
    creator: UserType | null;
}