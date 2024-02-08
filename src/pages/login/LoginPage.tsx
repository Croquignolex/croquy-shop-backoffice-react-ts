import React, { ReactElement } from "react";

// import useLoginPageHook from "./useLoginPageHook";

const LoginPage = (): ReactElement => {
    // const { handleLogin, isLoading, alertData } = useLoginPageHook();

    return (
        <>
            Customer login page
            {/*<Container mt={4} maxW={'xl'}>
                <Flex align={'center'} justify={'center'}>
                    <Stack w={'full'}>
                        <Heading fontSize={'2xl'} alignSelf='center'>Bienvenue</Heading>
                        <Box alignSelf='center' mt={2}>
                            Nouveau sur {appInfo.name}?
                            <Text as='u' fontWeight='bold' ml={1}>
                                <Link to={routes.register.path}>Incrivez-vous</Link>
                            </Text>
                        </Box>
                        <DisplayAlert data={alertData} />
                        <Stack my={6}>
                            <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                                {(props: FormikProps<LoginFormType>) => (
                                    <Form>
                                        <TextField
                                            label="Votre addresse email"
                                            name="email"
                                            isInvalid={!!props.errors.email && !!props.touched.email}
                                            errorMessage={props.errors.email}
                                        />
                                        <PasswordField
                                            label="Votre mot de passe"
                                            name="password"
                                            isInvalid={!!props.errors.password && !!props.touched.password}
                                            errorMessage={props.errors.password}
                                        />
                                        <SubmitButton isLoading={isLoading} label="Connexion"></SubmitButton>
                                    </Form>
                                )}
                            </Formik>
                        </Stack>
                        <Stack>
                            <Text as='u' fontWeight='bold'>
                                <Link to="#">Vous avez des difficultés à vous connecter?</Link>
                            </Text>

                            <Text mt={2}>
                                Ou connectez-vous avec
                            </Text>

                            <HStack mt={2}>
                                <Stack w={'full'}>
                                    <Button backgroundColor='white' color="red" borderWidth={1} rounded='full' leftIcon={<FaGoogle />}>
                                        Google
                                    </Button>
                                </Stack>
                                <Stack w={'full'}>
                                    <Button backgroundColor='white' color="blue" borderWidth={1} rounded='full' leftIcon={<FaFacebook />}>
                                        Facebook
                                    </Button>
                                </Stack>
                                <Stack w={'full'}>
                                    <Button backgroundColor='white' color="black" borderWidth={1} rounded='full' leftIcon={<FaApple />}>
                                        Apple
                                    </Button>
                                </Stack>
                            </HStack>
                        </Stack>
                    </Stack>
                </Flex>
            </Container>*/}
        </>
    );
};

export default LoginPage;