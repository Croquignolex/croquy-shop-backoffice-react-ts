import React, { ReactElement, FC } from "react";
import {Textarea, FormLabel, FormErrorMessage, FormControl, Icon, Skeleton} from "@chakra-ui/react";
import { Field } from "formik";
import { FiAlertCircle } from "react-icons/fi";
import {useTranslation} from "react-i18next";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const TextareaField: FC<DefaultFieldProps> = (
    {
        name,
        label,
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
                : <Field as={Textarea} name={name} borderColor="gray.300" />
            }

            <FormErrorMessage>
                <Icon mr="2" as={FiAlertCircle} />
                {t(formikProps.errors[name]?.toString() || "")}
            </FormErrorMessage>
        </FormControl>
    );
};

export default TextareaField;