import { Box, Divider, Text, Stack } from '@chakra-ui/react';
import React from 'react';

import { Colors } from 'utils/global';

import SwitchGroup from '../SwitchGroup/SwitchGroup';

const Notifications = () => {
    return (
        <Box>
            <Text py={5} px={7} fontSize="20px" fontWeight="bold" color={Colors.white}>
                Notifications
            </Text>
            <Divider />
            <Stack py={5} px={7} maxW="600px" spacing={6}>
                <SwitchGroup
                    title="Mobile Push Notifications"
                    description="Recieve push notifications on your mobile."
                />

                <SwitchGroup title="Email Notifications" description="Recieve email updates." />

                <SwitchGroup
                    title="Always send email notifications"
                    description="Recieve updates by email, even when you’re active on the portal."
                />
            </Stack>
        </Box>
    );
};

export default Notifications;
