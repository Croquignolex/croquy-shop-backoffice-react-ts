import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/PageHeader";
import {groupsApiURI} from "../../constants/apiURIConstants";
import GroupsTableList from "../../components/tableList/groups/GroupsTableList";

const GroupsPage = (): ReactElement => {
    return (
        <>
            {/*<PageHeader title={mainRoutes.groups.title} icon={mainRoutes.groups.icon} />*/}
            <GroupsTableList
                fetchGroups
                showCreator
                groupsBaseUrl={groupsApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addGroup.path}
                >
                    Nouveau groupe
                </Button>
            </GroupsTableList>
        </>
    );
};

export default GroupsPage;