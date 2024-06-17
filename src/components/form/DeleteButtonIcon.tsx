import React, { ReactElement, FC } from "react";
import {Text} from "@chakra-ui/react";
import {FiTrash2} from "react-icons/fi";

const DeleteIconButton: FC<DeleteIconButtonProps> = ({showDeleteModal}): ReactElement => {
   return (
       <Text cursor={"pointer"} color={"red.500"} _hover={{color: "red.700"}} onClick={showDeleteModal}>
           <FiTrash2 />
       </Text>
    );
};

interface DeleteIconButtonProps {
    showDeleteModal: () => void;
}

export default DeleteIconButton;