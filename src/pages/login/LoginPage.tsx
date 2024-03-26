import React, { ReactElement } from "react";
import { Form, Formik, FormikProps } from "formik";
import { FiLogIn } from "react-icons/fi";
import {Container, Flex, Heading, Stack, Button} from "@chakra-ui/react";

import TextField from "../../components/form/TextField";
import PasswordField from "../../components/form/PasswordField";
import {LoginFormType, LoginHookType, loginSchema, loginInitialStaticValues} from "./loginData";
import useLoginHook from "./useLoginHook";
import DisplayAlert from "../../components/DisplayAlert";

const LoginPage = (): ReactElement => {
    const { handleLogin, isLoginPending, loginAlertData }: LoginHookType = useLoginHook();

    return (
        <Container py={{ base: '6', md: '12' }} px={{ base: '0', sm: '8' }} maxW={'lg'}>
            <Stack p={4} borderWidth='1px' borderRadius='3xl'>
                <Flex align={'center'} justify={'center'}>
                    <Stack w={'full'}>
                        <Heading fontSize={'xl'} alignSelf='center' mb={3}>Bienvenue</Heading>
                        <DisplayAlert data={loginAlertData} />
                        <Stack spacing={6}>
                            <Formik initialValues={loginInitialStaticValues} validationSchema={loginSchema} onSubmit={handleLogin}>
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
                                        <Stack>
                                            <Button
                                                colorScheme={"orange"}
                                                variant={"solid"}
                                                isLoading={isLoginPending}
                                                type='submit'
                                                size='md'
                                                fontWeight="none"
                                                leftIcon={<FiLogIn />}
                                            >
                                                Connexion
                                            </Button>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        </Stack>
                    </Stack>
                </Flex>
            </Stack>
        </Container>
    );
};

export default LoginPage;