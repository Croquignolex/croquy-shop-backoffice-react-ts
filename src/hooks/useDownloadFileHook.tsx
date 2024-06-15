import { AxiosError, AxiosResponse } from "axios";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {patchRequest} from "../helpers/axiosHelpers";
import {AlertStatusEnumType, FileType} from "../helpers/globalTypesHelper";
import {errorAlert} from "../helpers/generalHelpers";
import {v1URL} from "../helpers/apiRequestsHelpers";

// ######################################## STATICS DATA ######################################## //

export interface DownloadFileHookType {
    isDownloadFilePending: boolean,
    handleDownload: (a: FileType) => void,
}

export interface TypeRequestDataType {
    baseUrl: string,
    type: FileType
}

export const downloadFile = ({type, baseUrl}: TypeRequestDataType): Promise<any> => {
    const url: string = v1URL(baseUrl + "/download");

    return patchRequest(url, {type});
};

// ######################################## HOOK ######################################## //

const useDownloadFileHook = ({baseUrl}: {baseUrl: string}): DownloadFileHookType => {
    const toast: CreateToastFnReturn = useToast();
    const {t} = useTranslation();

    const downloadFileResponse: UseMutationResult<AxiosResponse, AxiosError, TypeRequestDataType, any> = useMutation({
        mutationFn: downloadFile,
        onError: (error: AxiosError): void => {
            toast({
                status: AlertStatusEnumType.ERROR,
                title: t("error"),
                description: errorAlert(error).message
            });
        },
        onSuccess: (data: AxiosResponse<any>): void => {
            const {blob, name} = data.data;

            const url: string = window.URL.createObjectURL(new Blob([blob]));

            const link: HTMLAnchorElement = document.createElement("a");
            link.href = url;
            link.setAttribute("download", name);

            document.body.appendChild(link);

            link.click();
            link.parentNode?.removeChild(link);

            toast({
                title: t("download"),
                description: `${t("file_downloaded", {type: downloadFileResponse.variables?.type})}`
            });
        }
    });

    const handleDownload = (type: FileType): void => {
        downloadFileResponse.mutate({baseUrl, type});
    }

    const isDownloadFilePending: boolean = downloadFileResponse.isPending;

    return {handleDownload, isDownloadFilePending};
};

export default useDownloadFileHook;