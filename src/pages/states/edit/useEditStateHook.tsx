import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {EditStateFormType, EditStateHookType, EditStateRequestDataType, updateStateRequest} from "./editStateData"
import {stateRequest, StateType, defaultSelectedState} from "../show/showStateData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";

const useEditStateHook = (): EditStateHookType => {
    let stateAlertData: ErrorAlertType = {show: false};

    let { state: _state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const state: StateType = _state;
    console.log({_state})
    const [editStateAlertData, setEditStateAlertData] = useState<ErrorAlertType>({show: false});
    const [stateQueryEnabled, setStateQueryEnabled] = useState<boolean>(false);
    const [stateResponseData, setStateResponseData] = useState<StateType>(defaultSelectedState);
    const [formState, setFormState] = useState<EditStateFormType>({...defaultSelectedState, countryId: ""});

    useEffect((): void => {
        if(state) {
            setStateResponseData(state);
            setFormState({...state, countryId: state.country?.id || ""});
        } else {
            setStateQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stateResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["state"],
        queryFn: () => stateRequest(id || ""),
        enabled: stateQueryEnabled,
    });

    const updateStateResponse: UseMutationResult<AxiosResponse, AxiosError, EditStateRequestDataType, any> = useMutation({
        mutationFn: updateStateRequest,
        onError: (error: AxiosError): void => {
            setEditStateAlertData(errorAlert(error));

            log("Update state failure", updateStateResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditStateRequestDataType): void => {
            setEditStateAlertData({show: false});

            const toastMessage: string = `Ville ${variables.name} mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(`${mainRoutes.states.path}/${stateResponseData.id}`);

            log("Update pays successful", updateStateResponse);
        }
    });

    if(stateResponse.isError) {
        stateAlertData = errorAlert(stateResponse.error);

        log("State show failure", stateResponse);
    }

    if(stateQueryEnabled && stateResponse.isSuccess && !stateResponse.isFetching) {
        const tempsState: StateType = stateResponse.data.data;

        setStateResponseData(tempsState);
        setFormState({...tempsState, countryId: tempsState.country?.id || ""});
        setStateQueryEnabled(false);

        log("States list successful", stateResponse);
    }

    const handleEditState = ({name, countryId, description}: EditStateFormType): void =>
        updateStateResponse.mutate({name, countryId, description, id: stateResponseData.id});

    const isEditStatePending: boolean = updateStateResponse.isPending;
    const isStatePending: boolean = stateResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.states.path, label: 'Villes'}];
    if(stateResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.states.path}/${stateResponseData.id}`,
            label: `Détail ville ${stateResponseData.name}`,
            state: stateResponseData
        })
    }

    return {
        editStateAlertData,
        handleEditState,
        stateResponseData,
        isStatePending,
        stateAlertData,
        formState,
        pageHeaderItems,
        isEditStatePending
    };
};

export default useEditStateHook;