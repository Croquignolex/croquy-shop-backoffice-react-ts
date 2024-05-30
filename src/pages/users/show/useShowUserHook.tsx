import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {Params, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {
    userRequest,
    UserType,
    defaultSelectedUser,
    ShowUserHookType,
    toggleUser,
    ToggleUserRequestDataType
} from "./showUserData";

const useShowUserHook = (): ShowUserHookType => {
    let userAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();

    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [userQueryEnabled, setUserQueryEnabled] = useState<boolean>(true);
    const [toggleUserAlertData, setToggleUserAlertData] = useState<ErrorAlertType>({show: false});
    const [userResponseData, setUserResponseData] = useState<UserType>(defaultSelectedUser);

    const userResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["user"],
        queryFn: () => userRequest(id || ""),
        enabled: userQueryEnabled,
    });

    const toggleUserUserResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleUserRequestDataType, any> = useMutation({
        mutationFn: toggleUser,
        onError: (error: AxiosError): void => {
            setToggleUserAlertData(errorAlert(error));

            log("Toggle user failure", toggleUserUserResponse);
        },
        onSuccess: (): void => {
            setToggleUserAlertData({show: false});

            const toastMessage: string = `Utilisateur ${userResponseData.firstName} ${userResponseData.enabled ? "désactivé" : "activé"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setUserResponseData({...userResponseData, enabled: !userResponseData.enabled});

            log("Toggle user successful", toggleUserUserResponse);
        }
    });

    if(userResponse.isError) {
        userAlertData = errorAlert(userResponse.error);

        log("User show failure", userResponse);
    }

    if(userQueryEnabled && userResponse.isSuccess && !userResponse.isFetching) {
        setUserQueryEnabled(false);
        setUserResponseData(userResponse.data.data);

        log("Users list successful", userResponse);
    }

    const isUserPending: boolean = userResponse.isFetching;
    const isToggleUserPending: boolean = toggleUserUserResponse.isPending;

    const handleToggleUser = (): void => {
        setToggleUserAlertData({show: false});

        toggleUserUserResponse.mutate({id: userResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleUserAlertData({show: false});
    }

    return {
        isUserPending,
        userAlertData,
        userResponseData,
        handleToggleUser,
        isToggleUserPending,
        toggleUserAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    };
};

export default useShowUserHook;