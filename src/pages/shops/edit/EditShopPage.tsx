import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {FiCheck} from "react-icons/fi";
import {Box, Stack, Container, Flex, Button, ButtonGroup} from "@chakra-ui/react";

import CustomAlert from "../../../components/alert/CustomAlert";
import useEditShopHook from "./useEditShopHook";
import TextField from "../../../components/form/TextField";
import TextareaField from "../../../components/form/TextareaField";
import PageHeader from "../../../components/PageHeader";
import {EditShopFormType, EditShopHookType, editShopSchema} from "./editShopData";
import NotFoundPage from "../../NotFoundPage";

const EditShopPage = (): ReactElement => {
    const {
        editShopAlertData,
        handleEditShop,
        shopResponseData,
        isShopPending,
        shopAlertData,
        formShop,
        pageHeaderItems,
        isEditShopPending
    }: EditShopHookType = useEditShopHook();

    return (
        <>
            {/*<PageHeader*/}
            {/*    title={`Modifier boutique ${shopResponseData.name}`}*/}
            {/*    items={pageHeaderItems}*/}
            {/*/>*/}
            <Container maxW={'3xl'}>
                <CustomAlert data={shopAlertData} />
                <CustomAlert data={editShopAlertData} />
                {shopAlertData.show ? <NotFoundPage /> : (
                    <Stack as={Box} p={4} boxShadow="xl" borderWidth='1px' borderRadius='xl' bg={"white"}>
                        <Formik initialValues={formShop} validationSchema={editShopSchema} onSubmit={handleEditShop} enableReinitialize>
                            {(props: FormikProps<EditShopFormType>) => (
                                <Form>
                                    <Flex>
                                        <TextField label="Nom" name="name" isLoading={isShopPending} formikProps={props} />
                                        <TextField label="Slug" name="slug" isLoading={isShopPending} formikProps={props} />
                                    </Flex>
                                    <TextareaField label="Description" name="description" isLoading={isShopPending} formikProps={props} />
                                    <ButtonGroup>
                                        <Button
                                            colorScheme={"green"}
                                            isLoading={isEditShopPending}
                                            isDisabled={isShopPending}
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

export default EditShopPage;