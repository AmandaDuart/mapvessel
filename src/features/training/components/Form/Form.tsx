import {
    Stack,
    Icon,
    Flex,
    Text,
    Progress,
    Stat,
    StatHelpText,
    StatNumber,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiPlayCircleLine, RiStopCircleLine, RiRestartLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import DefFileInput from 'components/DefFileInput';
import DefSelect from 'components/DefSelect';
import { ModelType } from 'hooks/ModelContext';
import { Colors } from 'utils/global';

type Option = {
    label: string;
    value: string | number;
};

type FormProps = {
    models: ModelType[];
    hyperparams: Option[];
    setHyperparams: any;
    setModels: any;
    model: string;
};

const Form = ({ models, hyperparams, setHyperparams, setModels, model }: FormProps) => {
    const [dataset, setDataset]: any = useState('');
    return (
        <Flex
            direction="column"
            justifyContent="space-between"
            bgColor={Colors.black1d1}
            borderRadius="12px"
        >
            <Flex justifyContent="space-between" p={5}>
                <Stack
                    spacing={3}
                    className="hs-container"
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'center' }}
                    w="80%"
                    flex={1}
                    me={6}
                >
                    <DefFileInput
                        placeholder="Browse Dataset Path..."
                        color={Colors.white}
                        onChange={setDataset}
                        value={dataset?.name}
                        acceptedFormats="video/*"
                    />
                    <DefSelect
                        flex={1}
                        placeholder="Select Model"
                        onChange={(e) => setModels(e.target.value)}
                        value={model}
                    >
                        {models.map((one: ModelType) => {
                            return (
                                <option key={one.name} value={one.name}>
                                    {one.name}
                                </option>
                            );
                        })}
                    </DefSelect>
                    <DefSelect
                        flex={1}
                        placeholder="Select Hyperparameter"
                        onChange={setHyperparams}
                        value={''}
                    >
                        {hyperparams.map((item) => {
                            return (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                    </DefSelect>
                    <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
                        <DefButton
                            leftIcon={<Icon as={RiPlayCircleLine} w="20px" h="20px" />}
                            onClick={() => {}}
                            title="Train"
                            size="sm"
                        />
                        <DefButton
                            icon={<Icon as={RiStopCircleLine} w="20px" h="20px" />}
                            onClick={() => {}}
                            size="sm"
                            opacity={0.5}
                        />
                        <DefButton
                            icon={<Icon as={RiRestartLine} w="20px" h="20px" />}
                            onClick={() => {}}
                            size="sm"
                            variant="outline"
                        />
                    </Stack>
                </Stack>

                <Stack align="center" spacing={3} direction="row">
                    <Text color={Colors.positive} fontSize="12px" fontWeight="bold">
                        Epoch 34/100
                    </Text>
                    <Text color={Colors.positive} fontSize="12px" fontWeight="bold">
                        75% Complete
                    </Text>
                    <DefButton
                        onClick={() => {}}
                        title="Cancel"
                        size="sm"
                        variant="filled"
                        bgColor={Colors.negative}
                    />
                </Stack>
            </Flex>
            <Progress
                value={75}
                size="xs"
                min={0}
                max={100}
                className="train-progress"
                bgColor={Colors.bgColor2}
            />
            <Flex px={5} py={6}>
                <Stack direction="row" spacing={10}>
                    <Stat>
                        <StatNumber mb="12px">80.45%</StatNumber>
                        <StatHelpText color="#666A76">Training Accuracy</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatNumber mb="12px">79.22%</StatNumber>
                        <StatHelpText color="#666A76">Validation Accuracy</StatHelpText>
                    </Stat>
                </Stack>
            </Flex>
        </Flex>
    );
};

export default Form;
