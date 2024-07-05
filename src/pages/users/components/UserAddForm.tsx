import React, {FC, ReactElement, useState} from "react";
import {Box} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";
import {useTranslation} from "react-i18next";

import CustomAlert from "../../../components/alert/CustomAlert";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import DoubleSaveButton from "../../../components/form/DoubleSaveButton";
import PasswordField from "../../../components/form/PasswordField";
import DateField from "../../../components/form/DateField";
import SelectField from "../../../components/form/SelectField";
import {staticSelectListGenderTypes, staticSelectListRoleTypes} from "../../../constants/generalConstants";
import useUserAddHook, {
    UserAddHookType,
    UserAddFormType,
    userAddSchema,
    userAddInitialStaticValues
} from "../hooks/useUserAddHook";

const UserAddForm: FC<UserAddFormProps> = ({added, finished}): ReactElement => {
    const {t} = useTranslation();
    const {
        addUserAlertData,
        handleAddUser,
        handleAddUserAndContinue,
        sequence,
        isAddUserPending
    }: UserAddHookType = useUserAddHook({added, finished});

    const [date, setDate] = useState(new Date())

    return (
        <Box key={sequence}>

            <CustomAlert data={addUserAlertData} />

            <Formik initialValues={userAddInitialStaticValues} validationSchema={userAddSchema} onSubmit={handleAddUser}>
                {(props: FormikProps<UserAddFormType>) => (
                    <Form>
                        <TextField label={t("username")} name="username" formikProps={props} />

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
                            label={t("gender")}
                            name="gender"
                            formikProps={props}
                            values={staticSelectListGenderTypes}
                        />

                        <PasswordField label={t("password")} name="password" formikProps={props} />

                        <PasswordField label={t("confirm_password")} name="confirmPassword" formikProps={props} />

                        <TextareaField label={t("description")} name="description" formikProps={props} />

                        <DoubleSaveButton
                            isLoading={isAddUserPending}
                            formikProps={props}
                            handleSaveAndContinue={() => handleAddUserAndContinue(props.values)}
                        />
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

interface UserAddFormProps {
    finished: () => void;
    added: () => void;
}

export default UserAddForm;