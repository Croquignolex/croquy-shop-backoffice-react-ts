import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useAttributeValueCreateFormHook from "./useAttributeValueCreateFormHook";
import {
    AttributeValueCreateFormHookType,
    CreateAttributeValueFormType,
    createAttributeValueInitialStaticValues,
    createAttributeValueSchema
} from "./attributeValueCreateFormData";

const AttributeValueCreateForm: FC<AttributeValueCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createAttributeValueAlertData,
        handleCreateAttributeValue,
        handleCreateAttributeValueAndContinue,
        sequence,
        isCreateAttributeValuePending
    }: AttributeValueCreateFormHookType = useAttributeValueCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createAttributeValueAlertData} />
            <Formik initialValues={createAttributeValueInitialStaticValues} validationSchema={createAttributeValueSchema} onSubmit={handleCreateAttributeValue}>
                {(props: FormikProps<CreateAttributeValueFormType>) => (
                    <Form>
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <TextField label="Valeur" name="value" formikProps={props} />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateAttributeValuePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateAttributeValueAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface AttributeValueCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default AttributeValueCreateForm;