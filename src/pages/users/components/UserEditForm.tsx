import React, {FC, ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import {UserType} from "../show/showUserData";
import DateField from "../../../components/form/DateField";
import SelectField from "../../../components/form/SelectField";
import {staticSelectListGenderTypes, staticSelectListRoleTypes} from "../../../constants/generalConstants";
import useUserEditHook, {
    UserEditFormType,
    UserEditHookType,
    userEditSchema,
} from "../hooks/useUserEditHook";

const UserEditForm: FC<UserEditFormProps> = ({selectedUser, finished}): ReactElement => {
    const {t} = useTranslation();

    const {
        editUserAlertData,
        handleEditUser,
        formUser,
        isEditUserPending
    }: UserEditHookType = useUserEditHook({selectedUser, finished});

    return (
        <Box>

            <CustomAlert data={editUserAlertData} />

            <Formik initialValues={formUser} validationSchema={userEditSchema} onSubmit={handleEditUser} enableReinitialize>
                {(props: FormikProps<UserEditFormType>) => (
                    <Form>
                        <TextField label={t("first_name")} name="firstName" formikProps={props} />

                        <TextField label={t("last_name")} name="lastName" formikProps={props} />

                        <TextField label={t("profession")} name="profession" formikProps={props} />

                        <DateField label={t("birthdate")} name="birthdate" formikProps={props} />

                        <SelectField
                            label={t("role")}
                            name="role"
                            formikProps={props}
                            values={staticSelectListRoleTypes}
                        />

                        <SelectField
                            label={t("name")}
                            name="gender"
                            formikProps={props}
                            values={staticSelectListGenderTypes}
                        />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <ButtonGroup>
                            <Button
                                isLoading={isEditUserPending}
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

interface UserEditFormProps {
    selectedUser: UserType;
    finished: () => void;
}

export default UserEditForm;