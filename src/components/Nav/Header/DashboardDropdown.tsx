import { Icon, List, ListItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiStackLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import Dropdown from 'components/Dropdown';
import { useModel } from 'hooks/ModelContext';
import { Colors } from 'utils/global';

const DashboardDropdown = () => {
    const { models, setActiveModel, activeModel, getModels } = useModel();

    useEffect(() => {
        getModels();
    }, []);

    return (
        <Dropdown
            w="220px"
            dropdownText="Model:"
            additionalText={activeModel?.name ?? '-select-'}
            leftIcon={
                <Icon
                    fill={`url(#orange-gradient) ${Colors.orange}`}
                    as={RiStackLine}
                    h="24px"
                    w="24px"
                />
            }
            rightIcon={<Icon as={RiArrowDownSLine} w="24px" h="24px" />}
            rightExpandedIcon={<Icon color={Colors.white} as={RiArrowUpSLine} w="24px" h="24px" />}
        >
            <List spacing={2} color={Colors.white} fontSize="14px">
                {models &&
                    models.map((model: any) => (
                        <ListItem onClick={() => setActiveModel(model)} key={model.name}>
                            {model.name}
                        </ListItem>
                    ))}
            </List>
        </Dropdown>
    );
};

export default DashboardDropdown;
