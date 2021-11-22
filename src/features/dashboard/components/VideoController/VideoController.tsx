import {
    Icon,
    Stack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { RiPlayCircleLine, RiStopCircleLine, RiRestartLine, RiRoadMapLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import DefMultiselect from 'components/DefMultiselect';
import DefSelect from 'components/DefSelect';
import { useModel } from 'hooks/ModelContext';
import { Colors } from 'utils/global';
//import tempLabels from 'utils/tempLabels.json';

import VesselsMap from '../VesselsMap/VesselsMap';

type VideoControllerProps = {
    types: string[];
    dataType: any;
    setDataType: (variation: string) => void | undefined;
    labels: any;
    setLabels: any;
    isMediaSelected: boolean;
    onPlay: () => void;
    onStop: () => void;
    onRestart: () => void;
    models?: any;
    setActiveModel?: any;
    activeModel?: any;
    //setCls: (variation: string) => void | undefined | any;
};

const VideoController = ({
    types,
    dataType,
    setDataType,
    labels,
    setLabels,
    onPlay,
    onStop,
    onRestart,
    isMediaSelected = false,
    models,
    setActiveModel,
}: VideoControllerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { activeModel } = useModel();

    return (
        <Stack
            spacing={{ base: 4, md: 7 }}
            className="hs-container"
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'center' }}
            w="80%"
        >
            <DefSelect
                flex={1}
                placeholder="Select Model"
                onChange={(e) => {
                    const active = models.filter((model: any) => {
                        return model.name === e.target.value;
                    });
                    setActiveModel(active[0]);
                }}
                value={activeModel ? activeModel?.name : ''}
            >
                {models &&
                    models.map((model: any) => (
                        <option value={model.name} key={model.name}>
                            {model.name}
                        </option>
                    ))}
            </DefSelect>

            <DefSelect
                flex={1}
                placeholder="Select Data Type"
                onChange={(e) => {
                    setDataType(e.target.value);
                }}
                value={dataType}
            >
                {types.map((one) => {
                    return (
                        <option key={one} value={one}>
                            {one}
                        </option>
                    );
                })}
            </DefSelect>
            <DefMultiselect
                className={isMediaSelected ? 'sel-bottom' : 'sel-top'}
                placeholder="Select Labels"
                options={activeModel && dataType ? activeModel.data[dataType] : []}
                onChange={setLabels}
                values={labels}
                flex={1}
                hasSelectAll={false}
            />

            <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
                <DefButton
                    leftIcon={<Icon as={RiPlayCircleLine} w="20px" h="20px" />}
                    onClick={() => {
                        onPlay();
                    }}
                    title="Run"
                    size="sm"
                    disabled={dataType ? false : true}
                    // disabled={false}
                />
                <DefButton
                    icon={<Icon as={RiStopCircleLine} w="20px" h="20px" />}
                    onClick={() => {
                        onStop();
                    }}
                    size="sm"
                    opacity={0.5}
                />
                <DefButton
                    icon={<Icon as={RiRestartLine} w="20px" h="20px" />}
                    onClick={() => {
                        onRestart();
                    }}
                    size="sm"
                    variant="outline"
                />
                <DefButton
                    icon={<Icon as={RiRoadMapLine} w="20px" h="20px" />}
                    onClick={onOpen}
                    size="sm"
                    variant="outline"
                />
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside" isCentered>
                <ModalOverlay />
                <ModalContent bgColor={Colors.bgColor}>
                    <ModalHeader>Vessels Map</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VesselsMap />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Stack>
    );
};

export default VideoController;
