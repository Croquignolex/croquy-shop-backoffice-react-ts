import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useDisclosure, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {CategoryType, defaultSelectedCategory, destroyCategory} from "../../../pages/categories/show/showCategoryData";
import {
    CategoriesResponseDataType,
    CategoriesTableListHookProps,
    CategoriesTableListHookType,
    defaultCategoriesResponseData,
    DestroyCategoryRequestDataType,
    categoriesRequest,
} from "./categoriesTableListData";

const useCategoriesTableListHook = ({fetchCategories, categoriesBaseUrl}: CategoriesTableListHookProps): CategoriesTableListHookType => {
    const { onOpen: onDeleteModalOpen, isOpen: isDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const toast: CreateToastFnReturn = useToast();

    const [searchNeedle, setSearchNeedle] = useState<string>("");
    const [categoriesQueryEnabled, setCategoriesQueryEnabled] = useState<boolean>(fetchCategories);
    const [categoriesAlertData, setCategoriesAlertData] = useState<ErrorAlertType>({show: false});
    const [deleteCategoryAlertData, setDeleteCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>(defaultSelectedCategory);
    const [categoriesResponseData, setCategoriesResponseData] = useState<CategoriesResponseDataType>(defaultCategoriesResponseData);

    const categoriesResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["categories"],
        queryFn: () => categoriesRequest(categoriesResponseData.number, categoriesResponseData.size, searchNeedle, categoriesBaseUrl),
        enabled: categoriesQueryEnabled,
    });

    const destroyCategoryCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, DestroyCategoryRequestDataType, any> = useMutation({
        mutationFn: destroyCategory,
        onError: (error: AxiosError): void => {
            setDeleteCategoryAlertData(errorAlert(error));
            setCategoriesQueryEnabled(false);

            log("Destroy category failure", destroyCategoryCategoryResponse);
        },
        onSuccess: (): void => {
            setDeleteCategoryAlertData({show: false});
            setCategoriesQueryEnabled(true);

            const toastMessage: string = `Categorie ${selectedCategory.name} supprimée avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            onDeleteModalClose();

            log("Destroy category successful", destroyCategoryCategoryResponse);
        }
    });

    if(categoriesQueryEnabled && categoriesResponse.isError) {
        setCategoriesQueryEnabled(false);
        setCategoriesAlertData(errorAlert(categoriesResponse.error));

        log("Categories list failure", categoriesResponse);
    }

    if(categoriesQueryEnabled && categoriesResponse.isSuccess && !categoriesResponse.isFetching) {
        setCategoriesQueryEnabled(false);
        setCategoriesAlertData({show: false});

        setCategoriesResponseData(categoriesResponse.data.data);

        log("Categories list successful", categoriesResponse);
    }

    const isCategoriesPending: boolean = categoriesResponse.isFetching;
    const isDeleteCategoryPending: boolean = destroyCategoryCategoryResponse.isPending;

    const handleDeleteCategory = (): void => {
        setDeleteCategoryAlertData({show: false});

        destroyCategoryCategoryResponse.mutate({id: selectedCategory.id});
    }

    const showDeleteModal = (category: CategoryType): void => {
        onDeleteModalOpen();
        setSelectedCategory(category);
        setDeleteCategoryAlertData({show: false});
    }

    const fetchPaginatedCategories = (next: boolean): void => {
        if(next && !categoriesResponseData.last) setCategoriesResponseData({...categoriesResponseData, number: categoriesResponseData.number + 1});
        else if(!next && !categoriesResponseData.first) setCategoriesResponseData({...categoriesResponseData, number: categoriesResponseData.number - 1})

        setCategoriesQueryEnabled(true);

        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const fetchPaginatedNeedleCategories = (needle: string): void => {
        setSearchNeedle(needle);
        setCategoriesResponseData({...categoriesResponseData, number: 0});

        setCategoriesQueryEnabled(true);
    }

    return {
        categoriesResponseData,
        isCategoriesPending,
        categoriesAlertData,
        fetchPaginatedCategories,
        fetchPaginatedNeedleCategories,
        onDeleteModalClose,
        selectedCategory,
        showDeleteModal,
        isDeleteModalOpen,
        deleteCategoryAlertData,
        isDeleteCategoryPending,
        handleDeleteCategory,
    };
};

export default useCategoriesTableListHook;