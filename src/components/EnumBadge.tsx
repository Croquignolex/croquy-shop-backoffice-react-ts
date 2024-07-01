import React, { FC, ReactElement } from "react";
import {Badge} from "@chakra-ui/react";
import {AttributeTypeEnumType, GenderTypeEnumType, RoleTypeEnumType} from "../helpers/globalTypesHelper";
import {useTranslation} from "react-i18next";

const EnumBadge: FC<StatusBadgeProps> = ({ data, attribute, role, gender }): ReactElement | null => {
    const {t} = useTranslation();

    let str: string = "default";
    let colorScheme: string = "gray";

    if(attribute) {
        switch (data) {
            case AttributeTypeEnumType.SELECT: str = "Sélection"; break;
            case AttributeTypeEnumType.TEXT: str = "Texte"; break;
            case AttributeTypeEnumType.COLOR: str = "Couleur"; break;
        }
    }

    if(role) {
        switch (data) {
            case RoleTypeEnumType.SUPER_ADMIN:
                str = "Super Admin";
                colorScheme = "red.300";
                break;
            case RoleTypeEnumType.SELLER:
                str = "Vendeur";
                colorScheme = "blue.300";
                break;
            case RoleTypeEnumType.CUSTOMER:
                str = "Client";
                break;
            case RoleTypeEnumType.MANAGER:
                str = "Gestionnaire";
                colorScheme = "purple.300";
                break;
            case RoleTypeEnumType.ADMIN:
                str = "Administrateur";
                colorScheme = "orange.300";
                break;
        }
    }

    if(gender) {
        switch (data) {
            case GenderTypeEnumType.MALE: str = "Masculin"; break;
            case GenderTypeEnumType.FEMALE: str = "Féminin"; break;
            case GenderTypeEnumType.UNKNOWN: str = "Autre"; break;
        }
    }

    return (
        <Badge colorScheme={colorScheme}>
            {t(str)}
        </Badge>
    );
};

interface StatusBadgeProps {
    data: string,
    attribute?: boolean,
    role?: boolean,
    gender?: boolean,
}

export default EnumBadge;