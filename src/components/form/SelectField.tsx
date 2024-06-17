import React, { ReactElement, FC } from "react";
import {FiAlertCircle} from "react-icons/fi";
import { Field } from "formik";
import {useTranslation} from "react-i18next";
import {
    FormLabel,
    FormErrorMessage,
    FormControl,
    Select,
    Icon,
    Skeleton,
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const SelectField: FC<SelectFormFieldProps> = (
    {
        name,
        label,
        values,
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
                    <Field as={Select} name={name} borderColor="gray.300">
                        <option value="">Choisir</option>
                        {values.map((item: FormSelectOptionType, key: number) => (
                            <option value={item.key} key={key}>{item.label}</option>
                        ))}
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

interface SelectFormFieldProps extends DefaultFieldProps {
    values: Array<FormSelectOptionType>;
}

export interface FormSelectOptionType {
    label: string;
    key: string,
}

export default SelectField;