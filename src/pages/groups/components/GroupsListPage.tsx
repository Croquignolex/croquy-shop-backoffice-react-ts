import React, {ReactElement} from "react";

import {ecommerceSubMenu, mainRoutes} from "../../../routes/mainRoutes";
import PageHeader from "../../../components/PageHeader";
import {groupsApiURI} from "../../../constants/apiURIConstants";
import GroupsTableList from "./GroupsTableList";

const GroupsListPage = (): ReactElement => {
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {label: ecommerceSubMenu.subMenuLabel},
                    {label: mainRoutes.groups.title},
                ]}
            />

            <GroupsTableList
                fetchGroups
                showCreator
                groupsBaseUrl={groupsApiURI.index}
            />
        </>
    );
};

export default GroupsListPage;