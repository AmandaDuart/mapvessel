import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider } from 'hooks/AuthContext';
import { ModelProvider } from 'hooks/ModelContext';

import reportWebVitals from './reportWebVitals';
import Router from './routes/routes';

import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <AuthProvider>
                <ModelProvider>
                    <Router />
                </ModelProvider>
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
