import React, { ReactElement, FC } from "react";
import { Textarea, FormLabel, FormErrorMessage, FormControl, Icon } from "@chakra-ui/react";
import { Field } from "formik";

import { FiAlertCircle } from "react-icons/fi";
import { TextDisabledFieldProps } from "./TextDisabledField";

const TextareaField: FC<TextFieldProps> = ({ label = '', name, noLabel = false, isInvalid, errorMessage }): ReactElement => {
    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            {!noLabel && <FormLabel fontSize='sm' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Textarea} name={name} type="text" size='md' borderColor="gray.300" />

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export interface TextFieldProps extends TextDisabledFieldProps {
    isInvalid: boolean;
    errorMessage?: string;
}

export default TextareaField;