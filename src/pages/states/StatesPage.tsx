import React, {ReactElement} from "react";
import {FiPlusSquare} from "react-icons/fi";
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";
import StatesTableList from "../../components/tableList/states/StatesTableList";
import {statesApiURI} from "../../constants/apiURIConstants";

const StatesPage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={mainRoutes.states.title} icon={mainRoutes.states.icon} />*/}
            <StatesTableList
                fetchStates
                showCountry
                showCreator
                statesBaseUrl={statesApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addState.path}
                >
                    Nouvelle ville
                </Button>
            </StatesTableList>
        </>
    );
};

export default StatesPage;