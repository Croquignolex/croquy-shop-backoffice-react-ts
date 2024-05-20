import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useCountryCreateFormHook from "./useCountryCreateFormHook";
import {
    CountryCreateFormHookType,
    CreateCountryFormType,
    createCountryInitialStaticValues,
    createCountrySchema
} from "./countryCreateFormData";

const CountryCreateForm: FC<CountryCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createCountryAlertData,
        handleCreateCountry,
        handleCreateCountryAndContinue,
        sequence,
        isCreateCountryPending
    }: CountryCreateFormHookType = useCountryCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createCountryAlertData} />
            <Formik initialValues={createCountryInitialStaticValues} validationSchema={createCountrySchema} onSubmit={handleCreateCountry}>
                {(props: FormikProps<CreateCountryFormType>) => (
                    <Form>
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <TextField label="Indice téléphonique" name="phoneCode" formikProps={props} />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateCountryPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateCountryAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface CountryCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default CountryCreateForm;