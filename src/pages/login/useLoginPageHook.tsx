import {useContext} from "react";
// import {CreateToastFnReturn, useToast} from "@chakra-ui/react";
// import {useMutation} from "@tanstack/react-query";
// import {NavigateFunction, useNavigate} from "react-router-dom";
//
// import {routes} from "../../constants/routeConstants";
// import {loginRequest} from "../../helpers/apiRequestsHelpers";
// import {setLocaleStorageItem} from "../../helpers/localStorageHelpers";
// import {TRUST_AUTHORIZED_USER, UPDATE_USER_DATA, UserContext} from "../../contexts/UserContext";
// import {ErrorAlertType, RequestResponseType} from "../../types/othersTypes";
// import {LoginFormType} from "../../types/pages/authTypes";
// import {AlertStatusEnumType} from "../../types/enumsTypes";
// import {toastAlert} from "../../helpers/generalHelpers";
//
// const useLoginPageHook = (): any => {
//     let alertData: ErrorAlertType | null = null;
//
//     const toast: CreateToastFnReturn = useToast();
//     const navigate: NavigateFunction = useNavigate();
//     const { setGlobalUserState } = useContext(UserContext);
//
//     const { isLoading, isError, isSuccess, data, error, mutate }: RequestResponseType = useMutation(loginRequest);
//
//     if(isError) {
//         const message: string = error?.response?.data?.message || error?.message;
//
//         alertData = { show: isError, status: AlertStatusEnumType.error, message };
//     }
//
//     if(isSuccess) {
//         const accountId: string = data?.data?.accountId;
//         const emailAddress: string = data?.data?.emailAddress;
//         const firstName: string = data?.data?.firstName;
//         const lastName: string = data?.data?.lastName;
//
//         setLocaleStorageItem('user', { lastName, firstName, emailAddress, accountId });
//
//         setGlobalUserState({type: TRUST_AUTHORIZED_USER});
//         setGlobalUserState({type: UPDATE_USER_DATA, payload: { lastName, firstName, emailAddress, accountId }});
//
//         navigate(routes.home.path);
//
//         toastAlert(toast, `Bienvenue ${firstName} ${lastName}`, AlertStatusEnumType.info);
//     }
//
//     const handleLogin = ({ email, password }: LoginFormType): void => mutate({ email, password, firstName: 'Fake user', lastName: '' });
//
//     return { handleLogin, isLoading, alertData };
// };
//
// export default useLoginPageHook;