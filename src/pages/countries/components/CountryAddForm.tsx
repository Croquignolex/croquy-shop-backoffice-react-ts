import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useCountryAddHook, {
    CountryAddHookType,
    AddCountryFormType,
    addCountryInitialStaticValues,
    addCountrySchema
} from "../hooks/useCountryAddHook";
import EditorField from "../../../components/form/EditorField";

const CountryAddForm: FC<CountryAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addCountryAlertData,
        handleAddCountry,
        handleAddCountryAndContinue,
        sequence,
        isAddCountryPending
    }: CountryAddHookType = useCountryAddHook({added, finished});

    return (
        <Box key={sequence}>
            <CustomAlert data={addCountryAlertData} />
            <Formik initialValues={addCountryInitialStaticValues} validationSchema={addCountrySchema} onSubmit={handleAddCountry}>
                {(props: FormikProps<AddCountryFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />
                        <TextField label={t("phone_code")} name="phoneCode" formikProps={props} />
                        <TextareaField label={t("description")} name="description" formikProps={props} />
                        <DoubleSaveButton
                            isLoading={isAddCountryPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddCountryAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface CountryAddFormProps {
    finished: () => void;
    added: () => void;
}

export default CountryAddForm;