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

const LoginPage = (): ReactElement => {
    const {handleLogin, isLoginPending, loginAlertData}: LoginHookType = useLoginHook();
    const {t} = useTranslation();

    return (
        <>
            <Box my={8}>
                <Text fontSize={"xl"} mb={2} color="gray.700">{t("welcome")}</Text>
                <Text>{t("login_instructions")}</Text>
            </Box>
            <CustomAlert data={loginAlertData} />
            <Box my={4}>
                <Formik initialValues={loginInitialStaticValues} validationSchema={loginSchema} onSubmit={handleLogin}>
                    {(props: FormikProps<LoginFormType>) => (
                        <Form>
                            <TextField label={t("your_login")} name="username" formikProps={props} />
                            <PasswordField label={t("your_password")} name="password" formikProps={props} />
                            <Stack mt={8}>
                                <Button isLoading={isLoginPending} type="submit" leftIcon={<FiLogIn />}>
                                    {t("login")}
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