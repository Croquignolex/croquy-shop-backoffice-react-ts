import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {AttributeValueType} from "../show/showAttributeValueData";
import useAttributeValueValueEditHook, {
    AttributeValueEditFormType,
    AttributeValueEditHookType,
    attributeValueEditSchema
} from "../hooks/useAttributeValueEditHook";

const AttributeValueValueEditForm: FC<AttributeValueEditFormProps> = ({selectedAttributeValue, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editAttributeValueAlertData,
        handleEditAttributeValue,
        formAttributeValue,
        isEditAttributeValuePending
    }: AttributeValueEditHookType = useAttributeValueValueEditHook({selectedAttributeValue, finished});

    return (
        <Box>

            <CustomAlert data={editAttributeValueAlertData} />

            <Formik initialValues={formAttributeValue} validationSchema={attributeValueEditSchema} onSubmit={handleEditAttributeValue} enableReinitialize>
                {(props: FormikProps<AttributeValueEditFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("value")} name="value" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditAttributeValuePending}
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

interface AttributeValueEditFormProps {
    selectedAttributeValue: AttributeValueType;
    finished: () => void;
}

export default AttributeValueValueEditForm;