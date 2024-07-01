import React, {FC, ReactElement, useState} from "react";
import {Form, Formik, FormikProps} from "formik";
import {Box, Button, CreateToastFnReturn, Spinner, useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {FiCheck} from "react-icons/fi";

import CustomAlert from "./alert/CustomAlert";
import {MediaType, ShapeEnumType, SizeType} from "../helpers/globalTypesHelper";
import DropzoneField from "./form/DropzoneField";
import ImagePreview from "./ImagePreview";
import DeleteIconButton from "./form/DeleteButtonIcon";
import ConfirmAlertDialog from "./ConfirmAlertDialog";
import useImageUpdateHook, {
    ImageUpdateHookType,
    imageUpdateInitialStaticValues,
    imageUpdateSchema,
    ImageUpdateFormType
} from "../hooks/useImageUpdateHook";
import useIDActionRequestHook, {
    IDActionRequestHookType,
    IDActionRequestType
} from "../hooks/useIDActionRequestHook";

const ImageUpdateForm: FC<ImageUpdateFormProps> = (
    {
        flag = false,
        logo = false,
        banner = false,
        image,
        uri,
    }): ReactElement => {

    const [loading, setLoading] = useState<boolean>(false);
    const [preview, setPreview] = useState<MediaType | null>(image);

    const {t} = useTranslation();
    const toast: CreateToastFnReturn = useToast();

    const deleteDone = (): void => {
        toast({
            title: t("delete"),
            description: `${t("image_deleted")}`
        });
        setPreview(null);
    };

    const updateDone = (): void => {
        toast({
            title: t("change"),
            description: `${t("image_changed")}`
        });
        preview && setPreview({...preview, path: "fake"});
    };

    const {
        isUpdateImagePending,
        updateImageAlertData,
        handleUpdateImage,
    }: ImageUpdateHookType = useImageUpdateHook({uri, done: updateDone});

    const {
        onModalClose: onDeleteModalClose,
        showModal: showDeleteModal,
        isModalOpen: isDeleteModalOpen,
        alertData: deleteImageAlertData,
        isPending: isDeleteImagePending,
        handleRequest: handleDeleteImage,
    }: IDActionRequestHookType = useIDActionRequestHook({
        uri,
        done: deleteDone,
        type: IDActionRequestType.DELETE
    });

    const shape: ShapeEnumType = (flag || logo) ? ShapeEnumType.SQUARE : ShapeEnumType.RECTANGLE;

    return (
        <Box>
            <CustomAlert data={updateImageAlertData} />
            <Formik initialValues={imageUpdateInitialStaticValues} validationSchema={imageUpdateSchema} onSubmit={handleUpdateImage} enableReinitialize>
                {(props: FormikProps<ImageUpdateFormType>) => (
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
                                        flag={flag}
                                        logo={logo}
                                        banner={banner}
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
                            {t("change")}
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

interface ImageUpdateFormProps {
    uri: string,
    image: MediaType | null,
    flag?: boolean,
    logo?: boolean,
    banner?: boolean,
}

export default ImageUpdateForm;