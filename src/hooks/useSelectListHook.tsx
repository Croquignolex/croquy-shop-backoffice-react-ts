import { AxiosError, AxiosResponse } from "axios";
import {useTranslation} from "react-i18next";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {getRequest} from "../helpers/axiosHelpers";
import {API_SELECT_V1_URL} from "../helpers/apiRequestsHelpers";
import {errorAlert} from "../helpers/generalHelpers";
import {AlertStatusEnumType} from "../helpers/globalTypesHelper";
import {SelectInputOptionType} from "../components/form/SelectInput";

// ######################################## HOOK ######################################## //

const useSelectListHook = ({baseUrl}: {baseUrl: string}): SelectListHookType => {
    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    let selectList: Array<SelectInputOptionType> = [];

    const response: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["select-list", baseUrl],
        queryFn: () => request({baseUrl}),
    });

    if(!response.isFetching && response.isError) {
        toast({
            status: AlertStatusEnumType.ERROR,
            title: t("error"),
            description: t(errorAlert(response.error)?.message || "")
        });
    }

    if(!response.isFetching && response.isSuccess) {
        const data: Array<any> = response.data.data || [];
        selectList = data.map((item: any): SelectInputOptionType => ({label: item?.name, value: item.id}));
    }

    const reloadList = (): void => {
        response.refetch().then();
    }

    const isSelectListFetching: boolean = response.isFetching;

    return {selectList, isSelectListFetching, reloadList};
};

// ######################################## STATICS DATA ######################################## //

export interface SelectListHookType {
    selectList: Array<SelectInputOptionType>,
    isSelectListFetching: boolean,
    reloadList: () => void,
}

const request = ({baseUrl}: {baseUrl: string}): Promise<any> => {
    const url: string = API_SELECT_V1_URL + baseUrl;

    return getRequest(url, {headers: {public: true}});
};

export default useSelectListHook;