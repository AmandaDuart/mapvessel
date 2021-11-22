import { Flex, Box, Switch, Text } from '@chakra-ui/react';
import React from 'react';

import { Colors } from 'utils/global';

import './SwitchGroup.scss';

type SwitchGroupProps = {
    title: string;
    description: string;
};

const SwitchGroup = ({ title, description }: SwitchGroupProps) => {
    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Box me={6}>
                <Text mb={2} fontSize="18px" fontWeight="bold" color={Colors.white}>
                    {title}
                </Text>
                <Text fontSize="14px" color="#666A76">
                    {description}
                </Text>
            </Box>
            <Switch />
        </Flex>
    );
};

export default SwitchGroup;
