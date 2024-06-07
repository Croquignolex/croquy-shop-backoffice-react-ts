import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiLogIn} from "react-icons/fi";
import {Text, Heading, Stack, Button, Center, Box} from "@chakra-ui/react";

import TextField from "../../components/form/TextField";
import PasswordField from "../../components/form/PasswordField";
import CustomAlert from "../../components/alert/CustomAlert";
import useLoginHook, {
    LoginFormType,
    LoginHookType,
    loginInitialStaticValues,
    loginSchema
} from "./useLoginHook";

const LoginPage = (): ReactElement => {
    const { handleLogin, isLoginPending, loginAlertData }: LoginHookType = useLoginHook();

    return (
        <>
            <Box my={8}>
                <Text fontSize={"xl"} mb={2} color="gray.700">Bienvenue</Text>
                <Text>Merci d'entre vos identifiants afin d'accéder à voter espace administrateur.</Text>
            </Box>
            <CustomAlert data={loginAlertData} />
            <Formik initialValues={loginInitialStaticValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                {(props: FormikProps<LoginFormType>) => (
                    <Form>
                        <TextField label="Votre identifiant" name="uu" formikProps={props} />
                        <PasswordField label="Votre mot de passe" name="uuuu" formikProps={props} />
                        <Stack>
                            <Button
                                colorScheme={"purple"}
                                isLoading={isLoginPending}
                                type="submit"
                                fontWeight="none"
                                variant="outline"
                                leftIcon={<FiLogIn />}
                            >
                                Connexion
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default LoginPage;