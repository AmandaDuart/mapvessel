import { Stack } from '@chakra-ui/react';
import { useState } from 'react';

import { useModel } from 'hooks/ModelContext';

import './Training.scss';
import Activity from '../Activity/Activity';
import Form from '../Form/Form';
import Metrics from '../Metrics/Metrics';

const tempHyperparams = [
    { label: 'Hyperparameter1', value: 'hyperparameter1' },
    { label: 'Hyperparameter2', value: 'hyperparameter2' },
    { label: 'Hyperparameter3', value: 'hyperparameter3' },
];

const Training = () => {
    //const [modal] = useState<string>('');
    const [hyperparameter, setHyperparameter] = useState<string>('');
    const [model, setModel] = useState<string>('');

    const { models } = useModel();

    console.log(hyperparameter);

    return (
        <Stack flex="1" direction="column" w="100%" mt={5} mb={5} spacing={4}>
            <Form
                hyperparams={tempHyperparams}
                models={models ?? []}
                setHyperparams={setHyperparameter}
                setModels={setModel}
                model={model}
            />

            <Activity />
            <Metrics />
        </Stack>
    );
};

export default Training;
