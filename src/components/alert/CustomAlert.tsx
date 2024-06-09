import React, {FC, ReactElement} from "react";
import {Alert, AlertIcon} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import {AlertStatusEnumType, ErrorAlertType} from "../../helpers/globalTypesHelper";

const CustomAlert: FC<CustomAlertProps> = ({data}): ReactElement | null => {
    const {show, status, message} = data;
    const {t} = useTranslation();
    let color: string = "";

    if(!show) {
        return null;
    }

    switch (status) {
        case AlertStatusEnumType.INFO: color = "blue.500"; break;
        case AlertStatusEnumType.SUCCESS: color = "green.500"; break;
        case AlertStatusEnumType.ERROR: color = "red.500"; break;
        case AlertStatusEnumType.WARNING: color = "yellow.600"; break;
    }

    return (
        <Alert status={status} rounded="md" color={color}>
            <AlertIcon/>
            {message && t(message)}
        </Alert>
    );
};

interface CustomAlertProps {
    data: ErrorAlertType,
}

export default CustomAlert;