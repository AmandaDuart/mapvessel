import { Stack, Textarea, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiCameraLine } from 'react-icons/ri';

import DefButton from 'components/DefButton';
import DefFileInput from 'components/DefFileInput';
import DefInput from 'components/DefInput';
import DefModal from 'components/DefModal';
import DefSelect from 'components/DefSelect';
import { Colors } from 'utils/global';

type TicketFormProps = {
    isOpen: boolean;
    onClose: () => void;
};

const TicketForm = ({ isOpen, onClose }: TicketFormProps) => {
    const [file, setFile]: any = useState('');
    return (
        <DefModal
            isOpen={isOpen}
            onClose={onClose}
            headerText="Open New Ticket"
            descriptionText="Please complete this form and one of our agents will reply to you by email as soon as possible."
            primaryButton={
                <DefButton title="Submit Ticket" size="lg" px={7} py={5} onClick={() => {}} />
            }
            secondaryButton={
                <DefButton title="Reset Form" variant="ghost" size="lg" ms={5} onClick={() => {}} />
            }
        >
            <Stack spacing={3}>
                <DefSelect placeholder="-select Priority-" onChange={() => {}} value="">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </DefSelect>
                <DefInput placeholder="Subject" size="md" value="" onChange={() => {}} />
                <Textarea resize="none" placeholder="Enter description of your problem" />
                <DefFileInput
                    leftIcon={
                        <Icon as={RiCameraLine} color={Colors.orange} boxSize="20px" me={3} />
                    }
                    placeholder="Drag and drop file in here"
                    onChange={setFile}
                    value={file}
                    noDrag={false}
                    acceptedFormats="image/*"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={9}
                />
            </Stack>
        </DefModal>
    );
};

export default TicketForm;
