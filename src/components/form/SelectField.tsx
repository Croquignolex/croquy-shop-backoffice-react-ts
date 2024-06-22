import React, { ReactElement, FC } from "react";
import {FiAlertCircle} from "react-icons/fi";
import { Field } from "formik";
import {useTranslation} from "react-i18next";
import {
    FormLabel,
    HStack,
    FormErrorMessage,
    FormControl,
    Select,
    Icon,
    Skeleton, Text,
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";

const SelectField: FC<SelectFormFieldProps> = (
    {
        name,
        label,
        linkLabel,
        values,
        isLoading = false,
        formikProps,
        onLinkOpen,
    }): ReactElement => {

    const {t} = useTranslation();
    const isInvalid: boolean = !!formikProps.errors[name] && !!formikProps.touched[name];

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1}>
           <HStack justifyContent={"space-between"}>
               <FormLabel fontSize="sm" fontWeight="normal">{label}</FormLabel>
               {linkLabel && (
                   <Text fontSize="sm" onClick={onLinkOpen} _hover={{color: "purple.500"}} cursor={"pointer"}  fontWeight={"bold"}>
                       {linkLabel}
                   </Text>
               )}
           </HStack>

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
    linkLabel?: string
    onLinkOpen?: () => void
}

export interface FormSelectOptionType {
    label: string;
    key: string,
}

export default SelectField;