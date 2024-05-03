import React, { ReactElement, FC } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FormLabel, FormErrorMessage, FormControl, Select, Icon } from "@chakra-ui/react";
import { Field } from "formik";

import { TextFieldProps } from "./TextField";

const SelectField: FC<SelectFormFieldProps> = ({ label = '', name, isLoading = false, values = [], noLabel = false, isInvalid, errorMessage }): ReactElement => {
    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            {!noLabel && <FormLabel fontSize='sm' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Select} name={name} borderColor="gray.300">
                <option value="">{isLoading ? "Chargement..." : "Choisir"}</option>
                {values.map((item: FormSelectOptionType) => (
                    <option value={item.key}>{item.label}</option>
                ))}
            </Field>

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

interface SelectFormFieldProps extends TextFieldProps {
    values: Array<FormSelectOptionType>;
    isLoading?: boolean;
}

export interface FormSelectOptionType {
    label: string;
    key: string,
}

export default SelectField;