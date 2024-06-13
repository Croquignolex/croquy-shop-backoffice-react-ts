import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {GroupType} from "../pages/groups/show/showGroupData";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";
import {apiBaseURL} from "../constants/envConstants";

// ######################################## STATICS DATA ######################################## //

export interface GroupsSelectListHookType {
    selectListGroups: Array<FormSelectOptionType>,
    isSelectListGroupsFetching: boolean,
    reloadList: () => void,
}

const groupsSelectListRequest = (): Promise<any> => {
    const url: string = `${apiBaseURL}/api/v1${selectListApiURI.groups}`;

    return getRequest(url, {headers: {public: true}});
};

// ######################################## HOOK ######################################## //

const useGroupsSelectListHook = (): GroupsSelectListHookType => {
    let selectListGroups: Array<FormSelectOptionType> = [];

    const groupsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["groups-select-list"],
        queryFn: () => groupsSelectListRequest(),
    });

    if(!groupsResponse.isFetching && groupsResponse.isSuccess) {
        const groups: Array<GroupType> = groupsResponse.data.data || [];
        selectListGroups = groups.map((group: GroupType): FormSelectOptionType => ({label: group.name, key: group.id}));
    }

    const reloadList = (): void => {
        groupsResponse.refetch().then();
    }

    const isSelectListGroupsFetching: boolean = groupsResponse.isFetching;

    return {selectListGroups, isSelectListGroupsFetching, reloadList};
};

export default useGroupsSelectListHook;