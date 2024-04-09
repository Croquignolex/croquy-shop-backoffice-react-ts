import {UserType} from "../users/usersPageData";
import {ErrorAlertType} from "../../helpers/globalTypesHelper";

export const defaultSelectedState: StateType = {
    id: "",
    name: "",
    slug: "",
    enabled: false,
    description: "",
    createdAt: "",
    updatedAt: "",
    creator: null,
}

export interface StateType {
    id: string;
    name: string;
    slug: string;
    enabled: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    creator: UserType | null;
}

export const defaultStatesResponseData: StatesResponseDataType = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    numberOfElements: 0,
    number: 0,
    first: false,
    last: false,
    empty: true
}

export interface StatesResponseDataType {
    content: Array<StateType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyStateRequestDataType {
    id: string,
}

export interface StatesHookType {
    StatesResponseData: StatesResponseDataType,
    isStatesPending: boolean,
    StatesAlertData: ErrorAlertType,
    fetchPaginatedStates: (a: boolean) => void,
    fetchPaginatedNeedleStates: (a: string) => void,
    selectedState: StateType,
    showDeleteModal: (a: StateType) => void,
    isDeleteModalOpen: boolean,
    deleteStateAlertData: ErrorAlertType,
    isDeleteStatePending: boolean,
    handleDeleteState: () => void,
    onDeleteModalClose: () => void,
}