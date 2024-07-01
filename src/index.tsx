import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {Dict} from "@chakra-ui/utils";
import {ToastProviderProps} from "@chakra-ui/toast";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

import "./assets/css/main.css";
import "./i18n/config.ts";

import App from "./App";
import {AlertStatusEnumType} from "./helpers/globalTypesHelper";
import ToastAlert from "./components/alert/ToastAlert";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchOnWindowFocus: false,
        },
    },
});

const toastOptions: ToastProviderProps = {
    defaultOptions: {
        position: "top-right",
        isClosable: true,
        status: AlertStatusEnumType.INFO,
        render: ToastAlert
    }
}

const theme: Dict = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#f8f7fa",
                color: "gray.600",
            },
            thead: {
                h: "6vh",
                bg: "gray.50",
            },
            hr: {
                borderColor: "#CBD5E0"
            }
        },
    },
    fonts: {
        heading: `"Public Sans", sans-serif`,
        body: `"Public Sans", sans-serif`,
    },
    shadows: {
        default: '0 .25rem 1.125rem rgba(75, 70, 92, .1)',
    },
    components: {
        FormLabel: {
            baseStyle: {
                fontWeight: "normal",
                fontSize: "sm"
            }
        },
        Button: {
            baseStyle: {
                fontWeight: "none",
            },
            defaultProps: {
                colorScheme: "purple",
                // variant: "outline",
            },
        },
        Badge: {
            baseStyle: {
                rounded: "md",
                px: 3,
                textTransform: "capitalize",
                fontWeight: "none",
            }
        },
        Heading: {
            baseStyle: {
                color: "purple.500",
            },
        },
        Divider: {
            baseStyle: {
                borderColor: "gray.300",
            },
        },
        Spinner:  {
            baseStyle: {
                color: "purple.500",
            },
        },
    },
});

root.render(
    // <React.StrictMode>
        <ChakraProvider theme={theme} toastOptions={toastOptions}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ChakraProvider>
   // </React.StrictMode>
);


