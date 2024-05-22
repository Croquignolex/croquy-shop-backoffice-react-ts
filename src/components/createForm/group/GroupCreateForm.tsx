import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useGroupCreateFormHook from "./useGroupCreateFormHook";
import {
    GroupCreateFormHookType,
    CreateGroupFormType,
    createGroupInitialStaticValues,
    createGroupSchema
} from "./groupCreateFormData";

const GroupCreateForm: FC<GroupCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createGroupAlertData,
        handleCreateGroup,
        handleCreateGroupAndContinue,
        sequence,
        isCreateGroupPending
    }: GroupCreateFormHookType = useGroupCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createGroupAlertData} />
            <Formik initialValues={createGroupInitialStaticValues} validationSchema={createGroupSchema} onSubmit={handleCreateGroup}>
                {(props: FormikProps<CreateGroupFormType>) => (
                    <Form>
                        <Flex>
                            <TextField label="Nom" name="name" formikProps={props} />
                            <TextField label="Slug" name="slug" formikProps={props} />
                        </Flex>
                        <TextField label="Titre SEO" name="seoTitle" formikProps={props} />
                        <Flex>
                            <TextareaField label="Description SEO" name="seoDescription" formikProps={props} />
                            <TextareaField label="Description" name="description" formikProps={props} />
                        </Flex>
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateGroupPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateGroupAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface GroupCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default GroupCreateForm;