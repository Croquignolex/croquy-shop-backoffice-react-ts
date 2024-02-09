import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { CreateToastFnReturn, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { mainRoutes } from "../../routes/mainRoutes";
import { loginRequest } from "../../helpers/apiRequestsHelpers";
import { setLocaleStorageItem } from "../../helpers/localStorageHelpers";
import { USER_GLOBAL_STATE_TRUST_AUTHORIZED, USER_GLOBAL_STATE_UPDATE_DATA, UserContext } from "../../contexts/UserContext";
import { ErrorAlertType, RequestResponseType } from "../../types/otherTypes";
import { AlertStatusEnumType } from "../../types/otherTypes";
import { errorAlert, toastAlert } from "../../helpers/generalHelpers";
import { UserGlobalStateUpdateDataPayloadType } from "../../types/userTypes";
import { LoginFormType } from "./loginPageData";

const useLoginPageHook = (): any => {
    const [alertData, setAlertData] = useState<ErrorAlertType | null>(null);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();
    const { setGlobalUserState } = useContext(UserContext);

    const { isPending, mutate }: RequestResponseType = useMutation({
        mutationFn: loginRequest,
        onError: (error: AxiosError): void => {
            setAlertData(errorAlert(error));
        },
        onSuccess: (data): void => {
            const userGlobalStateUpdateDataPayload: UserGlobalStateUpdateDataPayloadType = data;
            const toastMessage: string = `Bienvenue ${userGlobalStateUpdateDataPayload.firstName} ${userGlobalStateUpdateDataPayload.lastName}`;

            setLocaleStorageItem('user', userGlobalStateUpdateDataPayload);

            setGlobalUserState({type: USER_GLOBAL_STATE_TRUST_AUTHORIZED});
            setGlobalUserState({type: USER_GLOBAL_STATE_UPDATE_DATA, payload: userGlobalStateUpdateDataPayload});

            navigate(mainRoutes.home.path);

            toastAlert(toast, toastMessage, AlertStatusEnumType.info);
        }
    });

    const handleLogin = ({ email, password }: LoginFormType): void => mutate({ email, password });

    return { handleLogin, isPending, alertData };
};

export default useLoginPageHook;