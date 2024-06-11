import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Button, ButtonGroup, Flex} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditUserHook from "./useEditUserHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/PageHeader";
import {EditUserFormType, EditUserHookType, editUserSchema} from "./editUserData";
import NotFoundPage from "../../NotFoundPage";
import PasswordField from "../../../components/form/PasswordField";
import SelectField from "../../../components/form/SelectField";
import {staticSelectListGenderTypes, staticSelectListRoleTypes} from "../../../constants/generalConstants";

const EditUserPage = (): ReactElement => {
    const {
        editUserAlertData,
        handleEditUser,
        userResponseData,
        isUserPending,
        userAlertData,
        formUser,
        pageHeaderItems,
        isEditUserPending
    }: EditUserHookType = useEditUserHook();

    return (
        <>
            {/*<PageHeader*/}
            {/*    title={`Modifier utilisateur ${userResponseData.firstName}`}*/}
            {/*    items={pageHeaderItems}*/}
            {/*/>*/}
            <Container maxW={'3xl'}>
                <CustomAlert data={userAlertData} />
                <CustomAlert data={editUserAlertData} />
                {userAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formUser} validationSchema={editUserSchema} onSubmit={handleEditUser} enableReinitialize>
                            {(props: FormikProps<EditUserFormType>) => (
                                <Form>
                                    <Flex>
                                        <SelectField
                                            label="Rôle"
                                            name="role"
                                            formikProps={props}
                                            isLoading={isUserPending}
                                            values={staticSelectListRoleTypes}
                                        />
                                        <PasswordField label="Ancien mot de passe" name="oldPassword" isLoading={isUserPending} formikProps={props} />
                                    </Flex>
                                    <Flex>
                                        <PasswordField label="Mot de passe" name="password" isLoading={isUserPending} formikProps={props} />
                                        <PasswordField label="Mot de passe (confirmation)" name="confirmPassword" isLoading={isUserPending} formikProps={props} />
                                    </Flex>
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditUserPending}
                                            isDisabled={isUserPending}
                                            type='submit'
                                            fontWeight="none"
                                            leftIcon={<FiCheck />}
                                        >
                                            Confirmer
                                        </Button>
                                    </ButtonGroup>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditUserPage;