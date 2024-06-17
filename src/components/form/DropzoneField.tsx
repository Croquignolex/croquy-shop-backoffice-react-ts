import React, {FC, ReactNode, useCallback} from "react"
import {useDropzone} from "react-dropzone"
import {useTranslation} from "react-i18next";
import {Box, Flex, FormControl, FormErrorMessage, HStack, Icon, IconButton, Stack, Text} from "@chakra-ui/react";
import {FiAlertCircle, FiUpload} from "react-icons/fi";
import {FormikProps} from "formik";

import {defaultMedia, MediaType} from "../../helpers/globalTypesHelper";

const DropzoneField: FC<DropzoneFieldProps> = ({formikProps, image, handlePreview, handleLoading, children}) => {
    const {t} = useTranslation();

    const onDrop = useCallback((acceptedFiles: Array<File>): void => {
        acceptedFiles.forEach((file: File): void => {
            handleLoading(true);
            const reader: FileReader = new FileReader();
            formikProps.setFieldTouched("image", true).then();

            reader.onabort = () => formikProps.setFieldError("image", "FORM_IMAGE_UPLOAD_ABORT");

            reader.onerror = () => formikProps.setFieldError("image", "FORM_IMAGE_UPLOAD_ERROR");

            reader.onload = (): void => {
                formikProps.setFieldValue("image", file).then(
                    (): void => {
                        const base64: string | undefined = reader.result?.toString();

                        if(image === null) handlePreview({...defaultMedia, base64});
                        else handlePreview({...image, base64});

                        handleLoading(false);
                    }
                );
            }
            reader.readAsDataURL(file);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formikProps, image]);
    const {getRootProps, isDragActive} = useDropzone( {onDrop, accept: {'image/png': ['.png'], 'image/jpg': ['.jpg']}});

    const isInvalid: boolean = !!formikProps.errors["image"] && !!formikProps.touched["image"];

    return (
        <FormControl isInvalid={isInvalid} mb={4} px={1}>
            <Flex
                {...getRootProps()}
                borderColor={isInvalid ? "red.500" : (isDragActive ? "purple.500" : "gray.500")}
                borderStyle={"dashed"}
                borderWidth={2}
                rounded={"lg"}
                h={"15vh"}
                alignItems={"center"}
                justifyContent={"center"}
                as={Stack}
                cursor={"pointer"}
                _hover={{bg: "gray.50"}}
            >
                <Box>
                    <IconButton
                        aria-label="open menu"
                        icon={<FiUpload/>}
                        border={0}
                        variant={"outline"}
                        bg={"gray.100"}
                        color={"gray.500"}
                        _hover={{bg: "gray.100"}}
                    />
                </Box>
                <Text>{t("dropzone_text")}</Text>
            </Flex>

            <FormControl isInvalid={isInvalid}>
                <FormErrorMessage>
                    <Icon mr="2" as={FiAlertCircle} />
                    {t(formikProps.errors["image"]?.toString() || "")}
                </FormErrorMessage>
            </FormControl>

            <HStack mt={2}>{children}</HStack>
        </FormControl>
    );
};

interface DropzoneFieldProps {
    formikProps: FormikProps<any>,
    image: MediaType | null,
    handlePreview: (a: MediaType | null) => void,
    children: ReactNode,
    handleLoading: (a: boolean) => void,
}

export default DropzoneField;