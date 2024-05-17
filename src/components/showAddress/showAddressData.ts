import {AddressType, ErrorAlertType} from "../../helpers/globalTypesHelper";
import {deleteRequest} from "../../helpers/axiosHelpers";
import {v1URL} from "../../helpers/apiRequestsHelpers";

export interface DestroyAddressRequestDataType {
    baseUrl: string,
}

export interface ShowAddressHookType {
    deleteAddressAlertData: ErrorAlertType,
    isDeleteAddressPending: boolean,
    isDeleteModalOpen: boolean,
    showDeleteModal: () => void,
    handleDeleteAddress: () => void,
    onDeleteModalClose: () => void,
}

export interface ShowAddressHookProps {
    addressBaseUrl: string,
    handleAddressUpdate: (a: AddressType | null) => void,
}

export const destroyAddressRequest = ({baseUrl}: DestroyAddressRequestDataType): Promise<any> => {
    const url: string = v1URL(baseUrl);

    return deleteRequest(url);
};