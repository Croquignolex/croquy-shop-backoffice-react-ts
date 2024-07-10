import React, {ReactElement, FC} from "react";
import {useTranslation} from "react-i18next";
import { FiAlertCircle } from "react-icons/fi";
import {FieldAttributes} from "formik/dist/Field";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import {Field} from "formik";
import dayjs from "dayjs";
import {
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
                            <SingleDatepicker
                                propsConfigs={{inputProps: {width: "100%"}}}
                                triggerVariant={"input"}
                                name={field.name}
                                date={dayjs(field.value).toDate()}
                                onDateChange={(d: Date): void => {
                                    form.setFieldValue(field.name, dayjs(d).format("YYYY/MM/DD"))
                                }}
                                configs={{
                                    dateFormat: t("calendar_format"),
                                    dayNames: t("calendar_days").split("-"),
                                    monthNames: t("calendar_months").split("-"),
                                }}
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

export default DateField;