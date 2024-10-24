import { createContext, useState, ReactNode, FC, useContext } from 'react';

interface RefetchContextType {
    callRefetch: () => void;
    refetch: boolean;
}

const RefetchContext = createContext<RefetchContextType | null>(null);

interface RefetchProviderProps {
    children: ReactNode;
}

const RefetchProvider: FC<RefetchProviderProps> = ({ children }) => {
    const [refetch, setRefetch] = useState(false);

    const callRefetch = () => {
        setRefetch((prev) => !prev);
    };

    return <RefetchContext.Provider value={{ callRefetch, refetch }}>{children}</RefetchContext.Provider>;
};

export { RefetchProvider, RefetchContext };
