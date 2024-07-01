import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {AttributeType} from "../show/showAttributeData";
import {staticSelectListAttributeTypes} from "../../../constants/generalConstants";
import SelectField from "../../../components/form/SelectField";
import useAttributeEditHook, {
    AttributeEditFormType,
    AttributeEditHookType,
    attributeEditSchema
} from "../hooks/useAttributeEditHook";

const AttributeEditForm: FC<AttributeEditFormProps> = ({selectedAttribute, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editAttributeAlertData,
        handleEditAttribute,
        formAttribute,
        isEditAttributePending
    }: AttributeEditHookType = useAttributeEditHook({selectedAttribute, finished});

    return (
        <Box>

            <CustomAlert data={editAttributeAlertData} />

            <Formik initialValues={formAttribute} validationSchema={attributeEditSchema} onSubmit={handleEditAttribute} enableReinitialize>
                {(props: FormikProps<AttributeEditFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <SelectField
                            label={t("type")}
                            name="type"
                            formikProps={props}
                            values={staticSelectListAttributeTypes}
                        />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditAttributePending}
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

interface AttributeEditFormProps {
    selectedAttribute: AttributeType;
    finished: () => void;
}

export default AttributeEditForm;