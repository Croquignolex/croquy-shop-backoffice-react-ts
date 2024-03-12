import React, { ReactElement, FC } from "react";
import { Input, FormLabel, FormErrorMessage, FormControl, Icon } from "@chakra-ui/react";
import { Field } from "formik";

import { FormFieldProps } from "../../types/otherTypes";
import { FiAlertCircle } from "react-icons/fi";
import { log } from "../../helpers/generalHelpers";

const TextField: FC<FormFieldProps> = ({ label = '', name, noLabel = false, isInvalid, errorMessage }): ReactElement => {
    log("TextField component", {label, name, noLabel, isInvalid, errorMessage});

    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            {!noLabel && <FormLabel fontSize='sm' fontWeight='normal'>{label}</FormLabel>}

            <Field as={Input} name={name} type="text" size='md' borderColor="gray.300" />

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} /> {errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export default TextField;