import {useEffect, useMemo} from "react";
import { useTranslation } from "react-i18next";
import {useLocation} from "react-router-dom";
import lodash from "lodash";

import {mainRoutes} from "../routes/mainRoutes";
import {authRoutes} from "../routes/authRoutes";
import {errorRoutes} from "../routes/errorRoutes";

const useLocalizeDocumentAttributes = (): void => {
    const {t, i18n} = useTranslation();
    const {pathname} = useLocation();
    
    const allRoutes: Array<any> = useMemo(() => [
        ...lodash.toArray(mainRoutes),
        ...lodash.toArray(authRoutes),
        ...lodash.toArray(errorRoutes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], []);

    useEffect((): void => {
        let title: string;
 
        const needleRoute: any = allRoutes.find((route: any): boolean => route?.path === pathname);
        if(needleRoute) {
            if(needleRoute?.title) title = needleRoute?.title;
            else title = extractFirstSegmentTitle();
        } else { 
            title = extractFirstSegmentTitle();
        }

        if (i18n.resolvedLanguage) {
            document.documentElement.lang = i18n.resolvedLanguage;
            document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);
        }

        document.title = `${t("app")} - ${t(title)}`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.resolvedLanguage, pathname]);
    
    const extractFirstSegmentTitle = () => {
        const segment: string[] = pathname.split('/');
        const needleRoute: any = allRoutes.find((route: any): boolean => route?.path === `/${segment[1]}`);
        return needleRoute?.title;
    }
}

export default useLocalizeDocumentAttributes;