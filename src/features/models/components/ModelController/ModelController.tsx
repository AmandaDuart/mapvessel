import Icon from '@chakra-ui/icon';
import { Flex, Stack } from '@chakra-ui/layout';
import React from 'react';
import { RiPlayCircleLine, RiHistoryLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import { Colors } from 'utils/global';

const ModelController = () => {
    return (
        <Flex py={4} px={7} justifyContent="space-between">
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
                <DefButton
                    leftIcon={<Icon as={RiPlayCircleLine} w="20px" h="20px" />}
                    onClick={() => {}}
                    title="Run"
                    size="sm"
                />
                <DefButton
                    leftIcon={<Icon as={RiHistoryLine} w="20px" h="20px" />}
                    onClick={() => {}}
                    size="sm"
                    title="Training History"
                    variant="outline"
                />
                <DefButton
                    onClick={() => {}}
                    title="Delete"
                    size="sm"
                    variant="filled"
                    bgColor={Colors.bgColor2}
                />
            </Stack>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
                <DefButton
                    onClick={() => {}}
                    title="Cancel"
                    size="sm"
                    variant="filled"
                    bgColor={Colors.negative}
                />
                <DefButton
                    onClick={() => {}}
                    title="Save"
                    size="sm"
                    variant="filled"
                    bgColor={Colors.positive}
                />
            </Stack>
        </Flex>
    );
};

export default ModelController;
