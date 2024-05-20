import * as Yup from "yup";
import {ChangeEvent} from "react";
import {FormikProps} from "formik";

import {ErrorAlertType, MediaType} from "../../helpers/globalTypesHelper";
import {formValidationMessage} from "../../constants/generalConstants";
import {deleteRequest, patchRequest} from "../../helpers/axiosHelpers";
import {v1URL} from "../../helpers/apiRequestsHelpers";

export const changeImageInitialStaticValues: ChangeImageFormType = { image: ''};

export const changeImageSchema: Yup.ObjectSchema<ChangeImageFormType> = Yup.object().shape({
    image: Yup.mixed().required(formValidationMessage.required)
        .test('FILE_TYPE', formValidationMessage.imageAllowedFormat, (value: any): boolean => {
            if (value) {
                const supportedFormats: string[] = ['png', 'jpg', 'PNG', 'JPG'];
                return supportedFormats.includes(value?.name.split('.').pop());
            }
            return true;
        })
        .test('FILE_SIZE', formValidationMessage.imageAllowedSize, (value: any): boolean => {
            if (value) {
                return value?.size <= 2097152;
            }
            return true;
        }),
});

export interface ChangeImageFormType {
    image: unknown | File,
}

export interface ChangeImageRequestDataType {
    image: File,
    baseUrl: string,
}

export interface DestroyImageRequestDataType {
    baseUrl: string,
}

export interface ShowImageHookType {
    changeImageAlertData: ErrorAlertType,
    deleteImageAlertData: ErrorAlertType,
    handleChangeImage: (a: ChangeImageFormType) => void,
    isChangeImagePending: boolean,
    isDeleteImagePending: boolean,
    isDeleteModalOpen: boolean,
    showDeleteModal: () => void,
    handleDeleteImage: () => void,
    onDeleteModalClose: () => void,
    handleFileUpload: (a: ChangeEvent<HTMLInputElement>, b: FormikProps<ChangeImageFormType>) => void,
}

export interface ShowImageHookProps {
    imageBaseUrl: string,
    image: MediaType | null,
    handleImageUpdate: (a: MediaType | null) => void,
}

export const changeImageRequest = ({image, baseUrl}: ChangeImageRequestDataType): Promise<any> => {
    const url: string = v1URL(baseUrl);

    const bodyFormData: FormData = new FormData();
    bodyFormData.append('image', image);

    return patchRequest(url, bodyFormData, {headers: {file: true}});
};

export const destroyImageRequest = ({baseUrl}: DestroyImageRequestDataType): Promise<any> => {
    const url: string = v1URL(baseUrl);

    return deleteRequest(url);
};