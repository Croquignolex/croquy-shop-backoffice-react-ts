import { useContext, useState } from "react";
import * as Yup from "yup";
import { AxiosError, AxiosResponse } from "axios";
import { CreateToastFnReturn, useToast } from "@chakra-ui/react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { mainRoutes } from "../../routes/mainRoutes";
import { setLocaleStorageItem } from "../../helpers/localStorageHelpers";
import { ErrorAlertType } from "../../helpers/globalTypesHelper";
import { AlertStatusEnumType } from "../../helpers/globalTypesHelper";
import { errorAlert, log, toastAlert } from "../../helpers/generalHelpers";
import {formValidationMessage} from "../../constants/generalConstants";
import {v1URL} from "../../helpers/apiRequestsHelpers";
import {authApiURI} from "../../constants/apiURIConstants";
import {postRequest} from "../../helpers/axiosHelpers";
import {
    USER_GLOBAL_STATE_TRUST_AUTHORIZED,
    USER_GLOBAL_STATE_UPDATE_LOGIN_DATA,
    UserContext
} from "../../contexts/UserContext";

// ######################################## STATICS DATA ######################################## //

export const loginInitialStaticValues: LoginFormType = {
    username: '',
    password: ''
};

export const loginSchema: Yup.ObjectSchema<LoginFormType> = Yup.object().shape({
    username: Yup.string().required(formValidationMessage.required),
    password: Yup.string().required(formValidationMessage.required),
});

export interface LoginFormType {
    username: string,
    password: string
}

interface LoginRequestDataType {
    username: string,
    password: string
}

export interface LoginResponseDataType {
    firstName: string;
    username: string;
    role: string;
}

export interface LoginHookType {
    handleLogin: (a: LoginFormType) => void,
    isLoginPending: boolean,
    loginAlertData: ErrorAlertType
}

export const loginRequest = ({username, password}: LoginRequestDataType): Promise<any> => {
    const url: string = v1URL(authApiURI.login);

    return postRequest(url, {username, password}, {headers: {public: true}});
};

// ######################################## HOOK ######################################## //

const useLoginPageHook = (): LoginHookType => {
    const [loginAlertData, setLoginAlertData] = useState<ErrorAlertType>({show: false});

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { setGlobalUserState } = useContext(UserContext);

    const loginResponse: UseMutationResult<AxiosResponse, AxiosError, LoginRequestDataType, any> = useMutation({
        mutationFn: loginRequest,
        onError: (error: AxiosError<any>): void => {
            setLoginAlertData(errorAlert(error));

            log("Login failure", error);
        },
        onSuccess: (data: AxiosResponse<any>): void => {
            setLoginAlertData({show: false});

            const {accessToken, refreshToken} = data.data;
            const responseData: LoginResponseDataType = data.data;

            setLocaleStorageItem('user', responseData);
            setLocaleStorageItem('access-token', accessToken);
            setLocaleStorageItem('refresh-token', refreshToken);

            setGlobalUserState({type: USER_GLOBAL_STATE_TRUST_AUTHORIZED});
            setGlobalUserState({type: USER_GLOBAL_STATE_UPDATE_LOGIN_DATA, payload: responseData});

            const toastMessage: string = `Bienvenue ${responseData.firstName}`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(mainRoutes.dashboard.path);
        }
    });

    const handleLogin = ({username, password}: LoginFormType): void => {
        setLoginAlertData({show: false});

        loginResponse.mutate({username, password});
    }

    const isLoginPending: boolean = loginResponse.isPending;

    return { handleLogin, isLoginPending, loginAlertData };
};

export default useLoginPageHook;

