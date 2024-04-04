import React, { ReactElement, FC } from "react";
import { FormLabel, FormErrorMessage, FormControl, Icon, Switch } from "@chakra-ui/react";
import { Field } from "formik";

import { FiAlertCircle } from "react-icons/fi";
import { TextDisabledFieldProps } from "./TextDisabledField";

const SwitchField: FC<TextFieldProps> = ({ label = '', name, noLabel = false, isChecked , isInvalid, errorMessage }): ReactElement => {
    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            {!noLabel && <FormLabel fontSize='sm' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Switch} name={name} size='md' borderColor="gray.300" isChecked={isChecked} />

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export interface TextFieldProps extends TextDisabledFieldProps {
    isInvalid: boolean;
    isChecked: boolean;
    errorMessage?: string;
}

export default SwitchField;