import React, {FC, ReactElement} from "react";
import {Flex, Stack} from "@chakra-ui/react";
import {Form, Formik, FormikProps} from "formik";

import CustomAlert from "../../alert/CustomAlert";
import TextField from "../../form/TextField";
import TextareaField from "../../form/TextareaField";
import DoubleSaveButton from "../../form/DoubleSaveButton";
import useUserCreateFormHook from "./useUserCreateFormHook";
import {staticSelectListGenderTypes, staticSelectListRoleTypes} from "../../../constants/generalConstants";
import SelectField from "../../form/SelectField";
import DateField from "../../form/DateField";
import PasswordField from "../../form/PasswordField";
import {
    UserCreateFormHookType,
    CreateUserFormType,
    createUserInitialStaticValues,
    createUserSchema
} from "./userCreateFormData";

const UserCreateForm: FC<UserCreateFormProps> = ({modal = false, handleFinish, handleAdd}): ReactElement => {
    const {
        createUserAlertData,
        handleCreateUser,
        handleCreateUserAndContinue,
        sequence,
        isCreateUserPending
    }: UserCreateFormHookType = useUserCreateFormHook({modal, handleFinish, handleAdd});

    return (
        <Stack key={sequence}>
            <CustomAlert data={createUserAlertData} />
            <Formik initialValues={createUserInitialStaticValues} validationSchema={createUserSchema} onSubmit={handleCreateUser}>
                {(props: FormikProps<CreateUserFormType>) => (
                    <Form>
                        <TextField label="Nom d'utilisateur" name="username" formikProps={props} />
                        <Flex>
                            <PasswordField label="Mot de passe" name="password" formikProps={props} />
                            <PasswordField label="Mot de passe (confirmation)" name="confirmPassword" formikProps={props} />
                        </Flex>
                        <Flex>
                            <TextField label="Prénom" name="firstName" formikProps={props} />
                            <TextField label="Nom" name="lastName" formikProps={props} />
                        </Flex>
                        <Flex>
                            <TextField label="Proféssion" name="profession" formikProps={props} />
                            <DateField label="Debut de naissance" name="birthdate" formikProps={props} />
                        </Flex>
                        <Flex>
                            <SelectField
                                label="Rôle"
                                name="role"
                                formikProps={props}
                                values={staticSelectListRoleTypes}
                            />
                            <SelectField
                                label="Genre"
                                name="gender"
                                formikProps={props}
                                values={staticSelectListGenderTypes}
                            />
                        </Flex>
                        <TextareaField label="Description" name="description" formikProps={props} />
                        <Stack>
                            <DoubleSaveButton
                                isLoading={isCreateUserPending}
                                formikProps={props}
                                handleSaveAndContinue={() => handleCreateUserAndContinue(props.values)}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

interface UserCreateFormProps {
    modal?: boolean;
    handleFinish?: () => void;
    handleAdd?: () => void;
}

export default UserCreateForm;