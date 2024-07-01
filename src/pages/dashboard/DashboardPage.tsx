import React, { ReactElement } from "react";
import {Box, Flex} from "@chakra-ui/react";

const DashboardPage = (): ReactElement => {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                mx={{
                    lg: 8,
                }}
                display={{
                    lg: "flex",
                }}
                maxW={{
                    lg: "5xl",
                }}
                shadow={{
                    lg: "lg",
                }}
                rounded={{
                    lg: "lg",
                }}
            >
                <Box
                    w={{
                        lg: "50%",
                    }}
                >
                    <Box
                        h={{
                            base: 64,
                            lg: "full",
                        }}
                        rounded={{
                            lg: "lg",
                        }}
                        bgSize="cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
                        }}
                    ></Box>
                </Box>

                <Box
                    py={12}
                    px={6}
                    maxW={{
                        base: "xl",
                        lg: "5xl",
                    }}
                    w={{
                        lg: "50%",
                    }}
                >
                    <Box
                        as={"h2"}
                        fontSize={{
                            base: "2xl",
                            md: "3xl",
                        }}
                        color="gray.800"
                        _dark={{
                            color: "white",
                        }}
                        fontWeight="bold"
                    >
                        Build Your New{" "}
                        <Box
                            as={"span"}
                            color="brand.600"
                            _dark={{
                                color: "brand.400",
                            }}
                        >
                            Idea
                        </Box>
                    </Box>
                    <Box
                        as={"p"}
                        mt={4}
                        color="gray.600"
                        _dark={{
                            color: "gray.400",
                        }}
                    >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi
                        reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim
                        expedita aperiam mollitia iure consectetur dicta tenetur, porro
                        consequuntur saepe accusantium consequatur.
                    </Box>

                    <Box mt={8}>
                        <Box
                            bg="gray.900"
                            color="gray.100"
                            px={5}
                            py={3}
                            fontWeight="semibold"
                            rounded="lg"
                            _hover={{
                                bg: "gray.800",
                            }}
                        >
                            Start Now
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

export default DashboardPage;