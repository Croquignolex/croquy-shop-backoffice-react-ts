import React, {ReactElement} from "react";

import {mainRoutes, administrationSubMenu} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {usersApiURI} from "../../../constants/apiURIConstants";
import UsersTableList from "./UsersTableList";

const UsersListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: administrationSubMenu.subMenuLabel},
                    {label: mainRoutes.users.title},
                ]}
            />

            <UsersTableList
                fetchUsers
                showCreator
                usersBaseUrl={usersApiURI.index}
            />
        </>
    );
};

export default UsersListPage;