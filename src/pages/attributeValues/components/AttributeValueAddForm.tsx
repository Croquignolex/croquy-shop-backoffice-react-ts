import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useAttributeValueValueAddHook, {
    AttributeValueAddHookType,
    AttributeValueAddFormType,
    addAttributeValueSchema,
    attributeValueAddInitialStaticValues
} from "../hooks/useAttributeValueAddHook";

const AttributeValueValueAddForm: FC<AttributeValueAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addAttributeValueAlertData,
        handleAddAttributeValue,
        handleAddAttributeValueAndContinue,
        sequence,
        isAddAttributeValuePending
    }: AttributeValueAddHookType = useAttributeValueValueAddHook({added, finished});

    return (
        <Box key={sequence}>

            <CustomAlert data={addAttributeValueAlertData} />

            <Formik initialValues={attributeValueAddInitialStaticValues} validationSchema={addAttributeValueSchema} onSubmit={handleAddAttributeValue}>
                {(props: FormikProps<AttributeValueAddFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("value")} name="value" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddAttributeValuePending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddAttributeValueAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface AttributeValueAddFormProps {
    finished: () => void;
    added: () => void;
}

export default AttributeValueValueAddForm;