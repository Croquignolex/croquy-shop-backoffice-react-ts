import * as Yup from "yup";

import {ErrorAlertType, URLParamType} from "../../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {couponsApiURI} from "../../../constants/apiURIConstants";
import {putRequest} from "../../../helpers/axiosHelpers";
import {CouponType} from "../show/showCouponData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";
import dayjs from "dayjs";

export const editCouponInitialStaticValues: EditCouponFormType = {
    code: "",
    discount: 0,
    totalUse: 0,
    promotionStartedAt: "",
    promotionEndedAt: "",
    description: "",
};

export const editCouponSchema: Yup.ObjectSchema<EditCouponFormType> = Yup.object().shape({
    code: Yup.string(),
    discount: Yup.number()
        .min(0, formValidationMessage.minNumber)
        .max(100, formValidationMessage.maxNumber)
        .required(formValidationMessage.required),
    totalUse: Yup.number().required(formValidationMessage.required),
    promotionStartedAt: Yup.string()
        .required(formValidationMessage.required)
        .test("FORMAT", formValidationMessage.minDate, (value: string | undefined): boolean => {
            return (dayjs(value).isValid() && dayjs(value).isAfter(dayjs()));
        }),
    promotionEndedAt: Yup.string()
        .required(formValidationMessage.required)
        .when('promotionStartedAt',
            (fields: Array<any>, schema) => {
                if (fields.length > 0) {
                    return schema.test("FORMAT", formValidationMessage.dateAfter, (value: string | undefined): boolean => {
                        return (dayjs(fields[0]).isValid() && dayjs(value).isValid() && dayjs(value).isAfter(dayjs(fields[0])));
                    });
                }
                return schema;
            }),
    description: Yup.string().nullable(),
});

export interface EditCouponFormType {
    code: string | null | undefined;
    totalUse: number,
    discount: number;
    promotionStartedAt: string;
    promotionEndedAt: string;
    description: string | null | undefined,
}

export interface EditCouponRequestDataType {
    id: string,
    totalUse: number,
    discount: number;
    promotionStartedAt: string;
    promotionEndedAt: string;
    description: string | null | undefined,
}

export interface EditCouponHookType {
    editCouponAlertData: ErrorAlertType,
    isEditCouponPending: boolean,
    isCouponPending: boolean,
    couponAlertData: ErrorAlertType,
    formCoupon: EditCouponFormType,
    pageHeaderItems: Array<any>,
    couponResponseData: CouponType,
    handleEditCoupon: (a: EditCouponFormType) => void,
}

export const updateCouponRequest = (values: EditCouponRequestDataType): Promise<any> => {
    const {discount, totalUse, promotionStartedAt, promotionEndedAt, description, id}: EditCouponRequestDataType = values;
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(couponsApiURI.update, params);

    return putRequest(url, {discount, totalUse, promotionStartedAt, promotionEndedAt, description});
};