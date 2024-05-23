import React, {ReactElement} from "react";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {FiPlusSquare} from "react-icons/fi";

import {mainRoutes} from "../../routes/mainRoutes";
import PageHeader from "../../components/menu/PageHeader";
import {categoriesApiURI} from "../../constants/apiURIConstants";
import CategoriesTableList from "../../components/tableList/categories/CategoriesTableList";

const CategoriesPage = (): ReactElement => {
    return (
        <>
            <PageHeader title={mainRoutes.categories.title} icon={mainRoutes.categories.icon} />
            <CategoriesTableList
                fetchCategories
                showGroup
                showCreator
                categoriesBaseUrl={categoriesApiURI.index}
            >
                <Button
                    colorScheme='green'
                    fontWeight="none"
                    size={"sm"}
                    leftIcon={<FiPlusSquare />}
                    as={Link}
                    to={mainRoutes.addCategory.path}
                >
                    Nouvelle catégorie
                </Button>
            </CategoriesTableList>
        </>
    );
};

export default CategoriesPage;