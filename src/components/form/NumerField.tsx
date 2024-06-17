import React, { ReactElement, FC } from "react";
import { Field } from "formik";
import { FiAlertCircle } from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {FieldAttributes} from "formik/dist/Field";
import {
    FormLabel,
    FormErrorMessage,
    FormControl,
    Icon,
    Skeleton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const NumberField: FC<NumberFieldProps> = (
    {
        name,
        label,
        min,
        max,
        isLoading = false,
        formikProps,
    }): ReactElement => {

    const {t} = useTranslation();
    const isInvalid: boolean = !!formikProps.errors[name] && !!formikProps.touched[name];

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1}>
            <FormLabel fontSize="sm" fontWeight="normal">{label}</FormLabel>

            {isLoading
                ? <Skeleton height={"40px"} width={"100%"} rounded={"md"} mb={4} />
                : (
                    <Field name={name} borderColor="gray.300">
                        {({field, form}: FieldAttributes<any>) => (
                            <NumberInput
                                id={name}
                                min={min}
                                max={max}
                                {...field}
                                onChange={(val: number) =>
                                    form.setFieldValue(field.name, val)
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        )}
                    </Field>
                )
            }
            <FormErrorMessage>
                <Icon mr="2" as={FiAlertCircle} />
                {t(formikProps.errors[name]?.toString() || "")}
            </FormErrorMessage>
        </FormControl>
    );
};

export interface NumberFieldProps extends DefaultFieldProps {
    min?: number;
    max?: number;
}

export default NumberField;