import React, { FC, ReactElement } from "react";
import { Badge } from "@chakra-ui/react";
import {AttributeTypeEnumType, GenderTypeEnumType, RoleTypeEnumType} from "../helpers/globalTypesHelper";

const EnumBadge: FC<StatusBadgeProps> = ({ data, attribute, role, gender }): ReactElement | null => {
    let str: string = "";

    if(attribute) {
        switch (data) {
            case AttributeTypeEnumType.SELECT: str = "Sélection"; break;
            case AttributeTypeEnumType.TEXT: str = "Texte"; break;
            case AttributeTypeEnumType.COLOR: str = "Couleur"; break;
        }
    }

    if(role) {
        switch (data) {
            case RoleTypeEnumType.SUPER_ADMIN: str = "Super admin"; break;
            case RoleTypeEnumType.SELLER: str = "Vendeur"; break;
            case RoleTypeEnumType.CUSTOMER: str = "Client"; break;
            case RoleTypeEnumType.MANAGER: str = "Gestionnaire"; break;
            case RoleTypeEnumType.ADMIN: str = "Administrateur"; break;
        }
    }

    if(gender) {
        switch (data) {
            case GenderTypeEnumType.MALE: str = "Masculin"; break;
            case GenderTypeEnumType.FEMALE: str = "Féminin"; break;
            case GenderTypeEnumType.UNKNOWN: str = "Autre"; break;
        }
    }

    return <Badge rounded="md">{str}</Badge>
};

interface StatusBadgeProps {
    data: string,
    attribute?: boolean,
    role?: boolean,
    gender?: boolean,
}

export default EnumBadge;