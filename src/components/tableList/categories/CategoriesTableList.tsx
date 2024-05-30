import React, {FC, ReactElement, ReactNode} from "react";
import {Link} from "react-router-dom";
import {Badge, Box, HStack, Spacer, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

import EmptyTableAlert from "../../alert/EmptyTableAlert";
import StatusBadge from "../../StatusBadge";
import Pagination from "../../Pagination";
import ConfirmAlertDialog from "../../ConfirmAlertDialog";
import {stringDateFormat} from "../../../helpers/generalHelpers";
import {mainRoutes} from "../../../routes/mainRoutes";
import TableSkeletonLoader from "../../skeletonLoader/TableSkeletonLoader";
import DoubleActionButton from "../../form/DoubleActionButton";
import useCategoriesTableListHook from "./useCategoriesTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {CategoryType} from "../../../pages/categories/show/showCategoryData";
import {CategoriesTableListHookType} from "./categoriesTableListData";
import ImageDisplay from "../../ImageDisplay";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";

const CategoriesTableList: FC<CategoriesTableListProps> = ({showGroup = false, showCreator = false, fetchCategories = false, categoriesBaseUrl, children}): ReactElement => {
    const {
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
    }: CategoriesTableListHookType = useCategoriesTableListHook({fetchCategories, categoriesBaseUrl});

    return (
        <Stack>
            <CustomAlert data={categoriesAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleCategories(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Nom</Th>
                            <Th>Slug</Th>
                            <Th>Statut</Th>
                            {showGroup && <Th>Group</Th>}
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isCategoriesPending ? <TableSkeletonLoader /> : (
                            categoriesResponseData.empty ? <EmptyTableAlert /> : (
                                categoriesResponseData.content.map((category: CategoryType, index: number) => (
                                    <Tr key={index}>
                                        <Td><ImageDisplay image={category.logo} size={ImageSizeEnumType.ROW} /></Td>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.categories.path}/${category.id}`}
                                                className="link"
                                                state={category}
                                            >
                                                {category.name}
                                            </Link>
                                        </Td>
                                        <Td>{category.slug}</Td>
                                        <Td><StatusBadge enabled={category.enabled}/></Td>
                                        {showGroup && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.groups.path}/${category.group?.id}`}
                                                    className="link"
                                                    state={category.group}
                                                >
                                                    {category.group?.name}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td><Badge rounded="md">{stringDateFormat(category.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${category.creator?.id}`}
                                                    className="link"
                                                    state={category.creator}
                                                >
                                                    {category.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
                                        <Td textAlign={'right'}>
                                            <DoubleActionButton
                                                isListView
                                                state={category}
                                                showDeleteModal={showDeleteModal}
                                                edithPath={`${mainRoutes.categories.path}/${category.id}/edit`}
                                            />
                                        </Td>
                                    </Tr>
                                ))
                            )
                        )}
                    </Tbody>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Nom</Th>
                            <Th>Slug</Th>
                            <Th>Statut</Th>
                            {showGroup && <Th>Group</Th>}
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                </Table>
            </TableContainer>
            <Pagination
                show={!categoriesResponseData.empty}
                handleNextPage={() => fetchPaginatedCategories(true)}
                handlePreviousPage={() => fetchPaginatedCategories(false)}
                currentPage={categoriesResponseData.number + 1}
                pages={categoriesResponseData.totalPages}
                totalElements={categoriesResponseData.totalElements}
                currentPageElements={categoriesResponseData.numberOfElements}
            />
            <ConfirmAlertDialog
                handleConfirm={handleDeleteCategory}
                isOpen={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                isLoading={isDeleteCategoryPending}
                alertData={deleteCategoryAlertData}
            >
                Supprimer le categorye <strong>{selectedCategory.name}</strong>?
            </ConfirmAlertDialog>
        </Stack>
    );
};

interface CategoriesTableListProps {
    showCreator?: boolean;
    showGroup?: boolean;
    fetchCategories?: boolean;
    children: ReactNode;
    categoriesBaseUrl: string;
}

export default CategoriesTableList;