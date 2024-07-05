import React, {ReactElement, FC, useState} from "react";
import { Field } from "formik";
import {useTranslation} from "react-i18next";
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
import {SingleDatepicker} from "chakra-dayzed-datepicker";

const DateField: FC<DefaultFieldProps> = (
    {
        name,
        label,
        isLoading = false,
        formikProps,
    }): ReactElement => {

    const {t} = useTranslation();
    const isInvalid: boolean = !!formikProps.errors[name] && !!formikProps.touched[name];

    const [date, setDate] = useState(new Date());

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1}>
            <FormLabel fontSize="sm" fontWeight="normal">{label}</FormLabel>

            {/*{isLoading
                ? <Skeleton height={"40px"} width={"100%"} rounded={"md"} mb={4} />
                : <Field as={Input} name={name} type="date" borderColor="gray.300" locale={'fr'} />
            }*/}

            <SingleDatepicker
                propsConfigs={{
                    inputProps: {width: "100%"}
                }}
                triggerVariant={"input"}
                name="date-input"
                date={date}
                onDateChange={setDate}
            />

            <FormErrorMessage>
                <Icon mr="2" as={FiAlertCircle} />
                {t(formikProps.errors[name]?.toString() || "")}
            </FormErrorMessage>
        </FormControl>
    );
};

export default DateField;