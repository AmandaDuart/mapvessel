import { Box, Divider, Flex, Text, Icon, Avatar, AvatarBadge, Stack } from '@chakra-ui/react';
import React from 'react';
import { RiUser6Line, RiAddLine, RiMailLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import DefInput from 'components/DefInput';
import { Colors } from 'utils/global';

const Profile = () => {
    return (
        <Box>
            <Text py={5} px={7} fontSize="20px" fontWeight="bold" color={Colors.white}>
                Profile
            </Text>
            <Divider />
            <Box py={5} px={7}>
                <Flex alignItems="flex-end">
                    <Avatar
                        bgColor={Colors.bgColor2}
                        boxSize="120px"
                        icon={<Icon as={RiUser6Line} color="#606165" boxSize="67.5px" />}
                    >
                        <AvatarBadge
                            top={0}
                            boxSize="32px"
                            bg={Colors.orangeGradient}
                            border="none"
                        >
                            <Icon as={RiAddLine} boxSize="24px" color={Colors.white} />
                        </AvatarBadge>
                    </Avatar>

                    <Box px={7} py={3}>
                        <Text fontSize="18px" fontWeight="bold" color={Colors.white} mb={3}>
                            Upload Profile Picture
                        </Text>
                        <Text fontSize="14px" color="#666A76">
                            Supported Formats: JPG, PNG, GIF. Minimum resolution of 500x500 pixels.
                            Maximum size 1mb
                        </Text>
                    </Box>
                </Flex>
                <Stack mt={6} spacing={3} maxW="500px">
                    <Stack spacing={3} direction="row">
                        <DefInput value="" onChange={() => {}} placeholder="First Name" />
                        <DefInput value="" onChange={() => {}} placeholder="Last Name" />
                    </Stack>
                    <DefInput
                        value=""
                        onChange={() => {}}
                        placeholder="Email"
                        leftIcon={<Icon as={RiMailLine} />}
                    />
                    <DefInput
                        value=""
                        onChange={() => {}}
                        placeholder="Username"
                        leftIcon={<Icon as={RiUser6Line} />}
                    />
                </Stack>
                <DefButton title="Update Account" onClick={() => {}} mt={5} />
            </Box>
        </Box>
    );
};

export default Profile;
