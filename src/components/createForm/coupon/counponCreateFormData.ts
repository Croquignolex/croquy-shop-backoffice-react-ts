import * as Yup from "yup";
import dayjs from "dayjs";

import {ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {format, formValidationMessage} from "../../../constants/generalConstants";
import {v1URL} from "../../../helpers/apiRequestsHelpers";
import {couponsApiURI} from "../../../constants/apiURIConstants";
import {postRequest} from "../../../helpers/axiosHelpers";

export const createCouponInitialStaticValues: CreateCouponFormType = {
    code: "",
    discount: 0,
    totalUse: 0,
    promotionStartedAt: dayjs().add(1,"days").format(format.datePicker),
    promotionEndedAt: dayjs().add(2,"days").format(format.datePicker),
    description: "",
};

export const createCouponSchema: Yup.ObjectSchema<CreateCouponFormType> = Yup.object().shape({
    code: Yup.string().required(formValidationMessage.required),
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

export interface CreateCouponFormType {
    code: string;
    discount: number;
    totalUse: number;
    promotionStartedAt: string;
    promotionEndedAt: string;
    description: string | null | undefined,
}

export interface CreateCouponRequestDataType extends CreateCouponFormType {}

export interface CouponCreateFormHookeProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export interface CouponCreateFormHookType {
    createCouponAlertData: ErrorAlertType,
    isCreateCouponPending: boolean,
    sequence: number,
    handleCreateCoupon: (a: CreateCouponFormType) => void,
    handleCreateCouponAndContinue: (a: CreateCouponFormType) => void,
}

export const storeCouponRequest = (values: CreateCouponRequestDataType): Promise<any> => {
    const {code, discount, totalUse, promotionEndedAt, promotionStartedAt, description} = values;
    const url: string = v1URL(couponsApiURI.store);

    return postRequest(url, {code, discount, totalUse, promotionEndedAt, promotionStartedAt, description});
};