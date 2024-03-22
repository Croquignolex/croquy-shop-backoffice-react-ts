import React, { FC, ReactElement } from "react";
import { Tr, Td, Alert } from "@chakra-ui/react";

import { AlertStatusEnumType } from "../helpers/globalTypesHelper";

const EmptyTableAlert: FC<EmptyTableAlertProps> = ({ status = AlertStatusEnumType.info }): ReactElement => {
    return (
        <Tr>
            <Td colSpan={10}>
                <Alert status={status} rounded='md'>
                    Pas de données
                </Alert>
            </Td>
        </Tr>
    )
};

interface EmptyTableAlertProps {
    status?: AlertStatusEnumType
}

export default EmptyTableAlert;