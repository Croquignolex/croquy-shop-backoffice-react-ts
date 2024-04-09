import {useState} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {AddShopFormType, AddShopHookType, AddShopRequestDataType} from "./addShopData";
import {mainRoutes} from "../../../routes/mainRoutes";
import {storeShopRequest} from "../../shops/add/addShopData";

const useAddShopHook = (): AddShopHookType => {
    const [addShopAlertData, setAddShopAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeShopResponse: UseMutationResult<AxiosResponse, AxiosError, AddShopRequestDataType, any> = useMutation({
        mutationFn: storeShopRequest,
        onError: (error: AxiosError): void => {
            setAddShopAlertData(errorAlert(error));

            log("Store shop failure", storeShopResponse);
        },
        onSuccess: (data: AxiosResponse, variables: AddShopRequestDataType): void => {
            setAddShopAlertData({show: false});

            const toastMessage: string = `Boutique ${variables.name} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            // Reload component
            if(next) setSequence(sequence + 1);
            else navigate(mainRoutes.shops.path);

            log("Store shop successful", storeShopResponse);
        }
    });

    const save = ({name, slug, description}: AddShopFormType, next: boolean = false): void => {
        setAddShopAlertData({show: false});
        setNext(next);

        storeShopResponse.mutate({name, slug, description});
    }

    const handleAddShop = (values: AddShopFormType): void => save(values);
    const handleAddShopAndContinue = (values: AddShopFormType): void => save(values, true);

    const isAddShopPending: boolean = storeShopResponse.isPending;

    return {addShopAlertData, handleAddShop, handleAddShopAndContinue, sequence, isAddShopPending};
};

export default useAddShopHook;