import React, { FC, ReactElement } from "react";
import {AlertIcon, Alert, Stack} from "@chakra-ui/react";

import { ErrorAlertType } from "../helpers/globalTypesHelper";

const DisplayAlert: FC<DisplayAlertProps> = ({ data }): ReactElement | null => {
    if(!data.show) {
        return null;
    }

    return (
        <Stack my={1}>
            <Alert status={data?.status} rounded='md'>
                <AlertIcon />
                {data?.message}
            </Alert>
        </Stack>
    );
};

interface DisplayAlertProps {
    data: ErrorAlertType,
}

export default DisplayAlert;