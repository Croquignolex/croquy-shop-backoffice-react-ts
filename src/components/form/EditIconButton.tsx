import React, { ReactElement, FC } from "react";
import {Text} from "@chakra-ui/react";
import {FiEdit} from "react-icons/fi";

const EditIconButton: FC<EditIconButtonProps> = ({showEditDrawer}): ReactElement => {
   return (
       <Text cursor={"pointer"} color={"purple.500"} _hover={{color: "purple.700"}} onClick={showEditDrawer}>
           <FiEdit />
       </Text>
    );
};

interface EditIconButtonProps {
    showEditDrawer: (a?: any) => void;
}

export default EditIconButton;