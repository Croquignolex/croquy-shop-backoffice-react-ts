import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { usersRequest } from "../../helpers/apiRequestsHelpers";
import { USERS_GLOBAL_STATE_UPDATE_FULL_DATA, UsersContext } from "../../contexts/UsersContext";
import { ErrorAlertType } from "../../helpers/globalTypesHelper";
import { errorAlert } from "../../helpers/generalHelpers";
import { UsersResponseDataType } from "./usersPageData";

const useUsersPageHook = (): any => {
    let alertData: ErrorAlertType = {show: false};

    const { globalUsersState, setGlobalUsersState } = useContext(UsersContext);

    const [usersQueryEnabled, setUsersQueryEnabled] = useState<boolean>(true)
    const [users, setUsers] = useState<UsersResponseDataType>(globalUsersState);

    const usersResponse: UseQueryResult<any, AxiosError> = useQuery({
        queryKey: ["users"],
        queryFn: () => usersRequest(),
        enabled: usersQueryEnabled,
    });

    if(usersResponse.isError) {
        console.log(usersResponse.error)
        alertData = errorAlert(usersResponse.error);
    }

    if(usersQueryEnabled && usersResponse.isSuccess) {
        setUsersQueryEnabled(false);

        let responseData: UsersResponseDataType = usersResponse.data;

        setGlobalUsersState({type: USERS_GLOBAL_STATE_UPDATE_FULL_DATA, payload: responseData})

        setUsers(responseData);
    }

    const isPending: boolean = usersResponse.isPending;

    return { users, isPending, alertData };
};

export default useUsersPageHook;