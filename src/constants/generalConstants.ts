import {AttributeTypeEnumType, GenderTypeEnumType, RoleTypeEnumType} from "../helpers/globalTypesHelper";
import {FormSelectOptionType} from "../components/form/SelectField";

export const formValidationMessage = {
    required: "Merci de remplir ce champ",
    match: "Le format de ce champ n'ai pas correct",
    minNumber: "Merci de rentrer une value supérieure",
    minDate: "Merci de choisir une date futur",
    dateAfter: "Merci de choisir une date ultérieure à la date de départ",
    maxNumber: "Merci de rentrer une value inférieure",
    email: "Addresse email invalide",
    minMax: "Nombre de caratères incorrect",
    confirm: "Les mots de passe ne sont pas indetiques",
    old: "Les mots de passe ne doivent pas être indetiques",
    password: "Mot de passe invalide",
    imageAllowedFormat: "Format autorisés: PNG, JPG",
    imageAllowedSize: "La taille du fichier doit être moins de 2MB",
};

export const format = {
    datePicker: "YYYY-MM-DD",
    dateDisplay: "DD/MM/YYYY HH:mm",
    dateTimeDisplay: "DD/MM/YYYY",
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
