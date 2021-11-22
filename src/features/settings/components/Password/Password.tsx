import { Box, Divider, Text, Stack, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiLockPasswordLine, RiEyeOffLine, RiEyeLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import DefInput from 'components/DefInput';
import { Colors } from 'utils/global';

const Password = () => {
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Box>
            <Text py={5} px={7} fontSize="20px" fontWeight="bold" color={Colors.white}>
                Change Password
            </Text>
            <Divider />
            <Box py={5} px={7}>
                <Stack mt={6} spacing={3} maxW="500px">
                    <DefInput
                        type="password"
                        value=""
                        onChange={() => {}}
                        placeholder="Old Password"
                        leftIcon={<Icon as={RiLockPasswordLine} />}
                    />
                    <DefInput
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                        leftIcon={<Icon as={RiLockPasswordLine} />}
                        rightIcon={
                            <Icon
                                as={showNewPassword ? RiEyeOffLine : RiEyeLine}
                                onClick={handleShowNewPassword}
                            />
                        }
                        placeholder="New Password"
                    />
                    <DefInput
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        leftIcon={<Icon as={RiLockPasswordLine} />}
                        rightIcon={
                            <Icon
                                as={showConfirmPassword ? RiEyeOffLine : RiEyeLine}
                                onClick={handleShowConfirmPassword}
                            />
                        }
                        placeholder="Confirm Password"
                    />
                </Stack>
                <DefButton title="Update Account" onClick={() => {}} mt={5} />
            </Box>
        </Box>
    );
};

export default Password;
