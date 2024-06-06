import React, { FC, ReactElement } from "react";
import { Text } from "@chakra-ui/react";
import {AttributeTypeEnumType, GenderTypeEnumType, RoleTypeEnumType} from "../helpers/globalTypesHelper";

const EnumBadge: FC<StatusBadgeProps> = ({ data, attribute, role, gender }): ReactElement | null => {
    let str: string = "";
    let color: string = "black";
    let bg: string = "gray.300";

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
                bg = "red.300";
                break;
            case RoleTypeEnumType.SELLER:
                str = "Vendeur";
                bg = "blue.300";
                break;
            case RoleTypeEnumType.CUSTOMER:
                str = "Client";
                break;
            case RoleTypeEnumType.MANAGER:
                str = "Gestionnaire";
                bg = "purple.300";
                break;
            case RoleTypeEnumType.ADMIN:
                str = "Administrateur";
                bg = "orange.300";
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

    return <Text color={color} rounded="md" px={2} fontSize="0.8rem" bg={bg} fontWeight="bold">{str}</Text>
};

interface StatusBadgeProps {
    data: string,
    attribute?: boolean,
    role?: boolean,
    gender?: boolean,
}

export default EnumBadge;