import React, {ReactElement, FC} from "react";
import {Field} from "formik";
import {FiAlertCircle} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import {
    Input,
    FormLabel,
    FormErrorMessage,
    FormControl,
    Icon,
    Skeleton,
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const TextField: FC<TextFieldProps> = (
    {
        name,
        label,
        isLoading = false,
        disabled = false,
        formikProps,
    }): ReactElement => {

    const {t} = useTranslation();
    const isInvalid: boolean = !!formikProps.errors[name] && !!formikProps.touched[name];

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1}>
            <FormLabel>{label}</FormLabel>

            {isLoading
                ? <Skeleton height={"40px"} width={"100%"} rounded={"md"} mb={4} />
                : <Field as={Input} name={name} type="text" isDisabled={disabled} borderColor="gray.300" />
            }

            <FormErrorMessage>
                <Icon mr="2" as={FiAlertCircle} />
                {t(formikProps.errors[name]?.toString() || "")}
            </FormErrorMessage>
        </FormControl>
    );
};

export interface TextFieldProps extends DefaultFieldProps {
    disabled?: boolean;
}

export default TextField;