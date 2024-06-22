import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {CountryType} from "../show/showCountryData";
import useCountryEditHook, {
    CountryEditFormType,
    CountryEditHookType,
    countryEditSchema,
} from "../hooks/useCountryEditHook";

const CountryEditForm: FC<CountryEditFormProps> = ({selectedCountry, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editCountryAlertData,
        handleEditCountry,
        formCountry,
        isEditCountryPending
    }: CountryEditHookType = useCountryEditHook({selectedCountry, finished});

    return (
        <Box>

            <CustomAlert data={editCountryAlertData} />

            <Formik initialValues={formCountry} validationSchema={countryEditSchema} onSubmit={handleEditCountry} enableReinitialize>
                {(props: FormikProps<CountryEditFormType>) => (
                    <Form>
                        <TextField label="Nom" name="name" formikProps={props} />

                        <TextField label="Indice téléphonique" name="phoneCode" formikProps={props} />

                        <TextareaField label="Description" name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditCountryPending}
                                type='submit'
                                leftIcon={<FiCheck />}
                            >
                                {t("update")}
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface CountryEditFormProps {
    selectedCountry: CountryType;
    finished: () => void;
}

export default CountryEditForm;