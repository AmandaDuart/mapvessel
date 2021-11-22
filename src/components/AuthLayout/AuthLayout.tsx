import {
    Grid,
    GridItem,
    Image,
    Flex,
    Box,
    Heading,
    Text,
    Link,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { RiArrowLeftLine, RiCopyrightLine, RiArrowDownSFill, RiGlobalLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

import graphic1 from 'assets/images/graphic1.svg';
import graphic2 from 'assets/images/graphic2.svg';
import Logo from 'assets/images/Logo.png';
import DefButton from 'components/DefButton';
import { Colors } from 'utils/global';

type LayoutProps = {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
    const location = useLocation();

    return (
        <>
            <Grid minH="100vh" templateColumns="repeat(10, 1fr)">
                <GridItem colSpan={3} p={5} bgColor={Colors.bgColor2}>
                    <Image src={graphic1} float="right" position="relative" />
                    <Flex ps={3} direction="column" alignItems="flex-start">
                        <Image
                            mb={6}
                            className="logoimg"
                            src={Logo}
                            alt="Hercules logo"
                            h="100px"
                        />
                        <Box mt={6}>
                            <Heading as="h2" fontSize="38px" lineHeight="46px">
                                Advanced Situational Awareness (ASAS)
                            </Heading>
                            <Text mt={4} fontSize="16px" lineHeight="30px">
                                State-of-the-art deep learning training and inference platform for
                                vision and other AI applications. Flexible AI pipeline with modular
                                components.
                            </Text>
                        </Box>
                    </Flex>
                    <Image src={graphic2} position="absolute" bottom={5} />
                </GridItem>
                <GridItem colSpan={7}>
                    <Flex
                        p={5}
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        flex={1}
                        h="100%"
                    >
                        <Flex w="100%" justifyContent="space-between">
                            <Link
                                display="flex"
                                alignItems="center"
                                fontWeight="600"
                                fontSize="14px"
                            >
                                <Icon as={RiArrowLeftLine} boxSize="20px" me={3} /> Return to
                                website
                            </Link>
                            <Link display="flex" fontSize="14px" gap={2} alignItems="center">
                                {location.pathname.includes('register') ? (
                                    <>
                                        <Text me={3}>Already have an account?</Text>
                                        <DefButton
                                            variant="outline"
                                            title="Login"
                                            size="sm"
                                            onClick={() => {
                                                window.location.pathname = '/auth/login';
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Text me={3}>Don&lsquo;t have an account?</Text>
                                        <DefButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                window.location.pathname = '/auth/register';
                                            }}
                                            title="Register"
                                        />
                                    </>
                                )}
                            </Link>
                        </Flex>
                        <Flex w="100%" alignItems="center" justifyContent="center">
                            <Box bgColor="#222222" px={8} py={5} borderRadius="12px">
                                {children}
                            </Box>
                        </Flex>
                        <Flex
                            w="100%"
                            justifyContent="space-between"
                            alignItems="center"
                            fontSize="14px"
                            color={Colors.grey}
                        >
                            <Text display="flex" alignItems="center">
                                <Icon as={RiCopyrightLine} />
                                2021 by&nbsp;<Link color={Colors.orange}> Hercules</Link>
                            </Text>
                            <Flex flex="0.5" justifyContent="space-between" alignItems="center">
                                <Link>Contact</Link>
                                <Link>Terms of Service</Link>
                                <Link>Privacy Policy</Link>
                            </Flex>
                            <Flex alignSelf="flex-end">
                                <Menu>
                                    <MenuButton
                                        px={4}
                                        py={2}
                                        transition="all 0.2s"
                                        borderRadius="md"
                                        _hover={{ bg: Colors.bgColor2 }}
                                        _expanded={{ bg: Colors.bgColor2 }}
                                        _focus={{ boxShadow: 'outline' }}
                                    >
                                        <Icon as={RiGlobalLine} me={2} />
                                        Language
                                        <Icon as={RiArrowDownSFill} ms={1} />
                                    </MenuButton>
                                    <MenuList bgColor={Colors.bgColor2} border="none">
                                        <MenuItem>English (US)</MenuItem>
                                        <MenuItem>Portuguese (BR)</MenuItem>
                                        <MenuItem>Chinese</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
        </>
    );
};

export default AuthLayout;
