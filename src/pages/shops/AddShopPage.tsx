import React, {ReactElement} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Box, Stack, Container, Flex} from "@chakra-ui/react";


import DisplayAlert from "../../components/DisplayAlert";
import useAddShopHook from "./useAddShopHook";
import TextField from "../../components/form/TextField";
import SubmitButton from "../../components/form/SumitButton";
import {AddShopFormType, AddShopHookType, addShopInitialValues, addShopSchema} from "./addShopData";
import TextareaField from "../../components/form/TextareaField";

const AddShopPage = (): ReactElement => {
    const {addShopAlertData, handleAddShop, isAddShopPending}: AddShopHookType = useAddShopHook();

    return (
        <Stack>
            <DisplayAlert data={addShopAlertData} />
            <Formik initialValues={addShopInitialValues} validationSchema={addShopSchema} onSubmit={handleAddShop}>
                {(props: FormikProps<AddShopFormType>) => (
                    <Form>
                        <Stack mt={4}>
                            <Stack as={Box} p={4} borderWidth='1px' borderRadius='3xl'>
                                <Flex>
                                    <TextField
                                        label="Nom"
                                        name="name"
                                        isInvalid={!!props.errors.name && !!props.touched.name}
                                        errorMessage={props.errors.name}
                                    />
                                    <Box mx={3} />
                                    <TextField
                                        label="Slug"
                                        name="slug"
                                        isInvalid={!!props.errors.slug && !!props.touched.slug}
                                        errorMessage={props.errors.slug}
                                    />
                                </Flex>
                                <Flex>
                                    <TextareaField
                                        label="Description"
                                        name="description"
                                        isInvalid={!!props.errors.description && !!props.touched.description}
                                        errorMessage={props.errors.description}
                                    />
                                </Flex>
                            </Stack>
                        </Stack>
                        <Container maxW={'md'}>
                            <SubmitButton isLoading={isAddShopPending}></SubmitButton>
                        </Container>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

export default AddShopPage;