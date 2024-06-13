import React, { FC, ReactElement } from "react";
import { Tr, Td } from "@chakra-ui/react";

import { AlertStatusEnumType } from "../../helpers/globalTypesHelper";
import CustomAlert from "./CustomAlert";

const EmptyTableAlert: FC<EmptyTableAlertProps> = ({ status = AlertStatusEnumType.INFO }): ReactElement => {
    return (
        <Tr>
            <Td colSpan={10}>
                <CustomAlert data={{status, show: true, message: "no_data"}}/>
            </Td>
        </Tr>
    )
};

interface EmptyTableAlertProps {
    status?: AlertStatusEnumType
}

export default EmptyTableAlert;