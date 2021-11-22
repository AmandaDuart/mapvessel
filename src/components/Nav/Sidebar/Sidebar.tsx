import { Flex, Image, Circle, Divider, Icon, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { RiDashboardLine, RiEqualizerLine, RiStackLine, RiQuestionnaireLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import Logo from 'assets/images/Logo.png';
import { Colors } from 'utils/global';
import './Sidebar.scss';

type NavigationItem = {
    icon: IconType;
    name: string;
    to: string;
};

const navigation = [
    { icon: RiDashboardLine, name: 'Dash', to: './dashboard' },
    { icon: RiEqualizerLine, name: 'Training', to: './training' },
    { icon: RiStackLine, name: 'Models', to: './models' },
    { icon: RiQuestionnaireLine, name: 'Support', to: './support' },
].filter(Boolean) as NavigationItem[];

const Sidebar = () => {
    return (
        <Flex
            direction="column"
            h="calc(100vh - 50px)"
            width="80px"
            ms="20px"
            my="30px"
            bgColor={Colors.bgColor}
            borderRadius="100px"
            alignItems="center"
        >
            <Circle bg={Colors.blackGradient} w="80px" h="80px" position="absolute">
                <Image src={Logo} boxSize="60px" />
            </Circle>
            <Flex
                flex="1"
                alignItems="center"
                justifyContent="center"
                direction="column"
                color={Colors.grey}
                paddingBottom="25px"
                paddingTop="90px"
            >
                {navigation.map((item) => (
                    <NavLink
                        to={item.to}
                        key={item.to}
                        className="nav-link"
                        activeClassName="active"
                    >
                        <Flex direction="column" alignItems="center">
                            <Box className="nav-link_icon" p={2} mb={2}>
                                <Icon as={item.icon} boxSize="24px" />
                            </Box>
                            <Text fontSize="14px">{item.name}</Text>
                            <Divider my={4} w="50%" />
                        </Flex>
                    </NavLink>
                ))}
            </Flex>
        </Flex>
    );
};

export default Sidebar;
