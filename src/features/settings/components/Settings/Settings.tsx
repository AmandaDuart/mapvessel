import {
    Box,
    Flex,
    TabPanel,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    Icon,
    Divider,
} from '@chakra-ui/react';
import React from 'react';
import {
    RiUser6Line,
    RiLockPasswordLine,
    RiNotification4Line,
    RiShieldUserLine,
} from 'react-icons/ri';

import { Colors } from 'utils/global';

import Notifications from '../Notifications/Notifications';
import Password from '../Password/Password';
import Privacy from '../Privacy/Privacy';
import Profile from '../Profile/Profile';

import './Settings.scss';

const Settings = () => {
    return (
        <Flex
            w="100%"
            minH="calc(100vh - 150px)"
            mt={5}
            mb={5}
            bg={Colors.black1d1}
            borderRadius="12px"
        >
            <Tabs className="vertical-tabs" flex={1} display="flex">
                <TabList p={5} me={20}>
                    <Tab>
                        <Icon as={RiUser6Line} boxSize="18px" me={2} /> Profile
                    </Tab>
                    <Tab>
                        <Icon as={RiLockPasswordLine} boxSize="18px" me={2} /> Password
                    </Tab>
                    <Tab>
                        <Icon as={RiNotification4Line} boxSize="18px" me={2} /> Notifications
                    </Tab>
                    <Tab>
                        <Icon as={RiShieldUserLine} boxSize="18px" me={2} /> Privacy
                    </Tab>
                </TabList>

                <Box>
                    <Divider orientation="vertical" />
                </Box>

                <TabPanels flex={1} py={1}>
                    <TabPanel>
                        <Profile />
                    </TabPanel>
                    <TabPanel>
                        <Password />
                    </TabPanel>
                    <TabPanel>
                        <Notifications />
                    </TabPanel>
                    <TabPanel>
                        <Privacy />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};

export default Settings;
