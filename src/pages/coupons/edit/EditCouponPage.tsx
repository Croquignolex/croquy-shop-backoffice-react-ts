import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditCouponHook from "./useEditCouponHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/menu/PageHeader";
import {EditCountryFormType, EditCountryHookType, editCountrySchema} from "./editCouponData";
import NotFoundPage from "../../NotFoundPage";

const EditCouponPage = (): ReactElement => {
    const {
        editCountryAlertData,
        handleEditCountry,
        countryResponseData,
        isCountryPending,
        countryAlertData,
        formCountry,
        pageHeaderItems,
        isEditCountryPending
    }: EditCountryHookType = useEditCouponHook();

    return (
        <>
            <PageHeader
                title={`Modifier pays ${countryResponseData.name}`}
                items={pageHeaderItems}
            />
            <Container maxW={'3xl'}>
                <CustomAlert data={countryAlertData} />
                <CustomAlert data={editCountryAlertData} />
                {countryAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formCountry} validationSchema={editCountrySchema} onSubmit={handleEditCountry} enableReinitialize>
                            {(props: FormikProps<EditCountryFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField
                                            label="Nom"
                                            name="name"
                                            isLoading={isCountryPending}
                                            isInvalid={!!props.errors.name && !!props.touched.name}
                                            errorMessage={props.errors.name}
                                        />
                                        <Box mx={3} />
                                        <TextField
                                            label="Indice téléphonique"
                                            name="phoneCode"
                                            isLoading={isCountryPending}
                                            isInvalid={!!props.errors.phoneCode && !!props.touched.phoneCode}
                                            errorMessage={props.errors.phoneCode}
                                        />
                                    </Flex>
                                    <Flex>
                                        <TextareaField
                                            label="Description"
                                            name="description"
                                            isLoading={isCountryPending}
                                            isInvalid={!!props.errors.description && !!props.touched.description}
                                            errorMessage={props.errors.description}
                                        />
                                    </Flex>
                                    <Flex>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditCountryPending}
                                            isDisabled={isCountryPending}
                                            type='submit'
                                            fontWeight="none"
                                            leftIcon={<FiCheck />}
                                        >
                                            Confirmer
                                        </Button>
                                    </Flex>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                )}
            </Container>
        </>
    );
};

export default EditCouponPage;