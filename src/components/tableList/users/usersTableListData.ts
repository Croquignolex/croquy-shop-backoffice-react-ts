import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {UserType} from "../../../pages/users/show/showUserData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultUsersResponseData: UsersResponseDataType = {
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

export interface UsersResponseDataType {
    content: Array<UserType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyUserRequestDataType {
    id: string,
}

export interface UsersTableListHookType {
    usersResponseData: UsersResponseDataType,
    isUsersPending: boolean,
    usersAlertData: ErrorAlertType,
    fetchPaginatedUsers: (a: boolean) => void,
    fetchPaginatedNeedleUsers: (a: string) => void,
}

export interface UsersTableListHookProps {
    fetchUsers: boolean,
    usersBaseUrl: string,
}

export const usersRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};