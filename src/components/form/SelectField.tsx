import React, { ReactElement, FC } from "react";
import {FiAlertCircle} from "react-icons/fi";
import { Field } from "formik";
import {useTranslation} from "react-i18next";
import {FieldAttributes} from "formik/dist/Field";
import {
    FormLabel,
    HStack,
    FormErrorMessage,
    FormControl,
    Icon,
    Text,
    Skeleton,
} from "@chakra-ui/react";

import {DefaultFieldProps} from "../../helpers/globalTypesHelper";
import SelectInput, {SelectInputOptionType} from "./SelectInput";

const SelectField: FC<SelectFormFieldProps> = (
    {
        name,
        label,
        linkLabel,
        options,
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
                    <Field name={name} borderColor="gray.300">
                        {({field, form}: FieldAttributes<any>) => (
                            <SelectInput
                                handleSelect={(v: string) => form.setFieldValue(field.name, v)}
                                name={field.name}
                                defaultValue={options.find(((o: SelectInputOptionType): boolean => o.value === field.value))}
                                options={options}
                            />
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

interface SelectFormFieldProps extends DefaultFieldProps {
    options: Array<SelectInputOptionType>;
    linkLabel?: string
    onLinkOpen?: () => void
}

export default SelectField;