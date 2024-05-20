import React, { ReactElement, FC } from "react";
import { Field } from "formik";
import { FiAlertCircle } from "react-icons/fi";
import {
    Input,
    FormLabel,
    FormErrorMessage,
    FormControl,
    Icon,
    Skeleton,
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const DateField: FC<DefaultFieldProps> = (
    {
        name,
        label,
        isLoading = false,
        formikProps,
    }): ReactElement => {

    const isInvalid: boolean = !!formikProps.errors[name] && !!formikProps.touched[name];

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1}>
            <FormLabel fontSize="sm" fontWeight="normal">{label}</FormLabel>

            {isLoading
                ? <Skeleton height={"40px"} width={"100%"} rounded={"md"} mb={4} />
                : <Field as={Input} name={name} type="date" borderColor="gray.300" />
            }

            <FormErrorMessage>
                <Icon mr="2" as={FiAlertCircle} />
                {formikProps.errors[name]?.toString()}
            </FormErrorMessage>
        </FormControl>
    );
};

export default DateField;