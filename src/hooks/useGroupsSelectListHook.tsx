import {useState, Dispatch, SetStateAction} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {log} from "../helpers/generalHelpers";
import {GroupType} from "../pages/groups/show/showGroupData";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";
import {apiBaseURL} from "../constants/envConstants";

const useGroupsSelectListHook = (): GroupsSelectListHookType => {
    const [selectListGroups, setSelectListGroups] = useState<Array<FormSelectOptionType>>([]);
    const [groupsQueryEnabled, setGroupsQueryEnabled] = useState<boolean>(true);

    const groupsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["groups-select-list"],
        queryFn: () => groupsSelectListRequest(),
        enabled: groupsQueryEnabled,
    });

    if(groupsQueryEnabled && groupsResponse.isError) {
        setGroupsQueryEnabled(false);

        log("Groups list failure", groupsResponse);
    }

    if(groupsQueryEnabled && groupsResponse.isSuccess && !groupsResponse.isFetching) {
        const groups: Array<GroupType> = groupsResponse.data.data || [];

        const selectListGroups: Array<FormSelectOptionType> = groups.map((group: GroupType): FormSelectOptionType => ({label: group.name, key: group.id}));

        setGroupsQueryEnabled(false);
        setSelectListGroups(selectListGroups);

        log("Select groups list successful", groupsResponse);
    }

    const isSelectListGroupsPending: boolean = groupsResponse.isFetching;

    return {selectListGroups, isSelectListGroupsPending, setGroupsQueryEnabled};
};

export interface GroupsSelectListHookType {
    selectListGroups: Array<FormSelectOptionType>,
    isSelectListGroupsPending: boolean,
    setGroupsQueryEnabled: Dispatch<SetStateAction<boolean>>,
}

export const groupsSelectListRequest = (): Promise<any> => {
    const url: string = `${apiBaseURL}/api/v1${selectListApiURI.groups}`;

    return getRequest(url, {headers: {public: true}});
};

export default useGroupsSelectListHook;