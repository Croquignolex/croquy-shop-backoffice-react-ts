import React, { FC, ReactElement } from "react";
import { useRadio, Box } from "@chakra-ui/react";

const RadioCard: FC<any> = (props: any): ReactElement => {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

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