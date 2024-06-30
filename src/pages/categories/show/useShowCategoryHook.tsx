import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {NavigateFunction, Params, useNavigate, useParams} from "react-router-dom";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType, MediaType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
// import {DestroyCategoryRequestDataType} from "../../../components/tableList/categories/categoriesTableListData";
import {
    categoryRequest,
    CategoryType,
    defaultSelectedCategory,
    destroyCategory,
    ShowCategoryHookType,
    toggleCategory,
    ToggleCategoryRequestDataType
} from "./showCategoryData";

const useShowCategoryHook = (): ShowCategoryHookType => {
    let categoryAlertData: ErrorAlertType = {show: false};

    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { onOpen: onToggleModalOpen, isOpen: isToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const [categoryQueryEnabled, setCategoryQueryEnabled] = useState<boolean>(true);
    const [deleteCategoryAlertData, setDeleteCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [toggleCategoryAlertData, setToggleCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [categoryResponseData, setCategoryResponseData] = useState<CategoryType>(defaultSelectedCategory);

    const categoryResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["category"],
        queryFn: () => categoryRequest(id || ""),
        enabled: categoryQueryEnabled,
    });

    const destroyCategoryCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, any, any> = useMutation({
        mutationFn: destroyCategory,
        onError: (error: AxiosError): void => {
            setDeleteCategoryAlertData(errorAlert(error));

            log("Destroy category failure", destroyCategoryCategoryResponse);
        },
        onSuccess: (): void => {
            setDeleteCategoryAlertData({show: false});

            const toastMessage: string = `Catégorie ${categoryResponseData.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();
            navigate(`${mainRoutes.categories.path}`);

            log("Destroy category successful", destroyCategoryCategoryResponse);
        }
    });

    const toggleCategoryCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, ToggleCategoryRequestDataType, any> = useMutation({
        mutationFn: toggleCategory,
        onError: (error: AxiosError): void => {
            setToggleCategoryAlertData(errorAlert(error));

            log("Toggle category failure", toggleCategoryCategoryResponse);
        },
        onSuccess: (): void => {
            setToggleCategoryAlertData({show: false});

            const toastMessage: string = `Catégorie ${categoryResponseData.name} ${categoryResponseData.enabled ? "désactivée" : "activée"} avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onToggleModalClose();
            setCategoryResponseData({...categoryResponseData, enabled: !categoryResponseData.enabled});

            log("Toggle category successful", toggleCategoryCategoryResponse);
        }
    });

    if(categoryResponse.isError) {
        categoryAlertData = errorAlert(categoryResponse.error);

        log("Category show failure", categoryResponse);
    }

    if(categoryQueryEnabled && categoryResponse.isSuccess && !categoryResponse.isFetching) {
        setCategoryQueryEnabled(false);
        setCategoryResponseData(categoryResponse.data.data);

        log("Categories list successful", categoryResponse);
    }

    const isCategoryPending: boolean = categoryResponse.isFetching;
    const isDeleteCategoryPending: boolean = destroyCategoryCategoryResponse.isPending;
    const isToggleCategoryPending: boolean = toggleCategoryCategoryResponse.isPending;

    const handleDeleteCategory = (): void => {
        setDeleteCategoryAlertData({show: false});

        destroyCategoryCategoryResponse.mutate({id: categoryResponseData.id});
    }

    const showDeleteModal = (): void => {
        onDeleteModalOpen();
        setDeleteCategoryAlertData({show: false});
    }

    const handleToggleCategory = (): void => {
        setToggleCategoryAlertData({show: false});

        toggleCategoryCategoryResponse.mutate({id: categoryResponseData.id});
    }

    const showToggleModal = (): void => {
        onToggleModalOpen();
        setToggleCategoryAlertData({show: false});
    }

    const handleLogoUpdate = (logo: MediaType | null): void => {
        setCategoryResponseData({...categoryResponseData, logo});
    }

    const handleBannerUpdate = (banner: MediaType | null): void => {
        setCategoryResponseData({...categoryResponseData, banner});
    }

    return {
        isCategoryPending,
        onDeleteModalClose,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCategoryAlertData,
        isDeleteCategoryPending,
        handleDeleteCategory,
        categoryAlertData,
        categoryResponseData,
        handleToggleCategory,
        isToggleCategoryPending,
        toggleCategoryAlertData,
        isToggleModalOpen,
        onToggleModalClose,
        showToggleModal,
        handleLogoUpdate,
        handleBannerUpdate
    };
};

export default useShowCategoryHook;