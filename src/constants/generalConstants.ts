import {AttributeTypeEnumType, GenderTypeEnumType, RoleTypeEnumType} from "../helpers/globalTypesHelper";
import {FormSelectOptionType} from "../components/form/SelectField";

export const formValidationMessage = {
    required: "FORM_REQUIRED",
    match: "FORM_MATCH",
    minNumber: "FORM_MIN_NUMBER",
    minDate: "FORM_DATE_AFTER",
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
    datePicker: "YYYY-MM-DD",
    frDateDisplay: "DD/MM/YYYY HH:mm",
    frDateTimeDisplay: "DD/MM/YYYY",
    enDateDisplay: "DD/MM/YYYY HH:mm",
    enDateTimeDisplay: "DD/MM/YYYY",
};

export const staticSelectListAttributeTypes: Array<FormSelectOptionType> = [
    {label: "Texte", key: AttributeTypeEnumType.TEXT},
    {label: "Couleur", key: AttributeTypeEnumType.COLOR},
    {label: "Sélection", key: AttributeTypeEnumType.SELECT}
];

export const staticSelectListGenderTypes: Array<FormSelectOptionType> = [
    {label: "Masculin", key: GenderTypeEnumType.MALE},
    {label: "Féminin", key: GenderTypeEnumType.FEMALE},
    {label: "Autre", key: GenderTypeEnumType.UNKNOWN}
];

export const staticSelectListRoleTypes: Array<FormSelectOptionType> = [
    {label: "Administrateur", key: RoleTypeEnumType.ADMIN},
    {label: "Vendeur", key: RoleTypeEnumType.SELLER},
    {label: "Super admin", key: RoleTypeEnumType.SUPER_ADMIN},
    {label: "Gestionnaire", key: RoleTypeEnumType.MANAGER},
];
