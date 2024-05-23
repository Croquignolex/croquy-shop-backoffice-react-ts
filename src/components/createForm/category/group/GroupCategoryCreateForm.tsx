import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../../alert/CustomAlert";
import TextField from "../../../form/TextField";
import TextareaField from "../../../form/TextareaField";
import DoubleSaveButton from "../../../form/DoubleSaveButton";
import useGroupCategoryCreateFormHook from "./useGroupCategoryCreateFormHook";
import {
    GroupCategoryCreateFormHookType,
    CreateGroupCategoryFormType,
    createGroupCategoryInitialStaticValues,
    createGroupCategorySchema
} from "./groupCategoryCreateFormData";

const GroupCategoryCreateForm: FC<GroupCategoryCreateFormProps> = ({groupId, handleFinish, handleAdd}): ReactElement => {
    const {
        createGroupCategoryAlertData,
        handleCreateGroupCategory,
        handleCreateGroupCategoryAndContinue,
        sequence,
        isCreateGroupCategoryPending
    }: GroupCategoryCreateFormHookType = useGroupCategoryCreateFormHook({groupId, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createGroupCategoryAlertData} />
            <Formik initialValues={createGroupCategoryInitialStaticValues} validationSchema={createGroupCategorySchema} onSubmit={handleCreateGroupCategory}>
                {(props: FormikProps<CreateGroupCategoryFormType>) => (
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
                                isLoading={isCreateGroupCategoryPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateGroupCategoryAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface GroupCategoryCreateFormProps {
    groupId: string;
    handleFinish: () => void;
    handleAdd: () => void;
}

export default GroupCategoryCreateForm;