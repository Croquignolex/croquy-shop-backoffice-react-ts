import React, {FC, ReactElement, useState} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Box, Button, Spinner} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {FiCheck} from "react-icons/fi";

import CustomAlert from "./alert/CustomAlert";
import {MediaType, ShapeEnumType, SizeType} from "../helpers/globalTypesHelper";
import DropzoneField from "./form/DropzoneField";
import ImagePreview from "./ImagePreview";
import DeleteIconButton from "./form/DeleteButtonIcon";
import ConfirmAlertDialog from "./ConfirmAlertDialog";
import useImageDeleteHook, {ImageDeleteHookType} from "../hooks/useImageDeleteHook";
import useImageUpdateHook, {
    ImageUpdateHookType, UpdateImageFormType,
    updateImageInitialStaticValues,
    updateImageSchema
} from "../hooks/useImageUpdateHook";

const ImageUpdateForm: FC<CountryFlagFormProps> = ({flag = false, image, imageBaseUrl}): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);
    const [preview, setPreview] = useState<MediaType | null>(image);

    const {t} = useTranslation();
    const {
        isUpdateImagePending,
        updateImageAlertData,
        handleUpdateImage,
    }: ImageUpdateHookType = useImageUpdateHook({
        imageBaseUrl,
        finished: (): void => {
            preview && setPreview({...preview, path: "fake"});
        }
    });
    const {
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteImageAlertData,
        isDeleteImagePending,
        handleDeleteImage,
    }: ImageDeleteHookType = useImageDeleteHook({
        imageBaseUrl,
        deleted: (): void => {
            setPreview(null);
        }
    });

    const shape: ShapeEnumType = flag ? ShapeEnumType.SQUARE : ShapeEnumType.RECTANGLE;

    return (
        <Box>
            <CustomAlert data={updateImageAlertData} />
            <Formik initialValues={updateImageInitialStaticValues} validationSchema={updateImageSchema} onSubmit={handleUpdateImage} enableReinitialize>
                {(props: FormikProps<UpdateImageFormType>) => (
                    <Form>
                        <DropzoneField
                            formikProps={props}
                            image={image}
                            handleLoading={(lod: boolean) => setLoading(lod)}
                            handlePreview={(media: MediaType | null) => setPreview(media)}
                        >
                            {loading ? <Spinner /> : (
                                <>
                                    <ImagePreview
                                        flag
                                        image={preview}
                                        size={SizeType.MEDIUM}
                                        shape={shape}
                                    />
                                    {preview?.path && (
                                        <DeleteIconButton
                                            showDeleteModal={(): void => {
                                                showDeleteModal();
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </DropzoneField>
                        <Button
                            isDisabled={!preview?.base64 || loading}
                            isLoading={isUpdateImagePending}
                            type="submit"
                            leftIcon={<FiCheck />}
                        >
                            {t("confirm")}
                        </Button>
                    </Form>
                )}
            </Formik>
            <ConfirmAlertDialog
                danger
                handleConfirm={handleDeleteImage}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteImagePending}
                alertData={deleteImageAlertData}
            >
                {t("delete_image")}?
            </ConfirmAlertDialog>
        </Box>
    );
};

interface CountryFlagFormProps {
    imageBaseUrl: string,
    image: MediaType | null,
    flag?: boolean,
}

export default ImageUpdateForm;