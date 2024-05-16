import React, {ChangeEvent, FC, ReactElement} from "react";
import {FiEdit, FiPlus, FiCheck, FiAlertCircle, FiTrash} from "react-icons/fi";
import {Field, Form, Formik, FormikProps} from "formik";
import {
    Skeleton, Box, Center, Stack, Button, ButtonGroup,
    FormErrorMessage, Icon, Input, FormControl
} from "@chakra-ui/react";

import ImageDisplay from "../ImageDisplay";
import {ImageSizeEnumType, MediaType} from "../../helpers/globalTypesHelper";
import useShowImageHook from "./useShowImageHook";
import CustomAlert from "../alert/CustomAlert";
import {ChangeImageFormType, changeImageInitialStaticValues, changeImageSchema, ShowImageHookType} from "./showImageData";
import ConfirmAlertDialog from "../ConfirmAlertDialog";

const ShowImage: FC<ShowImageProps> = ({image, handleImageUpdate, imageBaseUrl, isLoading}): ReactElement => {
    const {
        changeImageAlertData,
        handleChangeImage,
        handleFileUpload,
        deleteImageAlertData,
        handleDeleteImage,
        isChangeImagePending,
        showDeleteModal,
        isDeleteModalOpen,
        isDeleteImagePending,
        onDeleteModalClose
    }: ShowImageHookType = useShowImageHook({imageBaseUrl, image, handleImageUpdate});

    return (
        <>
            <CustomAlert data={changeImageAlertData} />
            <Center>
                {isLoading ? <Skeleton height={"200px"} width={"200px"} rounded={"md"} /> : (
                    <Stack>
                        <ImageDisplay image={image} size={ImageSizeEnumType.small} />
                        <Box>
                            <Formik initialValues={changeImageInitialStaticValues} validationSchema={changeImageSchema} onSubmit={handleChangeImage}>
                                {(props: FormikProps<ChangeImageFormType>) => (
                                    <Form>
                                        <ButtonGroup>
                                            <Button
                                                fontWeight="none"
                                                colorScheme={"green"}
                                                variant={"outline"}
                                                leftIcon={image?.path ? <FiEdit /> : <FiPlus />}
                                                size={"sm"}
                                                onClick={() => document.getElementById('upload')?.click()}
                                            >
                                                {image?.path ? "Changer" : "Ajouter" }
                                            </Button>
                                            <Button
                                                colorScheme={"green"}
                                                isLoading={isChangeImagePending}
                                                type='submit'
                                                fontWeight="none"
                                                size={"sm"}
                                                isDisabled={!image?.base64}
                                                leftIcon={<FiCheck />}
                                            >
                                                Confirmer
                                            </Button>
                                            {image?.path && (
                                                <Button
                                                    fontWeight="none"
                                                    colorScheme={"red"}
                                                    size={"sm"}
                                                    leftIcon={<FiTrash />}
                                                    onClick={showDeleteModal}
                                                >
                                                    Supprimer
                                                </Button>
                                            )}
                                        </ButtonGroup>
                                        <Field
                                            as={Input}
                                            name="fake"
                                            type="file"
                                            accept="image/*"
                                            id={"upload"}
                                            hidden
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileUpload(e, props)}
                                        />
                                        <FormControl isInvalid={!!props.errors.image && !!props.touched.image}>
                                            <FormErrorMessage>
                                                <Icon mr="2" as={FiAlertCircle} /> {props.errors.image}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Stack>
                )}
            </Center>
            <ConfirmAlertDialog
                handleConfirm={handleDeleteImage}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteImagePending}
                alertData={deleteImageAlertData}
            >
                Supprimer l'image?
            </ConfirmAlertDialog>
        </>
    )
};

interface ShowImageProps {
    image: MediaType | null,
    isLoading: boolean,
    imageBaseUrl: string,
    handleImageUpdate: (a: MediaType | null) => void,
}

export default ShowImage;