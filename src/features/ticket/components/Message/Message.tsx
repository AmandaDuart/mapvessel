import { Flex, Circle, Stack, Icon, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { RiUser6Line } from 'react-icons/ri';

import { Colors, Utils } from 'utils/global';

export type MessageProps = {
    sender: string;
    time: string;
    message: string[];
    image?: string | undefined;
    agent?: boolean;
};

const Message = ({ sender, time, message, image = undefined, agent = false }: MessageProps) => {
    return (
        <Flex
            p={3}
            bg={agent ? '#111111' : 'transparent'}
            borderRadius="6px"
            alignItems="flex-start"
        >
            <Circle me={3} bgColor={Colors.bgColor2} boxSize="32px">
                {image ? (
                    <Image src={image} />
                ) : (
                    <Icon m={2} color={Colors.grey} as={RiUser6Line} />
                )}
            </Circle>
            <Stack spacing={3} mt={2} flex="1">
                <Flex justifyContent="space-between">
                    <Text fontSize="14px" fontWeight="600" color={Colors.grey2}>
                        {sender}
                    </Text>
                    <Text fontSize="14px" color={Colors.grey}>
                        {time}
                    </Text>
                </Flex>
                {message.map((text) => {
                    return (
                        <Text
                            key={Utils.randKey()}
                            fontSize="16px"
                            fontWeight="600"
                            color="#e4e4e4"
                        >
                            {text}
                        </Text>
                    );
                })}
            </Stack>
        </Flex>
    );
};

export default Message;
