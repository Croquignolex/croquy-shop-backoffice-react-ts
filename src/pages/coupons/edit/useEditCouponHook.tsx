import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {couponRequest, CouponType, defaultSelectedCoupon} from "../show/showCouponData";
import {BreadcrumbItemsType} from "../../../components/menu/PageBreadcrumb";
import {
    EditCouponFormType,
    EditCouponHookType,
    editCouponInitialStaticValues,
    EditCouponRequestDataType,
    updateCouponRequest
} from "./editCouponData"
import dayjs from "dayjs";
import {format} from "../../../constants/generalConstants";

const useEditCouponHook = (): EditCouponHookType => {
    let couponAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const coupon: CouponType = state;

    const [editCouponAlertData, setEditCouponAlertData] = useState<ErrorAlertType>({show: false});
    const [couponQueryEnabled, setCouponQueryEnabled] = useState<boolean>(false);
    const [couponResponseData, setCouponResponseData] = useState<CouponType>(defaultSelectedCoupon);
    const [formCoupon, setFormCoupon] = useState<EditCouponFormType>(editCouponInitialStaticValues);

    useEffect((): void => {
        if(coupon) {
            const start: string = dayjs(coupon.promotionStartedAt).format(format.datePicker);
            const end: string = dayjs(coupon.promotionEndedAt).format(format.datePicker);
            setCouponResponseData(coupon);
            setFormCoupon({...coupon, promotionStartedAt: start, promotionEndedAt: end});
        } else {
            setCouponQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const couponResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["coupon"],
        queryFn: () => couponRequest(id || ""),
        enabled: couponQueryEnabled,
    });

    const updateCouponResponse: UseMutationResult<AxiosResponse, AxiosError, EditCouponRequestDataType, any> = useMutation({
        mutationFn: updateCouponRequest,
        onError: (error: AxiosError): void => {
            setEditCouponAlertData(errorAlert(error));

            log("Update coupon failure", updateCouponResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditCouponRequestDataType): void => {
            setEditCouponAlertData({show: false});

            const toastMessage: string = `Coupon ${couponResponseData.code} mis à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(`${mainRoutes.coupons.path}/${couponResponseData.id}`);

            log("Update coupon successful", updateCouponResponse);
        }
    });

    if(couponResponse.isError) {
        couponAlertData = errorAlert(couponResponse.error);

        log("Coupon show failure", couponResponse);
    }

    if(couponQueryEnabled && couponResponse.isSuccess && !couponResponse.isFetching) {
        const coupon: CouponType = couponResponse.data.data;
        const start: string = dayjs(coupon.promotionStartedAt).format(format.datePicker);
        const end: string = dayjs(coupon.promotionEndedAt).format(format.datePicker);

        setCouponResponseData(coupon);
        setCouponQueryEnabled(false);
        setFormCoupon({...coupon, promotionStartedAt: start, promotionEndedAt: end});

        log("Coupons list successful", couponResponse);
    }

    const handleEditCoupon = (values: EditCouponFormType): void => {
        const {discount, totalUse, promotionStartedAt, promotionEndedAt, description}: EditCouponFormType = values;
        updateCouponResponse.mutate({discount, totalUse, promotionStartedAt, promotionEndedAt, description, id: couponResponseData.id});
    }

    const isEditCouponPending: boolean = updateCouponResponse.isPending;
    const isCouponPending: boolean = couponResponse.isFetching;

    const pageHeaderItems: Array<BreadcrumbItemsType> = [{path: mainRoutes.coupons.path, label: 'Coupons'}];
    if(couponResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.coupons.path}/${couponResponseData.id}`,
            label: `Détail coupon ${couponResponseData.code}`,
            state: couponResponseData
        })
    }

    return {
        editCouponAlertData,
        handleEditCoupon,
        couponResponseData,
        isCouponPending,
        couponAlertData,
        formCoupon,
        pageHeaderItems,
        isEditCouponPending
    };
};

export default useEditCouponHook;