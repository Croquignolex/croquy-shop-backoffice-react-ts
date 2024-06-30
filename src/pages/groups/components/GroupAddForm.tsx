import React, {FC, ReactElement} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import useGroupAddHook, {
    GroupAddHookType,
    GroupAddFormType,
    addGroupSchema,
    groupAddInitialStaticValues
} from "../hooks/useGroupAddHook";

const GroupAddForm: FC<GroupAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addGroupAlertData,
        handleAddGroup,
        handleAddGroupAndContinue,
        sequence,
        isAddGroupPending
    }: GroupAddHookType = useGroupAddHook({added, finished});

    return (
        <Box key={sequence}>

            <CustomAlert data={addGroupAlertData} />

            <Formik initialValues={groupAddInitialStaticValues} validationSchema={addGroupSchema} onSubmit={handleAddGroup}>
                {(props: FormikProps<GroupAddFormType>) => (
                    <Form>
                        <TextField label={t("name")} name="name" formikProps={props} />

                        <TextField label={t("slug")} name="slug" formikProps={props} />

                        <TextField label={t("seo_title")} name="seoTitle" formikProps={props} />

                        <TextareaField label={t("seo_description")} name="seoDescription" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddGroupPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddGroupAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface GroupAddFormProps {
    finished: () => void;
    added: () => void;
}

export default GroupAddForm;