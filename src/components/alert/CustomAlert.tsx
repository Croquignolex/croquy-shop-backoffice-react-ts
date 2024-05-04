import React, { FC, ReactElement } from "react";
import {AlertIcon, Alert, Stack} from "@chakra-ui/react";

import { ErrorAlertType } from "../../helpers/globalTypesHelper";

const CustomAlert: FC<CustomAlertProps> = ({ data }): ReactElement | null => {
    if(!data.show) {
        return null;
    }

    return (
        <Stack my={1}>
            <Alert status={data?.status} rounded="md">
                <AlertIcon />
                {data?.message}
            </Alert>
        </Stack>
    );
};

interface CustomAlertProps {
    data: ErrorAlertType,
}

export default CustomAlert;