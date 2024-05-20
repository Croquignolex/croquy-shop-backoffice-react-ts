import React, { ReactElement, FC } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {FiEdit, FiTrash, FiUnlock, FiLock} from "react-icons/fi";
import {Link} from "react-router-dom";

const TripleActionButton: FC<TripleActionButtonProps> = (
    {
        state,
        showDeleteModal,
        edithPath,
        showToggleModal,
        isListView = false,
        isDisabled = false,
        showStatus = false
    }): ReactElement => {
   const handleDelete = (): void => {
       if(isListView) showDeleteModal(state);
       else showDeleteModal();
   }

   return (
        <ButtonGroup>
            <Button
                fontWeight="none"
                colorScheme={"yellow"}
                leftIcon={<FiEdit />}
                size={"sm"}
                as={Link}
                state={state}
                isDisabled={isDisabled}
                to={edithPath}
            >
                Modifier
            </Button>
            <Button
                fontWeight="none"
                colorScheme={"red"}
                size={"sm"}
                isDisabled={isDisabled}
                leftIcon={<FiTrash />}
                onClick={handleDelete}
            >
                Supprimer
            </Button>
            {showStatus && (
                <Button
                    fontWeight="none"
                    colorScheme={state.enabled ? "orange" : "green"}
                    size={"sm"}
                    isDisabled={isDisabled}
                    leftIcon={state.enabled ? <FiLock /> : <FiUnlock />}
                    onClick={showToggleModal}
                >
                    {state.enabled ? "Désactiver" : "Activer"}
                </Button>
            )}
        </ButtonGroup>
    );
};

interface TripleActionButtonProps {
    edithPath: string;
    state: any;
    showDeleteModal: (a?: any) => void;
    showToggleModal?: () => void;
    isListView?: boolean;
    showStatus?: boolean;
    isDisabled?: boolean;
}

export default TripleActionButton;