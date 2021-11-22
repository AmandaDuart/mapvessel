import { Box, Flex, Divider, Stack, Text, Textarea, Icon } from '@chakra-ui/react';
import React from 'react';
import { RiAttachmentLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import { Colors, Utils } from 'utils/global';

import Message, { MessageProps } from '../Message/Message';

type TicketThreadProps = {
    subject: string;
    openedIn: string | Date | undefined;
    messages: MessageProps[];
};

const TicketThread = ({ subject, openedIn, messages }: TicketThreadProps) => {
    return (
        <Box bg={Colors.black1d1} borderRadius="12px" flex={1}>
            <Flex p={5} justifyContent="space-between" alignItems="flex-end">
                <Text fontSize="20px" fontWeight="bold" color="#E4E4E4 ">
                    {subject}
                </Text>
                <Text fontSize="14px" fontWeight="600" color={Colors.grey2}>
                    Ticket Opened: {openedIn}
                </Text>
            </Flex>

            <Divider />

            <Stack p={5} spacing={4}>
                {messages.map((message) => (
                    <Message key={Utils.randKey()} {...message} />
                ))}

                <Divider />
            </Stack>

            <Flex px={5} pt={10} direction="column">
                <Textarea
                    pt={4}
                    _focus={{ boxShadow: '0 0 0 2px rgba($grey, 0.5)' }}
                    resize="none"
                    placeholder="Write message"
                    size="lg"
                    minH="125px"
                />
                <Stack
                    spacing={4}
                    direction="row"
                    justify="flex-end"
                    align="center"
                    position="relative"
                    bottom="50px"
                    right="15px"
                >
                    <DefButton
                        onClick={() => {}}
                        leftIcon={<Icon as={RiAttachmentLine} boxSize="18px" />}
                        title="Attach File"
                        variant="link"
                        size="sm"
                    />
                    <DefButton size="sm" onClick={() => {}} title="Send" />
                </Stack>
            </Flex>
        </Box>
    );
};

export default TicketThread;
