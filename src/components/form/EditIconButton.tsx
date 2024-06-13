import React, { ReactElement, FC } from "react";
import {Text} from "@chakra-ui/react";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";

const EditIconButton: FC<EditIconButtonProps> = ({state, url}): ReactElement => {
   return (
       <Text as={Link} color={"purple.500"} to={url} state={state} _hover={{color: "purple.700"}}>
           <FiEdit />
       </Text>
    );
};

interface EditIconButtonProps {
    url: string;
    state: any;
}

export default EditIconButton;