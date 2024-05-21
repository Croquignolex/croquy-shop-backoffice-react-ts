import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {DestroyCouponRequestDataType} from "../../../components/tableList/coupons/couponsTableListData";
import {
    couponRequest,
    CouponType,
    defaultSelectedCoupon,
    destroyCoupon,
    ShowCouponHookType,
    toggleCoupon,
    ToggleCouponRequestDataType
} from "./showCouponData";

const useShowCouponHook = (): ShowCouponHookType => {
    let couponAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [couponQueryEnabled, setCouponQueryEnabled] = useState<boolean>(true);
    const [deleteCouponAlertData, setDeleteCouponAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleCouponAlertData, setToggleCouponAlertData] = useState<ErrorAlertType>({show: false});
    const [couponResponseData, setCouponResponseData] = useState<CouponType>(defaultSelectedCoupon);

    const couponResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["coupon"],
        queryFn: () => couponRequest(id || ""),
        enabled: couponQueryEnabled,
    });

    const destroyCouponCouponResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyCouponRequestDataType, any> = useMutation({
        mutationFn: destroyCoupon,
        onError: (error: AxiosError): void => {
            setDeleteCouponAlertData(errorAlert(error));

            log("Destroy coupon failure", destroyCouponCouponResponse);
        },
        onSuccess: (): void => {
            setDeleteCouponAlertData({show: false});

            const toastMessage: string = `Coupon ${couponResponseData.code} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onDeleteModalClose();
            navigate(`${mainRoutes.coupons.path}`);

            log("Destroy coupon successful", destroyCouponCouponResponse);
        }
    });

    const toggleCouponCouponResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleCouponRequestDataType, any> = useMutation({
        mutationFn: toggleCoupon,
        onError: (error: AxiosError): void => {
            setToggleCouponAlertData(errorAlert(error));

            log("Toggle coupon failure", toggleCouponCouponResponse);
        },
        onSuccess: (): void => {
            setToggleCouponAlertData({show: false});

            const toastMessage: string = `Coupon ${couponResponseData.code} ${couponResponseData.enabled ? "désactivé" : "activé"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.success);

            onToggleModalClose();
            setCouponResponseData({...couponResponseData, enabled: !couponResponseData.enabled});

            log("Toggle coupon successful", toggleCouponCouponResponse);
        }
    });

    if(couponResponse.isError) {
        couponAlertData = errorAlert(couponResponse.error);

        log("Coupon show failure", couponResponse);
    }

    if(couponQueryEnabled && couponResponse.isSuccess && !couponResponse.isFetching) {
        setCouponQueryEnabled(false);
        setCouponResponseData(couponResponse.data.data);

        log("Coupons list successful", couponResponse);
    }

    const isCouponPending: boolean = couponResponse.isFetching;
    const isDeleteCouponPending: boolean = destroyCouponCouponResponse.isPending;
    const isToggleCouponPending: boolean = toggleCouponCouponResponse.isPending;

    const handleDeleteCoupon = (): void => {
        setDeleteCouponAlertData({show: false});

        destroyCouponCouponResponse.mutate({id: couponResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteCouponAlertData({show: false});
    }

    const handleToggleCoupon = (): void => {
        setToggleCouponAlertData({show: false});

        toggleCouponCouponResponse.mutate({id: couponResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleCouponAlertData({show: false});
    }

    return {
        isCouponPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCouponAlertData,
        isDeleteCouponPending,
        handleDeleteCoupon,
        couponAlertData,
        couponResponseData,
        handleToggleCoupon,
        isToggleCouponPending,
        toggleCouponAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
    };
};

export default useShowCouponHook;