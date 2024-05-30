import React, {FC, ReactElement} from "react";
import {FiEdit, FiPlus, FiCheck, FiTrash} from "react-icons/fi";
import {Form, Formik, FormikProps} from "formik";
import {Skeleton, Center, Stack, Button, ButtonGroup} from "@chakra-ui/react";

import ImageDisplay from "../ImageDisplay";
import {ImageSizeEnumType, MediaType} from "../../helpers/globalTypesHelper";
import useShowImageHook from "./useShowImageHook";
import CustomAlert from "../alert/CustomAlert";
import {ChangeImageFormType, changeImageInitialStaticValues, changeImageSchema, ShowImageHookType} from "./showImageData";
import ConfirmAlertDialog from "../ConfirmAlertDialog";
import HiddenFileField from "../form/HiddenFileField";

const ShowImage: FC<ShowImageProps> = (
    {
       id,
       image,
       imageSize,
       handleImageUpdate= (): void => {},
       imageBaseUrl  = "",
       isLoading
}): ReactElement => {
    const {
        changeImageAlertData,
        handleChangeImage,
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
            <Stack>
                {isLoading ? <Skeleton height={"200px"} width={"200px"} rounded={"md"} /> : (
                    <Stack>
                        <ImageDisplay image={image} size={imageSize} />
                        <Center>
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
                                                onClick={() => document.getElementById(id)?.click()}
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
                                        <HiddenFileField
                                            id={id}
                                            image={image}
                                            handleImageUpdate={handleImageUpdate}
                                            formikProps={props}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </Center>
                    </Stack>
                )}
            </Stack>
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
    id: string,
    imageSize: ImageSizeEnumType,
    image: MediaType | null,
    isLoading: boolean,
    imageBaseUrl?: string,
    handleImageUpdate?: (a: MediaType | null) => void,
}

export default ShowImage;