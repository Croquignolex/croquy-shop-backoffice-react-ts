import React, { ReactElement } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Container, Flex, Heading, Stack } from "@chakra-ui/react";

import TextField from "../../components/form/TextField";
import PasswordField from "../../components/form/PasswordField";
import { initialValues, LoginFormType, loginSchema } from "./loginPageData";
import useLoginPageHook from "./useLoginPageHook";
import DisplayAlert from "../../components/DisplayAlert";
import SubmitButton from "../../components/form/SumitButton";
import { log } from "../../helpers/generalHelpers";

const LoginPage = (): ReactElement => {
    const { handleLogin, isPending, alertData } = useLoginPageHook();

    log("LoginPage component", {handleLogin, isPending, alertData});

    return (
        <>
            <Container mt={4} maxW={'xl'}>
                <Flex align={'center'} justify={'center'}>
                    <Stack w={'full'}>
                        <Heading fontSize={'xl'} alignSelf='center' mb={3}>Bienvenue</Heading>
                        <DisplayAlert data={alertData} />
                        <Stack mt={3} mb={6}>
                            <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                                {(props: FormikProps<LoginFormType>) => (
                                    <Form>
                                        <TextField
                                            label="Votre identifiant"
                                            name="username"
                                            isInvalid={!!props.errors.username && !!props.touched.username}
                                            errorMessage={props.errors.username}
                                        />
                                        <PasswordField
                                            label="Votre mot de passe"
                                            name="password"
                                            isInvalid={!!props.errors.password && !!props.touched.password}
                                            errorMessage={props.errors.password}
                                        />
                                        <SubmitButton isLoading={isPending} label="Connexion"></SubmitButton>
                                    </Form>
                                )}
                            </Formik>
                        </Stack>
                    </Stack>
                </Flex>
            </Container>
        </>
    );
};

export default LoginPage;