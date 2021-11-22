import { Flex, Icon, Divider, List, ListItem, Text, Circle } from '@chakra-ui/react';
import {
    RiArrowDropDownFill,
    RiArrowDropUpFill,
    RiNotificationLine,
    RiSettings4Line,
    RiUser6Line,
} from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';

import Dropdown from 'components/Dropdown';
import { useAuth } from 'hooks/AuthContext';
import { Colors } from 'utils/global';

//import DashboardDropdown from './DashboardDropdown';

const Header = () => {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    let title = pathname.slice(1);

    if (pathname.includes('ticket') || pathname.includes('support')) title = 'Hercules Support';
    if (pathname.includes('settings')) title = 'Account Support';

    return (
        <>
            <Flex w="100%" justifyContent="space-between" color={Colors.grey} pb={2}>
                <svg
                    style={{ width: 0, height: 0, position: 'absolute' }}
                    aria-hidden="true"
                    focusable="false"
                >
                    <linearGradient id="orange-gradient" x1="1" y1="1">
                        <stop offset="0%" stopColor="#F14336" />
                        <stop offset="100%" stopColor="#F58808" />
                    </linearGradient>
                </svg>
                <Flex alignItems="center">
                    <Text
                        ms={2}
                        textTransform="capitalize"
                        color="#E4E4E4"
                        fontSize="16px"
                        fontWeight="bold"
                    >
                        {title}
                    </Text>
                    {/* {pathname != '/dashboard' && (
                    )} */}
                    {/* {pathname == '/dashboard' && <DashboardDropdown />} */}
                </Flex>
                <Flex alignItems="center">
                    <Flex h="24px">
                        <Icon h="24px" w="24px" as={RiNotificationLine} me={2} />
                        <Circle
                            boxSize="6px"
                            position="relative"
                            right="16.5px"
                            top="3px"
                            alignSelf="flex-start"
                            bg={Colors.orangeGradient}
                        />
                    </Flex>
                    <Icon h="24px" w="24px" as={RiSettings4Line} me={2} />
                    <Dropdown
                        w="150px"
                        dropdownText={user ? user.username : 'Angshu Pradhan'}
                        leftIcon={
                            <Circle bgColor={Colors.bgColor2} p={2} boxSize="32px">
                                <Icon as={RiUser6Line} boxSize="18px" />
                            </Circle>
                        }
                        rightIcon={<Icon as={RiArrowDropDownFill} w="24px" h="24px" />}
                        rightExpandedIcon={<Icon as={RiArrowDropUpFill} w="24px" h="24px" />}
                    >
                        <List spacing={2} color={Colors.white} fontSize="12px" fontWeight="600">
                            <ListItem>
                                <NavLink to="/settings">Account Settings</NavLink>
                            </ListItem>
                            <ListItem onClick={logout}>
                                <NavLink to="/auth/login">Logout</NavLink>
                            </ListItem>
                        </List>
                    </Dropdown>
                </Flex>
            </Flex>
            <Divider borderBottomColor={Colors.grey} />
        </>
    );
};

export default Header;
