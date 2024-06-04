import React, { ReactElement } from "react";
import { Form, Formik, FormikProps } from "formik";
import { FiLogIn } from "react-icons/fi";
import {Container, Flex, Heading, Stack, Button} from "@chakra-ui/react";

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
        <Container py={{ base: '6', md: '12' }} px={{ base: '0', sm: '8' }} maxW={'lg'}>
            <Stack p={4} borderWidth='1px' borderRadius='xl' boxShadow='2xl'>
                <Flex align={'center'} justify={'center'}>
                    <Stack w={'full'}>
                        <Heading fontSize={'xl'} alignSelf='center' mb={3}>Bienvenue</Heading>
                        <CustomAlert data={loginAlertData} />
                        <Stack spacing={6}>
                            <Formik initialValues={loginInitialStaticValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                                {(props: FormikProps<LoginFormType>) => (
                                    <Form>
                                        <TextField label="Votre identifiant" name="username" formikProps={props} />
                                        <PasswordField label="Votre mot de passe" name="password" formikProps={props} />
                                        <Stack>
                                            <Button
                                                colorScheme={"green"}
                                                isLoading={isLoginPending}
                                                type='submit'
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