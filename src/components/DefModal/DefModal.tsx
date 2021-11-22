import {
    Icon,
    Text,
    ModalProps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

import { Colors } from 'utils/global';

type DefModalProps = {
    isOpen: boolean;
    onClose: () => void;
    headerText: string;
    primaryButton: React.ReactNode;
    secondaryButton: React.ReactNode;
    descriptionText?: string;
} & ModalProps;

const DefModal = ({
    isOpen,
    onClose,
    headerText,
    descriptionText = '',
    children,
    primaryButton,
    secondaryButton,
    ...props
}: DefModalProps) => {
    return (
        <Modal size="xl" isCentered={true} isOpen={isOpen} onClose={onClose} {...props}>
            <ModalOverlay />
            <ModalContent bgColor={Colors.black1d1} py={5} px={3}>
                <ModalHeader>{headerText}</ModalHeader>
                <ModalCloseButton my={5} mx={3}>
                    <Icon as={RiCloseCircleLine} color={Colors.grey} boxSize="32px" />
                </ModalCloseButton>
                <ModalBody color={Colors.grey}>
                    <Text fontSize="14px" mb={2}>
                        {descriptionText}
                    </Text>
                    {children}
                </ModalBody>

                <ModalFooter justifyContent="flex-start">
                    {primaryButton}
                    {secondaryButton}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DefModal;
