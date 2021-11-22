import React, { useEffect, useState, createContext, useContext } from 'react';

import { Api } from 'utils/API';

export type ModelType = {
    name: string;
    datatypes: string[];
    data: any;
};

function ModelConfig() {
    const [models, setModels] = useState<ModelType[]>([]);
    const [activeModel, setActiveModel] = useState<ModelType>();

    const getModels = async () => {
        const res = await Api.getModel();
        console.log('res get models: ', res);
        if (res.response) {
            const list: ModelType[] = Object.keys(res.response).map((key: string) => {
                console.log('key:', key);
                console.log('res.response[key]', Object.keys(res.response[key]));

                return {
                    name: key,
                    datatypes: Object.keys(res.response[key]),
                    data: res.response[key],
                };
            });
            setModels(list);
        } else {
            alert(res);
            setModels([]);
        }
    };

    useEffect(() => {
        getModels();
    }, []);

    return {
        models,
        setModels,
        getModels,
        activeModel,
        setActiveModel,
    };
}

export type ModelContextType = {
    models: ModelType[];
    setModels: any;
    getModels: any;
    activeModel: ModelType | undefined;
    setActiveModel: any;
};

export const modelContext = createContext<ModelContextType>({
    models: [] as ModelType[],
    setModels: undefined,
    getModels: undefined,
    activeModel: undefined,
    setActiveModel: undefined,
});

export const ModelProvider: React.FC = ({ children }) => {
    const value = ModelConfig();

    return <modelContext.Provider value={value}>{children}</modelContext.Provider>;
};

export const useModel = () => useContext(modelContext);
