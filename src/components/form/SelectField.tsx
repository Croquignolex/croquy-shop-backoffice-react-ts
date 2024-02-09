import React, { ReactElement, FC } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FormLabel, FormErrorMessage, FormControl, Select, Icon } from "@chakra-ui/react";
import { Field } from "formik";

import { FormSelectOptionType, SelectFormFieldProps } from "../../types/otherTypes";

const SelectField: FC<SelectFormFieldProps> = ({ label = '', name, values = [], noLabel = false, isInvalid, errorMessage }): ReactElement => {
    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            {!noLabel && <FormLabel fontSize='md' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Select} name={name} size='lg' rounded='lg' borderColor="black">
                <option value=''>Choisir</option>
                {values.map((item: FormSelectOptionType) => (
                    <option value={item.key}>{item.label}</option>
                ))}
            </Field>

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export default SelectField;