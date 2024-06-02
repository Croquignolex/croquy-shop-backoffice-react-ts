import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log} from "../../../helpers/generalHelpers";
import {
    UsersResponseDataType,
    UsersTableListHookProps,
    UsersTableListHookType,
    defaultUsersResponseData,
    usersRequest,
} from "./usersTableListData";

const useUsersTableListHook = ({fetchUsers, usersBaseUrl}: UsersTableListHookProps): UsersTableListHookType => {

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [usersQueryEnabled, setUsersQueryEnabled] = useState<boolean>(fetchUsers);
    const [usersAlertData, setUsersAlertData] = useState<ErrorAlertType>({show: false});
    const [usersResponseData, setUsersResponseData] = useState<UsersResponseDataType>(defaultUsersResponseData);

    const usersResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["users"],
        queryFn: () => usersRequest(usersResponseData.number, usersResponseData.size, searchNeedle, usersBaseUrl),
        enabled: usersQueryEnabled,
    });

    if(usersQueryEnabled && !usersResponse.isFetching && usersResponse.isError) {
        setUsersQueryEnabled(false);
        setUsersAlertData(errorAlert(usersResponse.error));

        log("Users list failure", usersResponse);
    }

    if(usersQueryEnabled && !usersResponse.isFetching && usersResponse.isSuccess) {
        setUsersQueryEnabled(false);
        setUsersAlertData({show: false});

        setUsersResponseData(usersResponse.data.data);

        log("Users list successful", usersResponse);
    }

    const isUsersPending: boolean = usersResponse.isFetching;

    const fetchPaginatedUsers = (next: boolean): void => {
        if(next && !usersResponseData.last) setUsersResponseData({...usersResponseData, number: usersResponseData.number + 1});
        else if(!next && !usersResponseData.first) setUsersResponseData({...usersResponseData, number: usersResponseData.number - 1})

        setUsersQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleUsers = (needle: string): void => {
        setSearchNeedle(needle);
        setUsersResponseData({...usersResponseData, number: 0});

        setUsersQueryEnabled(true);
    }

    return {
        usersResponseData,
        isUsersPending,
        usersAlertData,
        fetchPaginatedUsers,
        fetchPaginatedNeedleUsers,
    };
};

export default useUsersTableListHook;