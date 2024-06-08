import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiLogIn} from "react-icons/fi";
import {Text, Stack, Button, Box} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

import TextField from "../../components/form/TextField";
import PasswordField from "../../components/form/PasswordField";
import CustomAlert from "../../components/alert/CustomAlert";
import useLoginHook, {
    LoginFormType,
    LoginHookType,
    loginInitialStaticValues,
    loginSchema
} from "./useLoginHook";
import LocaleSwitcher from "../../components/LocaleSwitcher";

const LoginPage = (): ReactElement => {
    const {handleLogin, isLoginPending, loginAlertData}: LoginHookType = useLoginHook();
    const {t} = useTranslation();

    return (
        <>
            <Box my={8}>
                <LocaleSwitcher />
                <Text>{t("user_greeting", {firstName: "toto", lastName: "tata"})}</Text>
                <Text fontSize={"xl"} mb={2} color="gray.700">Bienvenue</Text>
                <Text>Merci d'entrer vos identifiants afin d'accéder à voter espace administrateur</Text>
            </Box>
            <CustomAlert data={loginAlertData} />
            <Box mt={4}>
                <Formik initialValues={loginInitialStaticValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                    {(props: FormikProps<LoginFormType>) => (
                        <Form>
                            <TextField label="Votre identifiant" name="username" formikProps={props} />
                            <PasswordField label="Votre mot de passe" name="password" formikProps={props} />
                            <Stack mt={8}>
                                <Button isLoading={isLoginPending} type="submit" leftIcon={<FiLogIn />}>
                                    Connexion
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default LoginPage;