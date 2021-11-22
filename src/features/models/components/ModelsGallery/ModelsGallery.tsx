import { Box, Flex, Icon, Stack, Heading, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

import DefInput from 'components/DefInput';
import { Colors } from 'utils/global';

const ModelsGallery = ({ models, activeModel, setActiveModel }: any) => {
    return (
        <Flex direction="column">
            <Flex alignItems="center" mb={3}>
                <DefInput
                    placeholder="Filter"
                    size="md"
                    value=""
                    onChange={() => {}}
                    rightIcon={<Icon as={RiSearchLine} />}
                    p={5}
                />
            </Flex>
            <Stack>
                {models.map(({ model, lastRun }: any, index: any) => {
                    return (
                        <>
                            <Box
                                key={index}
                                className={`model-item ${index == activeModel ? 'active' : ''}`}
                                onClick={() => setActiveModel(index)}
                                py={4}
                                px={3}
                            >
                                <Heading className="model-item_name" fontSize="14px" mb={2}>
                                    {model}
                                </Heading>
                                <Flex fontSize="12px" color="#666A76">
                                    Last run:&nbsp;<Text fontWeight="bold">{lastRun}</Text>
                                </Flex>
                            </Box>
                            <Divider borderColor={Colors.bgColor2} />
                        </>
                    );
                })}
            </Stack>
        </Flex>
    );
};

export default ModelsGallery;
