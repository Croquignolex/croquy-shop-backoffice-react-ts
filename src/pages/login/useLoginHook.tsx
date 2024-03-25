import { useContext, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { CreateToastFnReturn, useToast } from "@chakra-ui/react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { mainRoutes } from "../../routes/mainRoutes";
import { loginRequest } from "../../helpers/apiRequestsHelpers";
import { setLocaleStorageItem } from "../../helpers/localStorageHelpers";
import { ErrorAlertType } from "../../helpers/globalTypesHelper";
import { AlertStatusEnumType } from "../../helpers/globalTypesHelper";
import { errorAlert, log, toastAlert } from "../../helpers/generalHelpers";
import {LoginFormType, LoginHookType, LoginResponseDataType} from "./loginData";
import {
    USER_GLOBAL_STATE_TRUST_AUTHORIZED,
    USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, UserContext
} from "../../contexts/UserContext";

const useLoginPageHook = (): LoginHookType => {
    const [alertData, setAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { setGlobalUserState } = useContext(UserContext);

    const loginResponse: UseMutationResult<AxiosResponse, AxiosError, LoginFormType, any> = useMutation({
        mutationFn: loginRequest,
        onError: (error: AxiosError): void => {
            setAlertData(errorAlert(error, "Combinaison login ou mot de passe incorrect"));

            log("Login failure", error);
        },
        onSuccess: (data: AxiosResponse): void => {
            setAlertData({show: false});

            const {accessToken, refreshToken} = data.data;
            const responseData: LoginResponseDataType = data.data;

            setLocaleStorageItem('user', responseData);
            setLocaleStorageItem('access-token', accessToken);
            setLocaleStorageItem('refresh-token', refreshToken);

            setGlobalUserState({type: USER_GLOBAL_STATE_TRUST_AUTHORIZED});
            setGlobalUserState({type: USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, payload: responseData});

            const toastMessage: string = `Bienvenue ${responseData.firstName}`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            navigate(mainRoutes.dashboard.path);

            log("Login successful", data);
        }
    });

    const handleLogin = ({username, password}: LoginFormType): void => {
        setAlertData({show: false});

        loginResponse.mutate({username, password});
    }

    return { handleLogin, isPending: loginResponse.isPending, alertData };
};

export default useLoginPageHook;