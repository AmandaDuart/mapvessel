import { Stack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import DefButton from 'components/DefButton';
import DefFileInput from 'components/DefFileInput';
import DefInput from 'components/DefInput';
import DefModal from 'components/DefModal';
import DefSelect from 'components/DefSelect';

type VideoSourceModalProps = {
    videoSource: string;
    setVideoSource: Dispatch<SetStateAction<string>>;
    video: any;
    setVideo: Dispatch<any>;
    videoDescription: string;
    setVideoDescription: Dispatch<string>;
    isOpen: boolean;
    uploading: boolean;
    onClose: () => void;
    onSubmit: () => void;
    videoTitle: string;
    setVideoTitle: Dispatch<string>;
    videoCameraUser: string;
    setVideoCameraUser: Dispatch<string>;
    videoCameraPwd: string;
    setVideoCameraPwd: Dispatch<string>;
};

export default function VideoSourceModal({
    videoSource,
    setVideoSource,
    video,
    setVideo,
    videoTitle,
    setVideoTitle,
    videoDescription,
    setVideoDescription,
    isOpen,
    uploading,
    onClose,
    onSubmit,
    videoCameraUser,
    setVideoCameraUser,
    videoCameraPwd,
    setVideoCameraPwd,
}: VideoSourceModalProps) {
    const [currentInputType, setCurrentInputType] = useState('');

    const inputTypes = {
        'web_cam/camera': 'number',
        local_file: 'file',
        ip_cam: 'ip',
        http_stream: 'text',
    };

    const closeModal = () => {
        setVideoTitle('');
        setVideoDescription('');
        setVideo('');
        setVideoCameraUser('');
        setVideoCameraPwd('');

        onClose();
    };

    return (
        <DefModal
            isOpen={isOpen}
            onClose={closeModal}
            headerText="Add Video Source"
            descriptionText="Add video source here. Video types can be webcams, Local Files, IP Cameras or HTTP streams."
            primaryButton={
                <DefButton
                    title={uploading ? 'Uploading...' : 'Save Source'}
                    size="lg"
                    isDisabled={uploading}
                    px={7}
                    py={5}
                    onClick={() => {
                        onSubmit();
                    }}
                />
            }
            secondaryButton={
                <DefButton title="Cancel" variant="ghost" size="lg" ms={5} onClick={closeModal} />
            }
        >
            <DefSelect
                placeholder="-select Source Type-"
                onChange={(e) => {
                    setVideoSource(e.target.value);
                    const inputType = Object.entries(inputTypes).find(
                        (types) => types[0] === e.target.value
                    );
                    setCurrentInputType(inputType ? inputType[1] : 'text');
                    setVideo('');
                }}
                value={videoSource}
                mt={3}
            >
                <option value="web_cam/camera">Camera</option>
                <option value="local_file">Local File</option>
                <option value="ip_cam">Ip Cam</option>
                <option value="http_stream">Http Stream</option>
            </DefSelect>

            {currentInputType === 'file' && (
                <DefFileInput
                    placeholder="Browse Video Source Path..."
                    onChange={setVideo}
                    value={video?.name}
                    acceptedFormats="video/*"
                    mt={3}
                />
            )}

            {currentInputType === 'number' && (
                <DefInput
                    placeholder="0 or 1"
                    type="number"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    min={0}
                    max={1}
                    mt={3}
                />
            )}

            {(currentInputType === 'text' || currentInputType === 'ip') && (
                <DefInput
                    placeholder="Insert video url"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    type="text"
                    mt={3}
                />
            )}

            {currentInputType === 'ip' && (
                <Stack mt={3} direction="row" spacing={3}>
                    <DefInput
                        placeholder="Camera User"
                        value={videoCameraUser}
                        onChange={(e) => setVideoCameraUser(e.target.value)}
                        type="text"
                    />
                    <DefInput
                        placeholder="Camera Password"
                        value={videoCameraPwd}
                        onChange={(e) => setVideoCameraPwd(e.target.value)}
                        type="text"
                    />
                </Stack>
            )}

            <DefInput
                mt={3}
                placeholder="Enter Video Title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                type="text"
            />
            <DefInput
                mt={3}
                placeholder="Enter Video Description"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                type="text"
            />
        </DefModal>
    );
}
