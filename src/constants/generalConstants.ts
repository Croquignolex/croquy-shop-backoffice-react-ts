import {AttributeTypeEnumType, GenderTypeEnumType, RoleTypeEnumType} from "../helpers/globalTypesHelper";
import {SelectInputOptionType} from "../components/form/SelectInput";

export const formValidationMessage = {
    required: "FORM_REQUIRED",
    match: "FORM_MATCH",
    minNumber: "FORM_MIN_NUMBER",
    minDate: "FORM_DATE_AFTER",
    passDate: "FORM_DATE_PASSED",
    dateAfter: "FORM_DATE_BEFORE",
    maxNumber: "FORM_MAX_NUMBER",
    email: "FORM_EMAIL",
    confirm: "FORM_CONFIRM_PASSWORD",
    old: "FORM_OLD_PASSWORD",
    password: "FORM_INVALID_PASSWORD",
    imageAllowedFormat: "FORM_ALLOWED_IMAGE_FORMAT",
    imageAllowedSize: "FORM_ALLOWED_IMAGE_SIZE",
};

export const format = {
    datePicker: "YYYY/MM/DD",
    frDateDisplay: "DD/MM/YYYY HH:mm",
    frDateTimeDisplay: "DD/MM/YYYY",
    enDateDisplay: "DD/MM/YYYY HH:mm",
    enDateTimeDisplay: "DD/MM/YYYY",
};

export const staticSelectListAttributeTypes: Array<SelectInputOptionType> = [
    {label: "text", value: AttributeTypeEnumType.TEXT},
    {label: "color", value: AttributeTypeEnumType.COLOR},
    {label: "selection", value: AttributeTypeEnumType.SELECT}
];

export const staticSelectListGenderTypes: Array<SelectInputOptionType> = [
    {label: "male", value: GenderTypeEnumType.MALE},
    {label: "female", value: GenderTypeEnumType.FEMALE},
    {label: "other", value: GenderTypeEnumType.UNKNOWN}
];

export const staticSelectListRoleTypes: Array<SelectInputOptionType> = [
    {label: "admin", value: RoleTypeEnumType.ADMIN},
    {label: "seller", value: RoleTypeEnumType.SELLER},
    {label: "super_admin", value: RoleTypeEnumType.SUPER_ADMIN},
    {label: "manager", value: RoleTypeEnumType.MANAGER},
];
