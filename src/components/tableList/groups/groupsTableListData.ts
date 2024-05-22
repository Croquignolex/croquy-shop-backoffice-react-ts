import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {GroupType} from "../../../pages/groups/show/showGroupData";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {getRequest} from "../../../helpers/axiosHelpers";

export const defaultGroupsResponseData: GroupsResponseDataType = {
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

export interface GroupsResponseDataType {
    content: Array<GroupType>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    last: boolean,
    empty: boolean,
}

export interface DestroyGroupRequestDataType {
    id: string,
}

export interface GroupsTableListHookType {
    groupsResponseData: GroupsResponseDataType,
    isGroupsPending: boolean,
    groupsAlertData: ErrorAlertType,
    fetchPaginatedGroups: (a: boolean) => void,
    fetchPaginatedNeedleGroups: (a: string) => void,
    selectedGroup: GroupType,
    showDeleteModal: (a: GroupType) => void,
    isDeleteModalOpen: boolean,
    deleteGroupAlertData: ErrorAlertType,
    isDeleteGroupPending: boolean,
    handleDeleteGroup: () => void,
    onDeleteModalClose: () => void,
}

export interface GroupsTableListHookProps {
    fetchGroups: boolean,
    groupsBaseUrl: string,
}

export const groupsRequest = (page: number, size: number, needle: string, baseUrl: string): Promise<any> => {
    const queries: Array<URLParamType> = [{param: "page", value: page.toString()}, {param: "size", value: size.toString()}, {param: "needle", value: needle}];
    const url: string = v1URL(baseUrl, [], queries);

    return getRequest(url);
};