import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {errorAlert} from "../helpers/generalHelpers";
import {getRequest} from "../helpers/axiosHelpers";
import {ErrorAlertType} from "../helpers/globalTypesHelper";

const useGetHttpRequestHook = ({key, url, defaultResponseData = null, enableRequest = true}: any): any => {
    const [enabled, setEnabled] = useState<boolean>(enableRequest);
    const [responseData, setResponseData] = useState<any>(defaultResponseData);
    const [alertData, setAlertData] = useState<ErrorAlertType>({show: false});

    const response: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: [key],
        queryFn: () => getRequest(url),
        // enabled: enabled,
    });

    const trustedResponse: boolean = enabled && !response.isFetching && response.isFetched;

    if(trustedResponse && response.isError) {
        setEnabled(false);
        setAlertData(errorAlert(response.error));
    }

    if(trustedResponse && response.isSuccess) {
        setEnabled(false);
        setAlertData({show: false});
        setResponseData(response.data?.data);
    }

    const refetch = (): void => {
        response.refetch().then();
    }

    return {responseData, isPending: response.isPending, alertData, refetch};
};

export default useGetHttpRequestHook;