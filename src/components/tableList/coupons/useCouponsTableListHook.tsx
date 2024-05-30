import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {CouponType, defaultSelectedCoupon, destroyCoupon} from "../../../pages/coupons/show/showCouponData";
import {
    CouponsResponseDataType,
    CouponsTableListHookProps,
    CouponsTableListHookType,
    defaultCouponsResponseData,
    DestroyCouponRequestDataType,
    couponsRequest,
} from "./couponsTableListData";

const useCouponsTableListHook = ({fetchCoupons, couponsBaseUrl}: CouponsTableListHookProps): CouponsTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [couponsQueryEnabled, setCouponsQueryEnabled] = useState<boolean>(fetchCoupons);
    const [couponsAlertData, setCouponsAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteCouponAlertData, setDeleteCouponAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedCoupon, setSelectedCoupon] = useState<CouponType>(defaultSelectedCoupon);
    const [couponsResponseData, setCouponsResponseData] = useState<CouponsResponseDataType>(defaultCouponsResponseData);

    const couponsResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["coupons"],
        queryFn: () => couponsRequest(couponsResponseData.number, couponsResponseData.size, searchNeedle, couponsBaseUrl),
        enabled: couponsQueryEnabled,
    });

    const destroyCouponCouponResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyCouponRequestDataType, any> = useMutation({
        mutationFn: destroyCoupon,
        onError: (error: AxiosError): void => {
            setDeleteCouponAlertData(errorAlert(error));
            setCouponsQueryEnabled(false);

            log("Destroy coupon failure", destroyCouponCouponResponse);
        },
        onSuccess: (): void => {
            setDeleteCouponAlertData({show: false});
            setCouponsQueryEnabled(true);

            const toastMessage: string = `Coupon ${selectedCoupon.code} supprimé avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();

            log("Destroy coupon successful", destroyCouponCouponResponse);
        }
    });

    if(couponsQueryEnabled && couponsResponse.isError) {
        setCouponsQueryEnabled(false);
        setCouponsAlertData(errorAlert(couponsResponse.error));

        log("Coupons list failure", couponsResponse);
    }

    if(couponsQueryEnabled && couponsResponse.isSuccess && !couponsResponse.isFetching) {
        setCouponsQueryEnabled(false);
        setCouponsAlertData({show: false});

        setCouponsResponseData(couponsResponse.data.data);

        log("Coupons list successful", couponsResponse);
    }

    const isCouponsPending: boolean = couponsResponse.isFetching;
    const isDeleteCouponPending: boolean = destroyCouponCouponResponse.isPending;

    const handleDeleteCoupon = (): void => {
        setDeleteCouponAlertData({show: false});

        destroyCouponCouponResponse.mutate({id: selectedCoupon.id});
    }

    const showDeleteModal = (shop: CouponType): void => {
        onDeleteModalOpen();
        setSelectedCoupon(shop);
        setDeleteCouponAlertData({show: false});
    }

    const fetchPaginatedCoupons = (next: boolean): void => {
        if(next && !couponsResponseData.last) setCouponsResponseData({...couponsResponseData, number: couponsResponseData.number + 1});
        else if(!next && !couponsResponseData.first) setCouponsResponseData({...couponsResponseData, number: couponsResponseData.number - 1})

        setCouponsQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleCoupons = (needle: string): void => {
        setSearchNeedle(needle);
        setCouponsResponseData({...couponsResponseData, number: 0});

        setCouponsQueryEnabled(true);
    }

    return {
        couponsResponseData,
        isCouponsPending,
        couponsAlertData,
        fetchPaginatedCoupons,
        fetchPaginatedNeedleCoupons,
        onDeleteModalClose,
        selectedCoupon,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCouponAlertData,
        isDeleteCouponPending,
        handleDeleteCoupon,
    };
};

export default useCouponsTableListHook;