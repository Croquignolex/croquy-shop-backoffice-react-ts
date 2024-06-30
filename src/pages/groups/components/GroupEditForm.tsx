import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {GroupType} from "../show/showGroupData";
import useGroupEditHook, {
    GroupEditFormType,
    GroupEditHookType,
    groupEditSchema
} from "../hooks/useGroupEditHook";

const GroupEditForm: FC<GroupEditFormProps> = ({selectedGroup, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editGroupAlertData,
        handleEditGroup,
        formGroup,
        isEditGroupPending
    }: GroupEditHookType = useGroupEditHook({selectedGroup, finished});

    return (
        <Box>

            <CustomAlert data={editGroupAlertData} />

            <Formik initialValues={formGroup} validationSchema={groupEditSchema} onSubmit={handleEditGroup} enableReinitialize>
                {(props: FormikProps<GroupEditFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextField label={t("seo_title")} name="seoTitle" formikProps={props} />

                        <TextareaField label={t("seo_description")} name="seoDescription" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditGroupPending}
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

interface GroupEditFormProps {
    selectedGroup: GroupType;
    finished: () => void;
}

export default GroupEditForm;