import React, { ReactElement, FC } from "react";
import {Text} from "@chakra-ui/react";
import {FiTrash2} from "react-icons/fi";

const DeleteIconButton: FC<DeleteIconButtonProps> = ({state, showDeleteModal}): ReactElement => {
    const handleDelete = (): void => {
        if(state) showDeleteModal(state);
        else showDeleteModal();
    }

   return (
       <Text cursor={"pointer"} color={"red.500"} _hover={{color: "red.700"}} onClick={handleDelete}>
           <FiTrash2 />
       </Text>
    );
};

interface DeleteIconButtonProps {
    showDeleteModal: (a?: any) => void;
    state: any;
}

export default DeleteIconButton;