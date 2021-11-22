import { Stack, Icon, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import {
    RiUser6Line,
    RiLockPasswordLine,
    RiEyeLine,
    RiEyeOffLine,
    RiMailLine,
} from 'react-icons/ri';

import 'pages/register/register.scss';
import DefButton from 'components/DefButton';
import DefInput from 'components/DefInput';
import { useAuth } from 'hooks/AuthContext';

const Register = () => {
    const { user, token, register, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    if (user && token) {
        //TODO move to main page
        window.location.pathname = '/dashboard';
        return <></>;
    }

    const onRegister = async () => {
        if (!username || !email || !password) {
            alert('Please enter correct account');
            return;
        }
        await register(username, email, password);
        window.location.pathname = '/dashboard';
    };

    return (
        <>
            <Heading as="h2" fontSize="24px" lineHeight="32px" mb={4}>
                Register
            </Heading>
            <Stack spacing={3} textAlign="center" mx="auto" w="100%">
                <DefInput
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    leftIcon={<Icon as={RiMailLine} />}
                />
                <DefInput
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    leftIcon={<Icon as={RiUser6Line} />}
                />
                <DefInput
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    leftIcon={<Icon as={RiLockPasswordLine} />}
                    rightIcon={
                        <Icon
                            as={showPassword ? RiEyeOffLine : RiEyeLine}
                            onClick={handleShowPassword}
                        />
                    }
                />
                {isLoading ? (
                    <img
                        src="/spinner.gif"
                        alt="loading..."
                        style={{ width: 60, height: 60, margin: '0 auto' }}
                    />
                ) : (
                    <DefButton
                        title="Sign Up"
                        onClick={() => {
                            onRegister();
                        }}
                        isDisabled={isLoading}
                    />
                )}
            </Stack>
        </>
    );
};

export default Register;
