import React, { ReactElement, FC } from "react";
import {Button, Icon} from "@chakra-ui/react";
import {IconTablePlus} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";

const AddButton: FC<EditIconButtonProps> = ({onAddDrawerOpen, title}): ReactElement => {
    const {t} = useTranslation();

   return (
       <Button
           px={{base: 4, sm: 6}}
           onClick={onAddDrawerOpen}
       >
           <Icon as={IconTablePlus} mr={2} fontSize={"lg"} />
           {title}
       </Button>
    );
};

interface EditIconButtonProps {
    onAddDrawerOpen: () => void;
    title: string;
}

export default AddButton;