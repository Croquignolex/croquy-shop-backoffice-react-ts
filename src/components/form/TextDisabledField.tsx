import React, { ReactElement, FC } from "react";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import { Field } from "formik";

const TextDisabledField: FC<TextDisabledFieldProps> = ({ label, name, noLabel = false }): ReactElement => {
    return (
        <FormControl mb={4}>
            {!noLabel && <FormLabel fontSize='sm' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Input} name={name} type="text" borderColor="gray.300" disabled />
        </FormControl>
    );
};

export interface TextDisabledFieldProps {
    label?: string;
    name: string;
    noLabel?: boolean;
}

export default TextDisabledField;