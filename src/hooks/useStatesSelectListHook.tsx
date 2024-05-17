import {useState, Dispatch, SetStateAction} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {log} from "../helpers/generalHelpers";
import {StateType} from "../pages/states/show/showStateData";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";
import {apiBaseURL} from "../constants/envConstants";

const useStatesSelectListHook = (): StatesSelectListHookType => {
    const [selectListStates, setSelectListStates] = useState<Array<FormSelectOptionType>>([]);
    const [statesQueryEnabled, setStatesQueryEnabled] = useState<boolean>(true);

    const statesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["states-select-list"],
        queryFn: () => statesSelectListRequest(),
        enabled: statesQueryEnabled,
    });

    if(statesQueryEnabled && statesResponse.isError) {
        setStatesQueryEnabled(false);

        log("States list failure", statesResponse);
    }

    if(statesQueryEnabled && statesResponse.isSuccess && !statesResponse.isFetching) {
        const states: Array<StateType> = statesResponse.data.data || [];

        const selectListStates: Array<FormSelectOptionType> = states.map((state: StateType): FormSelectOptionType => ({label: state.name, key: state.id}));

        setStatesQueryEnabled(false);
        setSelectListStates(selectListStates);

        log("Select states list successful", statesResponse);
    }

    const isSelectListStatesPending: boolean = statesResponse.isFetching;

    return {selectListStates, isSelectListStatesPending, setStatesQueryEnabled};
};

export interface StatesSelectListHookType {
    selectListStates: Array<FormSelectOptionType>,
    isSelectListStatesPending: boolean,
    setStatesQueryEnabled: Dispatch<SetStateAction<boolean>>,
}

export const statesSelectListRequest = (): Promise<any> => {
    const url: string = `${apiBaseURL}/api/v1${selectListApiURI.states}`;

    return getRequest(url, {headers: {public: true}});
};

export default useStatesSelectListHook;