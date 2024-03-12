import React, { FC, ReactElement } from "react";
import {AlertIcon, Alert, Stack} from "@chakra-ui/react";

import { ErrorAlertType } from "../helpers/globalTypesHelper";
import { log } from "../helpers/generalHelpers";

const DisplayAlert: FC<DisplayAlertProps> = ({ data }): ReactElement | null => {
    if(!data.show) {
        return null;
    }

    log("DisplayAlert component", {data});

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