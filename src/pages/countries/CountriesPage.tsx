import React, {ReactElement} from "react";
import {TableContainer, Table, Thead, Tr, Th, Tbody, Td, Stack, Badge} from "@chakra-ui/react";

import useCountriesHook from "./useCountriesHook";
import {CountriesHookType} from "./countriesData";
import ListHeader from "../../components/ListHeader";
import EmptyTableAlert from "../../components/EmptyTableAlert";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import ConfirmAlertDialog from "../../components/ConfirmAlertDialog";
import {stringDateFormat} from "../../helpers/generalHelpers";
import DisplayAlert from "../../components/DisplayAlert";
import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import ExternalLink from "../../components/ExternalLink";
import TableSkeletonLoader from "../../components/TableSkeletonLoader";
import DoubleActionButton from "../../components/form/DoubleActionButton";
import {CountryType} from "./show/showCountryData";
import RowImage from "../../components/RowImage";

const CountriesPage = (): ReactElement => {
    const {
        countriesResponseData, isCountriesPending, countriesAlertData, fetchPaginatedCountries, fetchPaginatedNeedleCountries, onDeleteModalClose,
        selectedCountry, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,  handleDeleteCountry,
    }: CountriesHookType = useCountriesHook();

    return (
        <>
            <PageHeader title={"Pays"} />
            <Stack>
                <DisplayAlert data={countriesAlertData} />
                <ListHeader
                    label={"Nouveau pays"}
                    addItemPath={mainRoutes.addCountry.path}
                    handleSearch={(needle: string) => fetchPaginatedNeedleCountries(needle)}
                />
                <TableContainer boxShadow="md" borderRadius="md">
                    <Table size={"sm"}>
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Drapeau</Th>
                                <Th>Nom</Th>
                                <Th>Indice</Th>
                                <Th>Statut</Th>
                                <Th>Créer le</Th>
                                <Th>Créer par</Th>
                                <Th textAlign={'right'}>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isCountriesPending ? <TableSkeletonLoader /> : (
                                countriesResponseData.empty ? <EmptyTableAlert /> : (
                                    countriesResponseData.content.map((country: CountryType, index: number) => (
                                        <Tr key={index}>
                                            <Td><RowImage image={country.flag} /></Td>
                                            <Td>
                                                <ExternalLink
                                                    state={country}
                                                    label={country.name}
                                                    path={`${mainRoutes.countries.path}/${country.id}`}
                                                />
                                            </Td>
                                            <Td>{country.phoneCode}</Td>
                                            <Td><StatusBadge enabled={country.enabled}/></Td>
                                            <Td><Badge rounded="md">{stringDateFormat(country.createdAt)}</Badge></Td>
                                            <Td>
                                                <ExternalLink
                                                    state={country.creator}
                                                    label={country.creator?.username}
                                                    path={`${mainRoutes.users.path}/${country.creator?.id}`}
                                                />
                                            </Td>
                                            <Td textAlign={'right'}>
                                                <DoubleActionButton
                                                    isListView
                                                    state={country}
                                                    showDeleteModal={showDeleteModal}
                                                    edithPath={`${mainRoutes.countries.path}/${country.id}/edit`}
                                                />
                                            </Td>
                                        </Tr>
                                    ))
                                )
                            )}
                        </Tbody>
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>Drapeau</Th>
                                <Th>Nom</Th>
                                <Th>Indice</Th>
                                <Th>Statut</Th>
                                <Th>Créer le</Th>
                                <Th>Créer par</Th>
                                <Th textAlign={'right'}>Actions</Th>
                            </Tr>
                        </Thead>
                    </Table>
                </TableContainer>
                <Pagination
                    show={!countriesResponseData.empty}
                    handleNextPage={() => fetchPaginatedCountries(true)}
                    handlePreviousPage={() => fetchPaginatedCountries(false)}
                    currentPage={countriesResponseData.number + 1}
                    pages={countriesResponseData.totalPages}
                    totalElements={countriesResponseData.totalElements}
                    currentPageElements={countriesResponseData.numberOfElements}
                />
                <ConfirmAlertDialog
                    handleConfirm={handleDeleteCountry}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                    isLoading={isDeleteCountryPending}
                    alertData={deleteCountryAlertData}
                >
                    Supprimer le pays <strong>{selectedCountry.name}</strong>?
                </ConfirmAlertDialog>
            </Stack>
        </>
    );
};

export default CountriesPage;