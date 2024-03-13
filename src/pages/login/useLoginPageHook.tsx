import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { CreateToastFnReturn, useToast } from "@chakra-ui/react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { mainRoutes } from "../../routes/mainRoutes";
import { loginRequest } from "../../helpers/apiRequestsHelpers";
import { setLocaleStorageItem } from "../../helpers/localStorageHelpers";
import { USER_GLOBAL_STATE_TRUST_AUTHORIZED, USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, UserContext } from "../../contexts/UserContext";
import { ErrorAlertType } from "../../helpers/globalTypesHelper";
import { AlertStatusEnumType } from "../../helpers/globalTypesHelper";
import { errorAlert, log, toastAlert } from "../../helpers/generalHelpers";
import { LoginFormType, LoginResponseDataType } from "./loginPageData";

const useLoginPageHook = (): any => {
    const [alertData, setAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { setGlobalUserState } = useContext(UserContext);

    const loginResponse: UseMutationResult<any, AxiosError, any, any> = useMutation({
        mutationFn: loginRequest,
        onError: (error: AxiosError): void => {
            setAlertData(errorAlert(error, "Combinaison login ou mot de passe incorrect"));

            log("Login failure", {error});
        },
        onSuccess: (data: any): void => {
            const {accessToken, refreshToken} = data.data;
            const responseData: LoginResponseDataType = data.data;
            const toastMessage: string = `Bienvenue ${responseData.firstName}`;

            setLocaleStorageItem('user', responseData);
            setLocaleStorageItem('access-token', accessToken);
            setLocaleStorageItem('refresh-token', refreshToken);

            setGlobalUserState({type: USER_GLOBAL_STATE_TRUST_AUTHORIZED});
            setGlobalUserState({type: USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, payload: responseData});

            navigate(mainRoutes.dashboard.path);

            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            log("Login successful", responseData);
        }
    });

    const handleLogin = ({ username, password }: LoginFormType): void => loginResponse.mutate({ username, password });

    return { handleLogin, isPending: loginResponse.isPending, alertData };
};

export default useLoginPageHook;