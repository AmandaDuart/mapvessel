import { Stack, Link, Icon, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { RiUser6Line, RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import 'pages/login/login.scss';
import DefButton from 'components/DefButton';
import DefInput from 'components/DefInput';
import { useAuth } from 'hooks/AuthContext';
import { Colors } from 'utils/global';

const Login = () => {
    const { user, token, login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    if (user && token) {
        //TODO move to main page
        window.location.pathname = '/dashboard';
        return <></>;
    }

    const onLogin = async () => {
        if (!email || !password) {
            alert('Please enter email or password clearly.');
            return;
        }
        await login(email, password);
    };

    return (
        <>
            <Heading as="h2" fontSize="24px" lineHeight="32px" mb={4}>
                Login
            </Heading>
            <Stack spacing={3} textAlign="center" mx="auto" w="100%">
                <DefInput
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
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
                    <DefButton title="Login" onClick={onLogin} isDisabled={isLoading} />
                )}
                <Link
                    href="/auth/forgot-password"
                    color={Colors.orange}
                    mt="20px !important"
                    fontSize="14px"
                >
                    Forgot Password? Reset.
                </Link>
            </Stack>
        </>
    );
};

export default Login;
