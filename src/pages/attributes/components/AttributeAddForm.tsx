import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import {staticSelectListAttributeTypes} from "../../../constants/generalConstants";
import SelectField from "../../../components/form/SelectField";
import useAttributeAddHook, {
    AttributeAddHookType,
    AttributeAddFormType,
    addAttributeSchema,
    attributeAddInitialStaticValues
} from "../hooks/useAttributeAddHook";

const AttributeAddForm: FC<AttributeAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addAttributeAlertData,
        handleAddAttribute,
        handleAddAttributeAndContinue,
        sequence,
        isAddAttributePending
    }: AttributeAddHookType = useAttributeAddHook({added, finished});

    return (
        <Box key={sequence}>

            <CustomAlert data={addAttributeAlertData} />

            <Formik initialValues={attributeAddInitialStaticValues} validationSchema={addAttributeSchema} onSubmit={handleAddAttribute}>
                {(props: FormikProps<AttributeAddFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <SelectField
                            label={t("type")}
                            name="type"
                            formikProps={props}
                            options={staticSelectListAttributeTypes}
                        />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddAttributePending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddAttributeAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface AttributeAddFormProps {
    finished: () => void;
    added: () => void;
}

export default AttributeAddForm;