import React, { ReactElement, FC } from "react";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import { Field } from "formik";

import { FormDisabledFieldProps } from "../../types/otherTypes";
import { log } from "../../helpers/generalHelpers";

const TextDisabledField: FC<FormDisabledFieldProps> = ({ label, name, noLabel = false }): ReactElement => {
    log("TextDisabledField component", {label, name, noLabel});

    return (
        <FormControl mb={4}>
            {!noLabel && <FormLabel fontSize='md' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Input} name={name} type="text" size='lg' rounded='lg' borderColor="black" disabled />
        </FormControl>
    );
};

export default TextDisabledField;