import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useStateAddHook, {
    AddStateFormType,
    addStateInitialStaticValues,
    addStateSchema,
    StateAddHookType
} from "../hooks/useStateAddHook";
import SelectLink from "../../../components/form/SelectLink";

const StateAddForm: FC<StateAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addStateAlertData,
        handleAddState,
        handleAddStateAndContinue,
        sequence,
        isAddStatePending
    }: StateAddHookType = useStateAddHook({added, finished});

    return (
        <Box key={sequence}>
            <CustomAlert data={addStateAlertData} />
            <Formik initialValues={addStateInitialStaticValues} validationSchema={addStateSchema} onSubmit={handleAddState}>
                {(props: FormikProps<AddStateFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />
                        {/*<SelectLink onModalOpen={onAddCountryModalOpen} label={"Ajouter un pays"} />*/}
                        {/*<SelectField
                                label="Pays"
                                name="countryId"
                                formikProps={props}
                                values={selectListCountries}
                                isLoading={isSelectListCountriesPending}
                            />*/}
                        <TextareaField label={t("description")} name="description" formikProps={props} />
                        <DoubleSaveButton
                            isLoading={isAddStatePending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddStateAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface StateAddFormProps {
    finished: () => void;
    added: () => void;
}

export default StateAddForm;