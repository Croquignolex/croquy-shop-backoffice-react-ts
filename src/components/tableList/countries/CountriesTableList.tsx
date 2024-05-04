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
import useCountriesTableListHook from "./useCountriesTableListHook";
import CustomAlert from "../../alert/CustomAlert";
import SearchField from "../../form/SearchField";
import {CountryType} from "../../../pages/countries/show/showCountryData";
import ImageDisplay from "../../ImageDisplay";
import {ImageSizeEnumType} from "../../../helpers/globalTypesHelper";
import {CountriesTableListHookType} from "./countriesTableListData";

const CountriesTableList: FC<CountriesTableListProps> = ({showCreator = false, fetchCountries = false, countriesBaseUrl, children}): ReactElement => {
    const {
        countriesResponseData, isCountriesPending, countriesAlertData, fetchPaginatedCountries, fetchPaginatedNeedleCountries, onDeleteModalClose,
        selectedCountry, showDeleteModal, isDeleteModalOpen, deleteCountryAlertData, isDeleteCountryPending,  handleDeleteCountry,
    }: CountriesTableListHookType = useCountriesTableListHook({fetchCountries, countriesBaseUrl});

    return (
        <Stack>
            <CustomAlert data={countriesAlertData} />
            <HStack>
                {children}
                <Spacer />
                <Box w={{sm: "sm"}}>
                    <SearchField handleSearch={(needle: string) => fetchPaginatedNeedleCountries(needle)} />
                </Box>
            </HStack>
            <TableContainer boxShadow="xl" borderRadius="xl" borderWidth='1px' bg={"white"}>
                <Table size={"sm"}>
                    <Thead bg="gray.100">
                        <Tr>
                            <Th>Drapeau</Th>
                            <Th>Nom</Th>
                            <Th>Indice</Th>
                            <Th>Statut</Th>
                            <Th>Créer le</Th>
                            {showCreator && <Th>Créer par</Th>}
                            <Th textAlign={'right'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isCountriesPending ? <TableSkeletonLoader /> : (
                            countriesResponseData.empty ? <EmptyTableAlert /> : (
                                countriesResponseData.content.map((country: CountryType, index: number) => (
                                    <Tr key={index}>
                                        <Td><ImageDisplay image={country.flag} size={ImageSizeEnumType.row} /></Td>
                                        <Td>
                                            <Link
                                                to={`${mainRoutes.countries.path}/${country.id}`}
                                                className="link"
                                                state={country}
                                            >
                                                {country.name}
                                            </Link>
                                        </Td>
                                        <Td>{country.phoneCode}</Td>
                                        <Td><StatusBadge enabled={country.enabled}/></Td>
                                        <Td><Badge rounded="md">{stringDateFormat(country.createdAt)}</Badge></Td>
                                        {showCreator && (
                                            <Td>
                                                <Link
                                                    to={`${mainRoutes.users.path}/${country.creator?.id}`}
                                                    className="link"
                                                    state={country.creator}
                                                >
                                                    {country.creator?.username}
                                                </Link>
                                            </Td>
                                        )}
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
                            {showCreator && <Th>Créer par</Th>}
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
    );
};

interface CountriesTableListProps {
    showCreator?: boolean;
    fetchCountries?: boolean;
    children: ReactNode;
    countriesBaseUrl: string;
}

export default CountriesTableList;