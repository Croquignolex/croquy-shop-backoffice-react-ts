import React, { ReactElement } from "react";
import { Form, Formik, FormikProps } from "formik";
import { Container, Flex, Heading, Stack, Card, CardBody } from "@chakra-ui/react";

import TextField from "../../components/form/TextField";
import PasswordField from "../../components/form/PasswordField";
import {loginInitialValues, LoginFormType, LoginHookType, loginSchema} from "./loginData";
import useLoginHook from "./useLoginHook";
import DisplayAlert from "../../components/DisplayAlert";
import SubmitButton from "../../components/form/SumitButton";

const LoginPage = (): ReactElement => {
    const { handleLogin, isLoginPending, loginAlertData }: LoginHookType = useLoginHook();

    return (
        <>
            <Container py={{ base: '6', md: '12' }} px={{ base: '0', sm: '8' }} maxW={'lg'}>
                <Flex align={'center'} justify={'center'}>
                    <Stack w={'full'}>
                        <Heading fontSize={'xl'} alignSelf='center' mb={3}>Bienvenue</Heading>
                        <Card>
                            <CardBody>
                                <DisplayAlert data={loginAlertData} />
                                <Stack spacing={6}>
                                    <Formik initialValues={loginInitialValues} validationSchema={loginSchema} onSubmit={handleLogin}>
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
                                                <SubmitButton isLoading={isLoginPending} label="Connexion"></SubmitButton>
                                            </Form>
                                        )}
                                    </Formik>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Stack>
                </Flex>
            </Container>
        </>
    );
};

export default LoginPage;