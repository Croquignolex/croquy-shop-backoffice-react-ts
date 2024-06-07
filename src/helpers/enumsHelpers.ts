import {RoleTypeEnumType} from "./globalTypesHelper";

// Role to string
export const roleEnumConverter = (role: string): {label: string, color: string} => {
    let label: string;
    let color: string;

    switch (role) {
        case RoleTypeEnumType.SUPER_ADMIN:
            label = "#Super Admin";
            color = "red.300";
            break;
        case RoleTypeEnumType.SELLER:
            label = "#Vendeur";
            color = "blue.300";
            break;
        case RoleTypeEnumType.CUSTOMER:
            label = "#Client";
            color = "gray.300";
            break;
        case RoleTypeEnumType.MANAGER:
            label = "#Gestionnaire";
            color = "purple.300";
            break;
        case RoleTypeEnumType.ADMIN:
            label = "#Administrateur";
            color = "orange.300";
            break;
        default:
            label = "#Inconnu";
            color = "gray.300";
            break;
    }

    return {label, color};
};