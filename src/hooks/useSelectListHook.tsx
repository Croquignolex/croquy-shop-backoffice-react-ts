import { AxiosError, AxiosResponse } from "axios";
import {useTranslation} from "react-i18next";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {getRequest} from "../helpers/axiosHelpers";
import {FormSelectOptionType} from "../components/form/SelectField";
import {API_SELECT_V1_URL} from "../helpers/apiRequestsHelpers";
import {errorAlert} from "../helpers/generalHelpers";
import {AlertStatusEnumType} from "../helpers/globalTypesHelper";

// ######################################## STATICS DATA ######################################## //

export interface SelectListHookType {
    selectList: Array<FormSelectOptionType>,
    isSelectListFetching: boolean,
    reloadList: () => void,
}

const selectListRequest = ({baseUrl}: {baseUrl: string}): Promise<any> => {
    const url: string = API_SELECT_V1_URL + baseUrl;

    return getRequest(url, {headers: {public: true}});
};

// ######################################## HOOK ######################################## //

const useSelectListHook = ({baseUrl}: {baseUrl: string}): SelectListHookType => {
    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    let selectList: Array<FormSelectOptionType> = [];

    const response: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["select-list"],
        queryFn: () => selectListRequest({baseUrl}),
    });

    if(!response.isFetching && response.isError) {
        toast({
            status: AlertStatusEnumType.ERROR,
            title: t("error"),
            description: errorAlert(response.error).message
        });
    }

    if(!response.isFetching && response.isSuccess) {
        const data: Array<any> = response.data.data || [];
        selectList = data.map((item: any): FormSelectOptionType => ({label: item?.name, key: item.id}));
    }

    const reloadList = (): void => {
        response.refetch().then();
    }

    const isSelectListFetching: boolean = response.isFetching;

    return {selectList, isSelectListFetching, reloadList};
};

export default useSelectListHook;