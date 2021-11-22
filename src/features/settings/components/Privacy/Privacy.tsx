import { Box, Divider, Text, Stack } from '@chakra-ui/react';
import React from 'react';

import { Colors } from 'utils/global';

import SwitchGroup from '../SwitchGroup/SwitchGroup';

const Privacy = () => {
    return (
        <Box>
            <Text py={5} px={7} fontSize="20px" fontWeight="bold" color={Colors.white}>
                Privacy
            </Text>
            <Divider />
            <Stack py={5} px={7} maxW="600px" spacing={6}>
                <SwitchGroup
                    title="System Information"
                    description="Automatically send some system information and page content to Hercules."
                />
                <SwitchGroup
                    title="Usage Statistics"
                    description="Automatically send usage statistics and crash reports to Hercules."
                />
                <SwitchGroup
                    title="Lorem ipsum dolor sit amet"
                    description="ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium malesuad."
                />
            </Stack>
        </Box>
    );
};

export default Privacy;
