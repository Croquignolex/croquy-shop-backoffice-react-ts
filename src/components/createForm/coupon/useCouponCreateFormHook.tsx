import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {
    CreateCouponFormType,
    CreateCouponRequestDataType,
    storeCouponRequest,
    CouponCreateFormHookType,
    CouponCreateFormHookeProps
} from "./counponCreateFormData";

const useCouponCreateFormHook = ({modal, handleFinish, handleAdd}: CouponCreateFormHookeProps): CouponCreateFormHookType => {
    const [createCouponAlertData, setCreateCouponAlertData] = useState<ErrorAlertType>({show: false});
    const [next, setNext] = useState<boolean>(false);
    const [sequence, setSequence] = useState<number>(0);

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const storeCouponResponse: UseMutationResult<AxiosResponse, AxiosError, CreateCouponRequestDataType, any> = useMutation({
        mutationFn: storeCouponRequest,
        onError: (error: AxiosError): void => {
            setCreateCouponAlertData(errorAlert(error));

            log("Store coupon failure", storeCouponResponse);
        },
        onSuccess: (data: AxiosResponse, variables: CreateCouponRequestDataType): void => {
            setCreateCouponAlertData({show: false});

            const toastMessage: string = `Coupon ${variables.code} créer avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            // Reload component
            if(next) {
                if(modal && handleAdd) handleAdd();
                setSequence(sequence + 1);
            }
            else {
                if(modal && handleFinish) handleFinish();
                else navigate(mainRoutes.coupons.path);
            }

            log("Store coupon successful", storeCouponResponse);
        }
    });

    const save = (values: CreateCouponFormType, next: boolean = false): void => {
        const {code, discount, totalUse, promotionStartedAt, promotionEndedAt, description}: CreateCouponFormType = values;
        setCreateCouponAlertData({show: false});
        setNext(next);

        storeCouponResponse.mutate({code, discount, totalUse, promotionStartedAt, promotionEndedAt, description});
    }

    const handleCreateCoupon = (values: CreateCouponFormType): void => save(values);
    const handleCreateCouponAndContinue = (values: CreateCouponFormType): void => save(values, true);

    const isCreateCouponPending: boolean = storeCouponResponse.isPending;

    return {createCouponAlertData, handleCreateCoupon, handleCreateCouponAndContinue, sequence, isCreateCouponPending};
};

export default useCouponCreateFormHook;