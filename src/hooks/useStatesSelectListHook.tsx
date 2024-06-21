import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

// import {StateType} from "../pages/states/show/showStateData";
import {getRequest} from "../helpers/axiosHelpers";
import {selectListApiURI} from "../constants/apiURIConstants";
import {FormSelectOptionType} from "../components/form/SelectField";
import {apiBaseURL} from "../constants/envConstants";

// ######################################## STATICS DATA ######################################## //

export interface StatesSelectListHookType {
    selectListStates: Array<FormSelectOptionType>,
    isSelectListStatesFetching: boolean,
    reloadList: () => void,
}

const statesSelectListRequest = (): Promise<any> => {
    const url: string = `${apiBaseURL}/api/v1${selectListApiURI.states}`;

    return getRequest(url, {headers: {public: true}});
};

// ######################################## HOOK ######################################## //

const useStatesSelectListHook = (): StatesSelectListHookType => {
    let selectListStates: Array<FormSelectOptionType> = [];

    const statesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["states-select-list"],
        queryFn: () => statesSelectListRequest(),
    });

    /*if(!statesResponse.isFetching && statesResponse.isSuccess) {
        const states: Array<StateType> = statesResponse.data.data || [];
        selectListStates = states.map((state: StateType): FormSelectOptionType => ({label: state.name, key: state.id}));
    }*/

    const reloadList = (): void => {
        statesResponse.refetch().then();
    }

    const isSelectListStatesFetching: boolean = statesResponse.isFetching;

    return {selectListStates, isSelectListStatesFetching, reloadList};
};

export default useStatesSelectListHook;