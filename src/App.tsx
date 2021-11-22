import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

const App = () => {
    const [val] = useState(0);

    if (val == 0) {
        console.log(val);
    }

    return (
        <div className="App">
            <Box w={'100%'}>
                <Box mx="auto" mt={100} textAlign="center"></Box>
            </Box>
        </div>
    );
};

export default App;
