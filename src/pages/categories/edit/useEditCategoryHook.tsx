import {useState, useEffect} from "react";
import { AxiosError, AxiosResponse } from "axios";
import {Location, Params, NavigateFunction, useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {CreateToastFnReturn, useToast} from "@chakra-ui/react";

import {AlertStatusEnumType, ErrorAlertType} from "../../../helpers/globalTypesHelper";
import {errorAlert, log, toastAlert} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import {categoryRequest, CategoryType, defaultSelectedCategory} from "../show/showCategoryData";
// import {BreadcrumbItemsType} from "../../../components/PageHeader";
import {
    EditCategoryFormType,
    EditCategoryHookType,
    editCategoryInitialStaticValues,
    EditCategoryRequestDataType,
    updateCategoryRequest
} from "./editCategoryData"

const useEditCategoryHook = (): EditCategoryHookType => {
    let categoryAlertData: ErrorAlertType = {show: false};

    let { state }:Location  = useLocation();
    let { id }: Params = useParams();

    const toast: CreateToastFnReturn = useToast();
    const navigate: NavigateFunction = useNavigate();

    const category: CategoryType = state;

    const [editCategoryAlertData, setEditCategoryAlertData] = useState<ErrorAlertType>({show: false});
    const [categoryQueryEnabled, setCategoryQueryEnabled] = useState<boolean>(false);
    const [categoryResponseData, setCategoryResponseData] = useState<CategoryType>(defaultSelectedCategory);
    const [formCategory, setFormCategory] = useState<EditCategoryFormType>(editCategoryInitialStaticValues);

    useEffect((): void => {
        if(category) {
            setCategoryResponseData(category);
            setFormCategory({...category, groupId: category.group?.id || ""});
        } else {
            setCategoryQueryEnabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categoryResponse: UseQueryResult<AxiosResponse, AxiosError> = useQuery({
        queryKey: ["category"],
        queryFn: () => categoryRequest(id || ""),
        enabled: categoryQueryEnabled,
    });

    const updateCategoryResponse: UseMutationResult<AxiosResponse, AxiosError, EditCategoryRequestDataType, any> = useMutation({
        mutationFn: updateCategoryRequest,
        onError: (error: AxiosError): void => {
            setEditCategoryAlertData(errorAlert(error));

            log("Update category failure", updateCategoryResponse);
        },
        onSuccess: (data: AxiosResponse, variables: EditCategoryRequestDataType): void => {
            setEditCategoryAlertData({show: false});

            const toastMessage: string = `Categorie ${variables.name} mise à jour avec succès`;
            toastAlert(toast, toastMessage, AlertStatusEnumType.SUCCESS);

            navigate(`${mainRoutes.categories.path}/${categoryResponseData.id}`);

            log("Update category successful", updateCategoryResponse);
        }
    });

    if(categoryResponse.isError) {
        categoryAlertData = errorAlert(categoryResponse.error);

        log("Category show failure", categoryResponse);
    }

    if(categoryQueryEnabled && categoryResponse.isSuccess && !categoryResponse.isFetching) {
        const tempsCategory: CategoryType = categoryResponse.data.data;

        setCategoryResponseData(tempsCategory);
        setFormCategory({...tempsCategory, groupId: tempsCategory.group?.id || ""});
        setCategoryQueryEnabled(false);

        log("Categories list successful", categoryResponse);
    }

    const handleEditCategory = (values: EditCategoryFormType): void => {
        const {name, slug, seoTitle, groupId, seoDescription, description}: EditCategoryFormType = values;
        updateCategoryResponse.mutate({name, slug, groupId, seoTitle, seoDescription, description, id: categoryResponseData.id});
    }

    const isEditCategoryPending: boolean = updateCategoryResponse.isPending;
    const isCategoryPending: boolean = categoryResponse.isFetching;

    const pageHeaderItems: Array<any> = [{path: mainRoutes.categories.path, label: 'Categories'}];
    if(categoryResponseData.id) {
        pageHeaderItems.push({
            path: `${mainRoutes.categories.path}/${categoryResponseData.id}`,
            label: `Détail categorie ${categoryResponseData.name}`,
            state: categoryResponseData
        })
    }

    return {
        editCategoryAlertData,
        handleEditCategory,
        categoryResponseData,
        isCategoryPending,
        categoryAlertData,
        formCategory,
        pageHeaderItems,
        isEditCategoryPending
    };
};

export default useEditCategoryHook;