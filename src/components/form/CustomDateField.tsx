import React, { ReactElement, FC } from "react";
import { Input, FormLabel, FormErrorMessage, FormControl, HStack, Select, Icon } from "@chakra-ui/react";
import { Field } from "formik";
import { FiAlertCircle } from "react-icons/fi";

const CustomDateField: FC<FormCustomDateFieldProps> = ({ label = '', day, month, year, noLabel = false, isInvalid, errorMessage }): ReactElement => {
    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            {!noLabel && <FormLabel fontSize='md' fontWeight='normal'>{label}</FormLabel>}

            <HStack spacing={2}>
                <Field as={Input} name={day} type="text" placeholder="DD" size='lg' rounded='lg' borderColor="black" w={{base: '20%'}} />

                <Field as={Select} placeholder='Mois' name={month} size='lg' rounded='lg' borderColor="black" w={{base: '50%'}}>
                    {months.map((month: string, index: number) => (
                        <option value={index}>{month}</option>
                    ))}
                </Field>

                <Field as={Input} name={year} type="text" placeholder="YYYY" size='lg' rounded='lg' borderColor="black" w={{base: '20%'}} />
            </HStack>

            <FormErrorMessage><Icon mr="2" as={FiAlertCircle} />{errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

const months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

interface FormCustomDateFieldProps {
    label?: string;
    day: string,
    month: string,
    year: string,
    noLabel?: boolean;
    isInvalid: boolean;
    errorMessage?: string;
}

export default CustomDateField;