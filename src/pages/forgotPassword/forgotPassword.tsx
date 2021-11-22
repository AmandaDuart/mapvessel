import { Stack, Link, Icon, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { RiMailLine } from 'react-icons/ri';

import 'pages/register/register.scss';
import DefButton from 'components/DefButton';
import DefInput from 'components/DefInput';
import { Colors } from 'utils/global';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    return (
        <>
            <Heading as="h2" fontSize="24px" lineHeight="32px" mb={2}>
                Forgot Password? No worries.
            </Heading>
            <Text fontSize="14px" color={Colors.grey} mb={4}>
                We’ll send a recovery link via email
            </Text>
            <Stack spacing={3} textAlign="center" mx="auto" w="100%">
                <DefInput
                    placeholder="Email or Username"
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    leftIcon={<Icon as={RiMailLine} />}
                />
                <DefButton
                    title="Send recovery link"
                    onClick={() => {
                        window.location.pathname = '/login';
                    }}
                />
                <Link href="/auth/login" color={Colors.orange} mt="20px !important">
                    Return to Login
                </Link>
            </Stack>
        </>
    );
};

export default ForgotPassword;
