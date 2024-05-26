import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useAttributeCreateFormHook from "./useAttributeCreateFormHook";
import {staticSelectListAttributeTypes} from "../../../constants/generalConstants";
import SelectField from "../../form/SelectField";
import {
    AttributeCreateFormHookType,
    CreateAttributeFormType,
    createAttributeInitialStaticValues,
    createAttributeSchema
} from "./attributeCreateFormData";

const AttributeCreateForm: FC<AttributeCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
   const {
        createAttributeAlertData,
        handleCreateAttribute,
        handleCreateAttributeAndContinue,
        sequence,
        isCreateAttributePending
    }: AttributeCreateFormHookType = useAttributeCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createAttributeAlertData} />
            <Formik initialValues={createAttributeInitialStaticValues} validationSchema={createAttributeSchema} onSubmit={handleCreateAttribute}>
                {(props: FormikProps<CreateAttributeFormType>) => (
                    <Form>
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <SelectField
                                label="Type"
                                name="type"
                                formikProps={props}
                                values={staticSelectListAttributeTypes}
                            />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateAttributePending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateAttributeAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface AttributeCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default AttributeCreateForm;