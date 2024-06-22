import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import * as Yup from "yup";

import {AlertStatusEnumType, ErrorAlertType, URLParamType} from "../helpers/globalTypesHelper";
import {errorAlert} from "../helpers/generalHelpers";
import {formValidationMessage} from "../constants/generalConstants";
import {v1URL} from "../helpers/apiRequestsHelpers";
import {patchRequest} from "../helpers/axiosHelpers";

// ######################################## HOOK ######################################## //

const useImageUpdateHook = ({baseUrl, done, item}: ImageUpdateHookProps): ImageUpdateHookType => {
    const [updateImageAlertData, setUpdateImageAlertData] = useState<ErrorAlertType>({show: false});

    const updateImageResponse: UseMutationResult<AxiosResponse, AxiosError, ImageUpdateRequestDataType, any> = useMutation({
        mutationFn: changeImageRequest,
        onError: (error: AxiosError): void => {
            setUpdateImageAlertData(errorAlert(error));
        },
        onSuccess: (): void => {
            setUpdateImageAlertData({show: false});
            done();
        }
    });

    const handleUpdateImage = ({image}: ImageUpdateFormType): void => {
        if(image instanceof File) {
            updateImageResponse.mutate({image, baseUrl, id: item?.id});
        } else {
            setUpdateImageAlertData({show: true, status: AlertStatusEnumType.ERROR, message: "image_unreadable"});
        }
    };

    const isUpdateImagePending: boolean = updateImageResponse.isPending;

    return {
        isUpdateImagePending,
        updateImageAlertData,
        handleUpdateImage,
    };
};

// ######################################## STATICS DATA ######################################## //

export const imageUpdateInitialStaticValues: ImageUpdateFormType = { image: "" };

export const imageUpdateSchema: Yup.ObjectSchema<ImageUpdateFormType> = Yup.object().shape({
    image: Yup.mixed().required(formValidationMessage.required)
        .test("FILE_TYPE", formValidationMessage.imageAllowedFormat, (value: any): boolean => {
            if (value) {
                const supportedFormats: string[] = ["png", "jpg", "PNG", "JPG"];
                return supportedFormats.includes(value?.name.split(".").pop());
            }
            return true;
        })
        .test("FILE_SIZE", formValidationMessage.imageAllowedSize, (value: any): boolean => {
            if (value) {
                return value?.size <= 2097152;
            }
            return true;
        }),
});

export interface ImageUpdateFormType {
    image: unknown | File,
}

interface ImageUpdateRequestDataType {
    id?: string,
    image: File,
    baseUrl: string,
}

export interface ImageUpdateHookType {
    updateImageAlertData: ErrorAlertType,
    isUpdateImagePending: boolean,
    handleUpdateImage: (a: ImageUpdateFormType) => void,
}

interface ImageUpdateHookProps {
    baseUrl: string,
    done: () => void,
    item: any,
}

const changeImageRequest = ({image, baseUrl, id}: ImageUpdateRequestDataType): Promise<any> => {
    const params: Array<URLParamType> = [{param: "id", value: id}];
    const url: string = v1URL(baseUrl, params);

    const bodyFormData: FormData = new FormData();
    bodyFormData.append("image", image);

    return patchRequest(url, bodyFormData, {headers: {file: true}});
};

export default useImageUpdateHook;