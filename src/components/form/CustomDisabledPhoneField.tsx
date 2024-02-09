import React, { ReactElement, FC } from "react";
import {Input, FormLabel, FormControl, HStack} from "@chakra-ui/react";
import { Field } from "formik";

import { FormCustomDisabledPhoneFieldProps } from "../../types/otherTypes";

const CustomDisabledPhoneField: FC<FormCustomDisabledPhoneFieldProps> = ({ label = '', code, number, noLabel = false }): ReactElement => {
    return (
        <FormControl mb={4}>
            {!noLabel && <FormLabel fontSize='md' fontWeight='normal'>{label}</FormLabel>}

            <HStack spacing={2}>
                <Field as={Input} name={code} type="text" placeholder="Indice" size='lg' rounded='lg' w={{base: '30%'}} borderColor="black" disabled />

                <Field as={Input} name={number} type="text" placeholder="Numéro" size='lg' rounded='lg' w={{base: '70%'}} borderColor="black" disabled />
            </HStack>
        </FormControl>
    );
};

export default CustomDisabledPhoneField;