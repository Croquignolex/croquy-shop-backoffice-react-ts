import React, {ReactElement} from "react";
import {Box, Stack, HStack, List, ListItem, ListIcon} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

import useShowShopHook from "./useShowShopHook";
import DeleteAlertDialog from "../../../components/DeleteAlertDialog";
import Loader from "../../../components/Loader";
import DisplayAlert from "../../../components/DisplayAlert";
import PageHeader from "../../../components/menu/PageHeader";
import {ShowShopHookType} from "./showShopData";
import {mainRoutes} from "../../../routes/mainRoutes";

const ShopsPage = (): ReactElement => {
    const {
        isShopsPending, onDeleteModalClose, showDeleteModal, isDeleteModalOpen, deleteShopAlertData, isDeleteShopPending,
        handleDeleteShop, shopAlertData, shopResponseData
    }: ShowShopHookType = useShowShopHook();

    return (
        <>
            <PageHeader
                title={`Détail boutique ${shopResponseData.name}`}
                items={[{path: mainRoutes.shops.path, label: 'Boutiques'}]}
            />
            <HStack spacing={2}>
                <Box p={4} borderWidth='1px' borderRadius='3xl'>
                    <List spacing={3}>
                        <ListItem>
                            <ListIcon as={FiCheck} color='green.500' />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FiCheck} color='green.500' />
                            Assumenda, quia temporibus eveniet a libero incidunt suscipit
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FiCheck} color='green.500' />
                            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                        </ListItem>
                        <ListItem>
                            <ListIcon as={FiCheck} color='green.500' />
                            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                        </ListItem>
                    </List>
                </Box>
                <Box p={4} borderWidth='1px' borderRadius='3xl'>

                </Box>
            </HStack>

            <Stack>
                <Loader isLoading={isShopsPending} />
                <DisplayAlert data={shopAlertData} />


                <DeleteAlertDialog
                    handleDelete={handleDeleteShop}
                    isOpen={isDeleteModalOpen}
                    onClose={onDeleteModalClose}
                    isLoading={isDeleteShopPending}
                    deleteAlertData={deleteShopAlertData}
                >
                    Supprimer la boutique <strong>{shopResponseData.name}</strong>?
                </DeleteAlertDialog>
            </Stack>
        </>
    );
};

export default ShopsPage;