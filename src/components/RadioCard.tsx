import React, { FC, ReactElement } from "react";
import { useRadio, Box } from "@chakra-ui/react";

import { log } from "../helpers/generalHelpers";

const RadioCard: FC<any> = (props: any): ReactElement => {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    log("RadioCard component", {props});

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderRadius='md'
                _checked={{
                    borderColor: 'blue.500',
                    borderWidth: '1px',
                    boxShadow: 'outline',
                }}
            >
                {props.children}
            </Box>
        </Box>
    )
};

export default RadioCard;