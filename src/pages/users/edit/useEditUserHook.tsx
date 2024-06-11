import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {userRequest, UserType, defaultSelectedUser} from "../show/showUserData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";
import {
    EditUserFormType,
    EditUserHookType,
    editUserInitialStaticValues,
    EditUserRequestDataType,
    updateUserRequest
} from "./editUserData"

const useEditUserHook = (): EditUserHookType => {
    let userAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const user: UserType = state;

    const [editUserAlertData, setEditUserAlertData] = useState<ErrorAlertType>({show: false});
    const [userQueryEnabled, setUserQueryEnabled] = useState<boolean>(false);
    const [userResponseData, setUserResponseData] = useState<UserType>(defaultSelectedUser);
    const [formUser, setFormUser] = useState<EditUserFormType>(editUserInitialStaticValues);

    useEffect((): void => {
        if(user) {
            setUserResponseData(user);
            setFormUser({...formUser, role: user.role});
        } else {
            setUserQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["user"],
        queryFn: () => userRequest(id || ""),
        enabled: userQueryEnabled,
    });

    const updateUserResponse: UseMutationResult<AxiosResponse, AxiosError, EditUserRequestDataType, any> = useMutation({
        mutationFn: updateUserRequest,
        onError: (error: AxiosError): void => {
            setEditUserAlertData(errorAlert(error));

            log("Update user failure", updateUserResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditUserRequestDataType): void => {
            setEditUserAlertData({show: false});

            const toastMessage: string = `Utilisateur ${userResponseData.firstName} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(`${mainRoutes.users.path}/${userResponseData.id}`);

            log("Update user successful", updateUserResponse);
        }
    });

    if(userResponse.isError) {
        userAlertData = errorAlert(userResponse.error);

        log("User show failure", userResponse);
    }

    if(userQueryEnabled && userResponse.isSuccess && !userResponse.isFetching) {
        setUserResponseData(userResponse.data.data);
        setFormUser(userResponse.data.data);
        setUserQueryEnabled(false);

        log("Users list successful", userResponse);
    }

    const handleEditUser = (values: EditUserFormType): void => {
        const {role, password, oldPassword}: EditUserFormType = values;
        updateUserResponse.mutate({role, password, oldPassword, id: userResponseData.id});
    }

    const isEditUserPending: boolean = updateUserResponse.isPending;
    const isUserPending: boolean = userResponse.isFetching;

    const pageHeaderItems: Array<any> = [{path: mainRoutes.users.path, label: 'Utilisateurs'}];
    if(userResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.users.path}/${userResponseData.id}`,
            label: `Détail utilisateur ${userResponseData.firstName}`,
            state: userResponseData
        })
    }

    return {
        editUserAlertData,
        handleEditUser,
        userResponseData,
        isUserPending,
        userAlertData,
        formUser,
        pageHeaderItems,
        isEditUserPending
    };
};

export default useEditUserHook;