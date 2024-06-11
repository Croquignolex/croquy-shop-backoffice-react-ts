import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";
import {usersApiURI} from "../../constants/apiURIConstants";
import UsersTableList from "../../components/tableList/users/UsersTableList";

const UsersPage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={mainRoutes.users.title} icon={mainRoutes.users.icon} />*/}
            <UsersTableList
                fetchUsers
                showCreator
                usersBaseUrl={usersApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addUser.path}
                >
                    Nouvelle user
                </Button>
            </UsersTableList>
        </>
    );
};

export default UsersPage;