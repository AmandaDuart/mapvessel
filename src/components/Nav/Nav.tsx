import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Stack,
    Image,
    Drawer,
    useDisclosure,
    IconButton,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    Text,
    Button,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from 'assets/images/Logo.png';
import { Colors } from 'utils/global';
import './Nav.scss';
import { useAuth } from 'hooks/AuthContext';

type NavigationItem = {
    name: string;
    to: string;
};

const navigation = [
    { name: 'Dashboard', to: './dashboard' },
    { name: 'Training', to: './training' },
    { name: 'Models', to: './models' },
    { name: 'Support', to: './support' },
].filter(Boolean) as NavigationItem[];

const Nav = () => {
    const { isOpen, onToggle } = useDisclosure();
    const location = useLocation();

    return (
        <Box w={'100%'} py={5} px={{ base: 5, md: 10 }}>
            <Flex align="center" direction={{ base: 'row-reverse', md: 'row' }}>
                <Stack flex={1} align="flex-start" display={{ base: 'none', md: 'flex' }}>
                    <Image className="logoimg" src={Logo} alt="logo img" boxSize="50px" />
                </Stack>

                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    align="center"
                    display={{ base: 'flex', md: 'none' }}
                    borderBottom="1px"
                    borderBottomColor={Colors.orange}
                    pb={1}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={8} h={8} />}
                        variant={'ghost'}
                        color={Colors.orange}
                        aria-label={'Toggle Navigation'}
                        className="drawer-button"
                    />
                    <Text ms={2} textTransform="capitalize" color={Colors.orange}>
                        {location.pathname.slice(1)}
                    </Text>
                </Flex>

                <Box display={{ base: 'none', md: 'flex' }}>
                    <DesktopNav />
                </Box>
            </Flex>
            <Drawer isOpen={isOpen} colorScheme="orange" placement="left" onClose={onToggle}>
                <DrawerOverlay display={{ md: 'none' }} />
                <DrawerContent display={{ md: 'none' }}>
                    <DrawerCloseButton className="drawer-button" color={Colors.orange} />
                    <DrawerBody bg={Colors.bgColor2} align="center" h={'100%'}>
                        <Flex align="center" direction="column">
                            <Image className="logoimg" src={Logo} alt="logo img" boxSize="75px" />
                            <Text mt={3} color={Colors.orange}>
                                AI Training Platform
                            </Text>
                        </Flex>
                        <MobileNav />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

const MobileNav = () => {
    const {token} = useAuth();
    return (
        <Stack p={4} mt={5}>
            {navigation.map((item) => {
                return (
                    <Flex
                        spacing={5}
                        pt={3}
                        justify={'space-between'}
                        align={'center'}
                        className="m-nav-link"
                        key={item.name}
                    >
                        <NavLink to={item.to} activeClassName="active">
                            {item.name}
                            <ChevronRightIcon />
                        </NavLink>
                    </Flex>
                );
            })}
            <Flex pt={10} justify={'space-between'} align={'center'} className="m-nav-link">
                <NavLink to="/auth/login">
                    { token ? 'Log out' : 'Log in'}
                </NavLink>
            </Flex>
        </Stack>
    );
};

const DesktopNav = () => {
    const {token} = useAuth();
    return (
        <Flex align="center">
            <Stack flex={1} justify={'flex-end'} align={'center'} direction={'row'}>
                {navigation.map((item) => {
                    return (
                        <NavLink
                            to={item.to}
                            key={item.name}
                            className="nav-link"
                            activeClassName="active"
                        >
                            {item.name}
                        </NavLink>
                    );
                })}
                <NavLink to="/auth/login">
                    <Button className="btn-logout" variant="ghost" size="sm">
                        { token ? 'Log out' : 'Log in'}
                    </Button>
                </NavLink>
            </Stack>
        </Flex>
    );
};

export default Nav;
