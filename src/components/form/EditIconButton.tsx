import React, { ReactElement, FC } from "react";
import {Text} from "@chakra-ui/react";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";

const EditIconButton: FC<EditIconButtonProps> = ({state, showEditDrawer}): ReactElement => {
    const handleEdit = (): void => {
        if(state) showEditDrawer(state)
        else showEditDrawer()
    }

   return (
       <Text as={Link} color={"purple.500"} _hover={{color: "purple.700"}} onClick={handleEdit}>
           <FiEdit />
       </Text>
    );
};

interface EditIconButtonProps {
    showEditDrawer: (a?: any) => void;
    state: any;
}

export default EditIconButton;